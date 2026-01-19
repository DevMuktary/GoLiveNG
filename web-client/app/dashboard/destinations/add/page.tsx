"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, ArrowLeft, Loader2, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function AddDestination() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'Custom RTMP';
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: `${platform} Channel`,
    streamKey: '',
    rtmpUrl: '' // Optional for FB/YT as we defaults
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    
    await fetch('/api/destinations', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        platform,
        ...formData
      })
    });

    router.push('/dashboard/destinations'); // Go back to list
  };

  const isCustom = platform === 'Custom RTMP';

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/dashboard/destinations" className="flex items-center text-slate-500 hover:text-emerald-600 mb-6 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Destinations
      </Link>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl">
             {platform.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Connect {platform}</h1>
            <p className="text-slate-500">Enter your stream details below.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Nickname</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g. My Gaming Page"
              value={formData.nickname}
              onChange={e => setFormData({...formData, nickname: e.target.value})}
            />
          </div>

          {/* RTMP URL is hidden for FB/YT/Twitch because we know the defaults */}
          {isCustom && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">RTMP Server URL</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="rtmp://..."
                value={formData.rtmpUrl}
                onChange={e => setFormData({...formData, rtmpUrl: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Stream Key</label>
            <input 
              type="password" 
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              placeholder="••••-••••-••••-••••"
              value={formData.streamKey}
              onChange={e => setFormData({...formData, streamKey: e.target.value})}
            />
            <div className="mt-2 text-xs text-slate-400 flex items-center">
              <HelpCircle className="w-3 h-3 mr-1" />
              Found in your {platform} Live Creator Studio settings.
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center transition-all disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <Save className="w-5 h-5 mr-2" /> Save Connection
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
