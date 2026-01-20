"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Play, Link as LinkIcon, Upload, 
  Settings, Repeat, Layers, CheckCircle, Facebook,
  AlertCircle, Loader2, Video, Info
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
  const [targetId, setTargetId] = useState('me'); 
  const [resolution, setResolution] = useState('720p');
  
  // Loop State
  const [loopMode, setLoopMode] = useState<'off' | 'count' | 'infinite'>('off');
  const [loopTimes, setLoopTimes] = useState(1);

  // 1. Initialize
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

      try {
        // Check Connection
        const destRes = await fetch('/api/destinations', { headers: { 'Authorization': `Bearer ${token}` } });
        if (destRes.status === 401) { localStorage.removeItem('token'); return router.push('/login'); }
        const dests = await destRes.json();
        const fbDest = dests.find((d: any) => d.platform === 'facebook');

        if (!fbDest) {
          setHasConnection(false);
          setLoading(false);
          return;
        }

        setHasConnection(true);

        // Fetch Pages
        const pageRes = await fetch('/api/destinations/facebook/pages', { headers: { 'Authorization': `Bearer ${token}` } });
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
        const destRes = await fetch('/api/destinations', { headers: { 'Authorization': `Bearer ${token}` } });
        const dests = await destRes.json();
        const fbDest = dests.find((d: any) => d.platform === 'facebook');

        const res = await fetch('/api/streams/start', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                sourceUrl: videoUrl,
                destinationId: fbDest.id,
                pageId: targetId,
                // Pass loop settings to backend
                loop: loopMode === 'infinite' ? -1 : (loopMode === 'count' ? loopTimes : 0)
            })
        });

        const result = await res.json();
        
        if (res.ok) {
            alert(`SUCCESS! Stream Started.\nTarget: ${targetId === 'me' ? 'Profile' : 'Page'}`);
            router.push('/dashboard');
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
      <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
    </div>
  );

  // Error State
  if (!hasConnection) return (
    <div className="max-w-2xl mx-auto pt-20 text-center">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Facebook className="w-12 h-12 text-slate-400" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Facebook Not Connected</h2>
      <Link href="/dashboard/destinations/add?platform=Facebook" className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all mt-6 inline-block">
        Connect Facebook
      </Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20 font-sans">
      
      {/* Navigation */}
      <Link href="/dashboard" className="inline-flex items-center text-slate-500 hover:text-emerald-600 mb-8 font-bold group transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Studio
      </Link>

      {/* Page Title */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
           {/* Brand-compliant Green Icon Container */}
           <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
             <Video className="w-8 h-8 text-white" />
           </div>
           <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Facebook Broadcast</h1>
              <p className="text-slate-500">Professional Streaming Suite</p>
           </div>
        </div>
        <div className="hidden md:flex px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg items-center border border-emerald-100">
            <CheckCircle className="w-4 h-4 mr-2" /> Server Online
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN (Inputs) --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Video Source */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-lg font-medium"
                      value={videoUrl}
                      onChange={e => setVideoUrl(e.target.value)}
                    />
                </div>
                
                <div className="text-center text-xs text-slate-400 font-bold uppercase tracking-wide my-2">- OR -</div>
                
                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-bold hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all flex items-center justify-center group">
                    <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Upload Video File
                </button>
             </div>
          </div>

          {/* Stream Metadata */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <h3 className="text-lg font-bold text-slate-900 mb-6">Broadcast Details</h3>
             <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                      placeholder="e.g. Daily Tech Update"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all h-32 resize-none"
                      placeholder="Enter the caption for your live post..."
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                    ></textarea>
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT COLUMN (Settings) --- */}
        <div className="space-y-6">
          
          {/* Target Selection */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Layers className="w-4 h-4 mr-2 text-emerald-600" /> Destination
             </h3>
             
             <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Post To</label>
                <div className="relative">
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 appearance-none font-medium text-slate-900"
                      value={targetId}
                      onChange={e => setTargetId(e.target.value)}
                    >
                        {pages.map((p: any) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
             </div>
          </div>

          {/* Settings & Loop */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Settings className="w-4 h-4 mr-2 text-slate-600" /> Configuration
             </h3>
             
             <div className="space-y-6">
                
                {/* Resolution */}
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quality</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['720p', '1080p', '4K'].map((res) => (
                            <button 
                              key={res}
                              onClick={() => setResolution(res)}
                              className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                                resolution === res 
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                              }`}
                            >
                                {res}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Advanced Loop Logic */}
                <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center mb-3">
                        <Repeat className="w-4 h-4 mr-2 text-emerald-600" />
                        <span className="text-sm font-bold text-slate-900">Loop Settings</span>
                    </div>

                    <div className="space-y-3">
                        {/* Selector: Off / Count / Infinite */}
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button 
                                onClick={() => setLoopMode('off')}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loopMode === 'off' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                            >
                                Play Once
                            </button>
                            <button 
                                onClick={() => setLoopMode('count')}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loopMode === 'count' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                            >
                                Count
                            </button>
                            <button 
                                onClick={() => setLoopMode('infinite')}
                                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${loopMode === 'infinite' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                            >
                                Infinite
                            </button>
                        </div>

                        {/* Specific Input for "Count" mode */}
                        {loopMode === 'count' && (
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 animate-in fade-in slide-in-from-top-2">
                                <label className="block text-xs font-bold text-slate-500 mb-1">Number of Loops</label>
                                <div className="flex items-center">
                                    <input 
                                        type="number" 
                                        min="1" 
                                        max="100"
                                        value={loopTimes} 
                                        onChange={(e) => setLoopTimes(parseInt(e.target.value))}
                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-emerald-500" 
                                    />
                                    <span className="ml-2 text-xs font-bold text-slate-400">Times</span>
                                </div>
                            </div>
                        )}

                        {/* Info Text */}
                        {loopMode === 'infinite' && (
                            <p className="text-xs text-emerald-600 font-medium px-1 flex items-start">
                                <Info className="w-3 h-3 mr-1 mt-0.5 shrink-0" />
                                Stream will run 24/7 until stopped.
                            </p>
                        )}
                    </div>
                </div>
             </div>
          </div>

          {/* GO LIVE BUTTON */}
          <button 
            onClick={handleGoLive}
            disabled={isStarting}
            className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 flex items-center justify-center text-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isStarting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                 <Play className="w-6 h-6 mr-2 fill-current group-hover:scale-110 transition-transform" /> 
                 GO LIVE NOW
                </>
            )}
          </button>
          
          <p className="text-center text-xs text-slate-400 font-medium">
            Broadcast starts immediately upon confirmation.
          </p>

        </div>

      </div>
    </div>
  );
}
