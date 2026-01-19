"use client";
import { useState, useEffect } from 'react';
import { 
  Plus, Facebook, Youtube, Twitch, Cast, 
  Wifi, Loader2, Upload, Link as LinkIcon, Play 
} from 'lucide-react';
import Link from 'next/link';

// Helper to map DB string to Icon
const getPlatformIcon = (platform: string) => {
  switch(platform.toLowerCase()) {
    case 'facebook': return <Facebook className="w-5 h-5 text-white" />;
    case 'youtube': return <Youtube className="w-5 h-5 text-white" />;
    case 'twitch': return <Twitch className="w-5 h-5 text-white" />;
    default: return <Cast className="w-5 h-5 text-white" />;
  }
};

const getPlatformColor = (platform: string) => {
  switch(platform.toLowerCase()) {
    case 'facebook': return 'bg-blue-600';
    case 'youtube': return 'bg-red-600';
    case 'twitch': return 'bg-purple-600';
    default: return 'bg-slate-800';
  }
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [streamSource, setStreamSource] = useState<'link' | 'file'>('link');

  // Fetch Real Data on Load
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('/api/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Studio Overview</h1>
          <p className="text-slate-500">Manage your real-time broadcasts.</p>
        </div>
        <div className="flex items-center space-x-3">
           <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center">
             <Wifi className="w-3 h-3 mr-1" /> System Operational
           </div>
        </div>
      </div>

      {/* --- 1. Destinations (REAL DATA) --- */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            Active Destinations ({data?.destinations?.length || 0})
          </h2>
          <Link href="/dashboard/destinations" className="text-sm text-emerald-600 font-bold hover:underline flex items-center">
            <Plus className="w-4 h-4 mr-1" /> Add New Destination
          </Link>
        </div>
        
        {data?.destinations?.length === 0 ? (
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50">
            <p className="text-slate-500 mb-4">No destinations connected yet.</p>
            <Link href="/dashboard/destinations" className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50">
              Connect Facebook / YouTube
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.destinations.map((dest: any) => (
              <div key={dest.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 hover:border-emerald-200 transition-colors">
                <div className="flex justify-between items-start">
                  <div className={`w-8 h-8 ${getPlatformColor(dest.platform)} rounded-lg flex items-center justify-center shadow-md`}>
                    {getPlatformIcon(dest.platform)}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 capitalize">{dest.platform}</h3>
                  <p className="text-xs text-slate-500 truncate">{dest.nickname}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- 2. Input Source --- */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-2">Stream Source</h2>
          <p className="text-sm text-slate-500">Choose how you want to broadcast.</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 p-1 bg-slate-100 rounded-lg w-fit mb-6">
          <button 
            onClick={() => setStreamSource('link')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${streamSource === 'link' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Pull from Link
          </button>
          <button 
            onClick={() => setStreamSource('file')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${streamSource === 'file' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Upload File
          </button>
        </div>

        {/* Input Area */}
        <div className="space-y-6">
          {streamSource === 'link' ? (
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">Video URL (YouTube, .m3u8, direct link)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" 
                  placeholder="https://..." 
                />
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">Click to upload or drag video here</p>
            </div>
          )}

          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 flex items-center transition-all">
              <Play className="w-5 h-5 mr-2 fill-current" />
              Start Streaming
            </button>
          </div>
        </div>
      </section>

      {/* --- 3. Recent Activity (REAL DATA) --- */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Broadcasts</h2>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {data?.recentStreams?.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-sm text-slate-500">
                    No streams yet. Start your first broadcast above!
                  </td>
                </tr>
              ) : (
                data?.recentStreams?.map((stream: any) => (
                  <tr key={stream.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{stream.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {stream.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(stream.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
