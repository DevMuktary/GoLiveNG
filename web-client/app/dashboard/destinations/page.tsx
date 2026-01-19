"use client";
import { useState, useEffect } from 'react';
import { Plus, Facebook, Youtube, Twitch, Cast, Trash2, Loader2 } from 'lucide-react';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // In a real app, this would fetch from API
  // For now, we show the UI layout
  useEffect(() => {
    // Mock fetch or real fetch if API is ready
    setLoading(false);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Destinations</h1>
          <p className="text-slate-500">Manage where your content is streamed.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg shadow hover:bg-emerald-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Destination
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add New Cards */}
        <ConnectCard platform="Facebook" icon={<Facebook className="text-white" />} color="bg-blue-600" />
        <ConnectCard platform="YouTube" icon={<Youtube className="text-white" />} color="bg-red-600" />
        <ConnectCard platform="Twitch" icon={<Twitch className="text-white" />} color="bg-purple-600" />
        <ConnectCard platform="Custom RTMP" icon={<Cast className="text-white" />} color="bg-slate-800" />
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Connected Accounts</h2>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
           {destinations.length === 0 ? (
             <div className="p-8 text-center text-slate-400">
               No accounts connected yet. Select a platform above.
             </div>
           ) : (
             // List would go here
             <div></div>
           )}
        </div>
      </div>
    </div>
  );
}

function ConnectCard({ platform, icon, color }: any) {
  return (
    <button className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:ring-1 hover:ring-emerald-500 transition-all text-left shadow-sm">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 text-lg">{platform}</h3>
      <p className="text-sm text-slate-500 mt-1">Connect your {platform} account to stream instantly.</p>
    </button>
  );
}
