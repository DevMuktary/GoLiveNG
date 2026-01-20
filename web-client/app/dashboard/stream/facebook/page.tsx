"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Play, Link as LinkIcon, Upload, 
  Settings, Clock, Layers, CheckCircle, Facebook,
  AlertCircle, Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function FacebookStreamSetup() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<any[]>([]);
  const [hasConnection, setHasConnection] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [targetId, setTargetId] = useState('me'); // 'me' = Profile
  const [resolution, setResolution] = useState('720p');
  const [isLooping, setIsLooping] = useState(false);

  // 1. Initialize: Check Auth, Connection, and Fetch Pages
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

      try {
        // A. Check Connection
        const destRes = await fetch('/api/destinations', {
           headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (destRes.status === 401) {
            localStorage.removeItem('token');
            return router.push('/login');
        }

        const dests = await destRes.json();
        const fbDest = dests.find((d: any) => d.platform === 'facebook');

        if (!fbDest) {
          setHasConnection(false);
          setLoading(false);
          return;
        }

        setHasConnection(true);

        // B. Fetch Facebook Pages
        const pageRes = await fetch('/api/destinations/facebook/pages', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const pageData = await pageRes.json();
        
        if (pageData.pages) {
            setPages([
                { name: `My Profile (${pageData.profile.name})`, id: 'me' },
                ...pageData.pages
            ]);
        }
      } catch (err) {
        console.error("Setup failed", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  const handleGoLive = async () => {
    if (!videoUrl) return alert("Please enter a video link.");
    if (!title) return alert("Please enter a stream title.");

    setIsStarting(true);
    const token = localStorage.getItem('token');

    try {
        // 1. Find the Destination ID (We need the DB ID, not the Page ID)
        const destRes = await fetch('/api/destinations', { headers: { 'Authorization': `Bearer ${token}` } });
        const dests = await destRes.json();
        const fbDest = dests.find((d: any) => d.platform === 'facebook');

        // 2. Call Start API
        const res = await fetch('/api/streams/start', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                sourceUrl: videoUrl,
                destinationId: fbDest.id, // The DB ID of the connection
                pageId: targetId // The specific Page ID (or 'me')
            })
        });

        const result = await res.json();
        
        if (res.ok) {
            alert(`SUCCESS! Stream Started on Facebook.\n\nTarget: ${targetId === 'me' ? 'Profile' : 'Page'}\nVideo: ${title}`);
            router.push('/dashboard'); // Go back to hub
        } else {
            alert("Error: " + (result.error || "Failed to start."));
        }
    } catch (err) {
        alert("Failed to connect to server.");
    } finally {
        setIsStarting(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
    </div>
  );

  // Error State: Not Connected
  if (!hasConnection) return (
    <div className="max-w-2xl mx-auto pt-20 text-center">
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Facebook className="w-12 h-12 text-blue-600" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Facebook Not Connected</h2>
      <p className="text-slate-500 mb-8 text-lg">Connect your Facebook account to unlock this studio.</p>
      <Link href="/dashboard/destinations/add?platform=Facebook" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
        Connect Facebook
      </Link>
      <div className="mt-8">
        <Link href="/dashboard" className="text-slate-400 hover:text-slate-600 font-bold">Cancel</Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Back Button */}
      <Link href="/dashboard" className="inline-flex items-center text-slate-500 hover:text-slate-800 mb-8 font-bold group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
             <Facebook className="w-8 h-8 text-white" />
           </div>
           <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Facebook Studio</h1>
              <p className="text-slate-500">Configure your broadcast for Facebook Live.</p>
           </div>
        </div>
        <div className="hidden md:flex px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg items-center border border-emerald-100">
            <CheckCircle className="w-4 h-4 mr-2" /> System Ready
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Inputs (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Video Source */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mr-3">
                    <Play className="w-4 h-4 text-emerald-600" /> 
                </div>
                Video Source
             </h3>
             
             <div className="space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <LinkIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input 
                    type="text"
                    placeholder="Paste video link (YouTube, m3u8, mp4)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-lg"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    />
                </div>
                
                <div className="text-center text-xs text-slate-400 font-bold uppercase tracking-wide my-2">- OR -</div>
                
                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center group">
                    <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Upload Video File
                </button>
             </div>
          </div>

          {/* 2. Stream Details */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold text-slate-900 mb-6">Stream Details</h3>
             <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Broadcast Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      placeholder="e.g. Sunday Service - Live"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all h-32 resize-none"
                      placeholder="Tell your viewers what this is about..."
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Settings (1/3 width) */}
        <div className="space-y-6">
          
          {/* Target Selection */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Layers className="w-4 h-4 mr-2 text-blue-600" /> Destination
             </h3>
             
             <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Post To</label>
                <div className="relative">
                    <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium"
                    value={targetId}
                    onChange={e => setTargetId(e.target.value)}
                    >
                        {pages.map((p: any) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ArrowLeft className="w-4 h-4 text-slate-400 -rotate-90" />
                    </div>
                </div>
                <p className="text-xs text-slate-400 mt-2 px-1">
                    Selecting a Page will post as that Page. 'Profile' posts as you.
                </p>
             </div>
          </div>

          {/* Configuration */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Settings className="w-4 h-4 mr-2 text-slate-600" /> Settings
             </h3>
             
             <div className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quality</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['720p', '1080p', '4K'].map((res) => (
                            <button 
                              key={res}
                              onClick={() => setResolution(res)}
                              className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                                resolution === res 
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                                {res}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-slate-400" />
                        <span className="text-sm font-bold text-slate-700">Loop Video?</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={isLooping} onChange={e => setIsLooping(e.target.checked)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                </div>
             </div>
          </div>

          {/* GO LIVE BUTTON */}
          <button 
            onClick={handleGoLive}
            disabled={isStarting}
            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center text-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isStarting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                 <Play className="w-6 h-6 mr-2 fill-current group-hover:scale-110 transition-transform" /> 
                 GO LIVE NOW
                </>
            )}
          </button>
          
          <p className="text-center text-xs text-slate-400 font-medium">
            Stream will start immediately on Facebook.
          </p>

        </div>

      </div>
    </div>
  );
}
