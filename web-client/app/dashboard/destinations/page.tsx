"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Facebook, Youtube, Twitch, Cast, Loader2 } from 'lucide-react';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load Data
  useEffect(() => {
    const fetchDests = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/destinations', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setDestinations(await res.json());
      setLoading(false);
    };
    fetchDests();
  }, []);

  // Delete Handler
  const handleDelete = async (id: string) => {
    if (!confirm('Disconnect this account?')) return;
    const token = localStorage.getItem('token');
    await fetch(`/api/destinations?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setDestinations(destinations.filter(d => d.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      {/* 1. Add New Section */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Connect New Platform</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ConnectCard platform="Facebook" icon={<Facebook className="text-white" />} color="bg-blue-600" />
          <ConnectCard platform="YouTube" icon={<Youtube className="text-white" />} color="bg-red-600" />
          <ConnectCard platform="Twitch" icon={<Twitch className="text-white" />} color="bg-purple-600" />
          <ConnectCard platform="Custom RTMP" icon={<Cast className="text-white" />} color="bg-slate-800" />
        </div>
      </section>

      {/* 2. Connected List */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-6">Active Connections</h2>
        
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="animate-spin text-emerald-600" /></div>
        ) : destinations.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-400">
            No accounts connected yet. Select a platform above.
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
            {destinations.map((dest) => (
              <div key={dest.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-sm ${
                    dest.platform === 'facebook' ? 'bg-blue-600' : 
                    dest.platform === 'youtube' ? 'bg-red-600' : 'bg-slate-800'
                  }`}>
                    {dest.platform.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{dest.nickname}</h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {dest.streamKey.substring(0, 4)}••••••••••••
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                   <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                     Active
                   </div>
                   <button 
                     onClick={() => handleDelete(dest.id)}
                     className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

function ConnectCard({ platform, icon, color }: any) {
  return (
    <Link 
      href={`/dashboard/destinations/add?platform=${platform}`}
      className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:ring-1 hover:ring-emerald-500 transition-all text-left shadow-sm flex items-center gap-4"
    >
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-900">{platform}</h3>
        <span className="text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Connect +</span>
      </div>
    </Link>
  );
}
