"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Facebook, Youtube, Twitch, Cast, 
  Plus, Activity, ArrowRight, Loader2 
} from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0 });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

      try {
        const res = await fetch('/api/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.status === 401 || res.status === 500) {
          // FIX: If token is invalid (signature mismatch), clear it and force login
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        const data = await res.json();
        setStats({
          total: data?.stats?.totalStreams || 0,
          active: data?.destinations?.length || 0
        });
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Broadcast Studio</h1>
        <p className="text-slate-500 text-lg">Select a platform to launch a new stream.</p>
      </div>

      {/* THE POWER HOUSE GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Facebook Launcher */}
        <PlatformLauncher 
          name="Facebook Live" 
          icon={<Facebook className="w-8 h-8 text-white" />} 
          color="bg-[#1877F2]" 
          desc="Stream to Profile or Pages"
          href="/dashboard/stream/facebook"
        />

        {/* YouTube Launcher */}
        <PlatformLauncher 
          name="YouTube Live" 
          icon={<Youtube className="w-8 h-8 text-white" />} 
          color="bg-[#FF0000]" 
          desc="Stream to Channel or Event"
          href="/dashboard/stream/youtube"
        />

        {/* Twitch Launcher */}
        <PlatformLauncher 
          name="Twitch" 
          icon={<Twitch className="w-8 h-8 text-white" />} 
          color="bg-[#9146FF]" 
          desc="Stream to Channel"
          href="/dashboard/stream/twitch"
        />

        {/* Custom RTMP */}
        <PlatformLauncher 
          name="Custom RTMP" 
          icon={<Cast className="w-8 h-8 text-white" />} 
          color="bg-slate-800" 
          desc="Stream to any server"
          href="/dashboard/stream/custom"
        />

        {/* Quick Stats Widget (Visual Filler) */}
        <div className="md:col-span-2 lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 flex items-center justify-between shadow-sm relative overflow-hidden group">
           <div className="relative z-10">
             <h3 className="text-xl font-bold text-slate-900 mb-1">Studio Performance</h3>
             <p className="text-slate-500 mb-6">You have completed <span className="font-bold text-emerald-600">{stats.total} broadcasts</span> so far.</p>
             <Link href="/dashboard/history" className="text-emerald-600 font-bold hover:underline flex items-center">
               View History <ArrowRight className="w-4 h-4 ml-2" />
             </Link>
           </div>
           <div className="bg-emerald-50 p-6 rounded-full">
             <Activity className="w-10 h-10 text-emerald-600" />
           </div>
        </div>

      </div>
    </div>
  );
}

function PlatformLauncher({ name, icon, color, desc, href }: any) {
  return (
    <Link href={href} className="group relative bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{name}</h3>
      <p className="text-slate-500 mb-8">{desc}</p>
      
      <div className="flex items-center font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
        Start Setup <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
      </div>

      {/* Decorative Glow */}
      <div className={`absolute -bottom-10 -right-10 w-40 h-40 ${color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity`}></div>
    </Link>
  );
}
