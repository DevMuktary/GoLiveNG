"use client";
import { useState } from 'react';
import { 
  Plus, Facebook, Youtube, Twitch, Cast, 
  Wifi, Clock, Upload, Link as LinkIcon, Play 
} from 'lucide-react';

export default function Dashboard() {
  const [streamSource, setStreamSource] = useState<'link' | 'file'>('link');

  return (
    <div className="space-y-8">
      
      {/* --- Header Section --- */}
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

      {/* --- 1. Destinations Row (Multi-Platform) --- */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Active Destinations</h2>
          <button className="text-sm text-emerald-600 font-bold hover:underline flex items-center">
            <Plus className="w-4 h-4 mr-1" /> Add New Destination
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Facebook Card (Connected) */}
          <DestinationCard 
            platform="Facebook" 
            icon={<Facebook className="w-5 h-5 text-white" />} 
            color="bg-blue-600"
            status="Ready"
            target="Quadrox Tech Page"
          />
          
          {/* YouTube Card (Connected) */}
          <DestinationCard 
            platform="YouTube" 
            icon={<Youtube className="w-5 h-5 text-white" />} 
            color="bg-red-600"
            status="Ready"
            target="Quadrox Gaming"
          />

          {/* Twitch (Offline) */}
          <DestinationCard 
            platform="Twitch" 
            icon={<Twitch className="w-5 h-5 text-white" />} 
            color="bg-purple-600"
            status="Offline"
            target="Not Connected"
            opacity="opacity-60 grayscale"
          />

           {/* Custom RTMP */}
           <DestinationCard 
            platform="Custom RTMP" 
            icon={<Cast className="w-5 h-5 text-white" />} 
            color="bg-slate-800"
            status="Offline"
            target="Configure"
            opacity="opacity-60"
          />
        </div>
      </section>

      {/* --- 2. Input Source (The "Go Live" Box) --- */}
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
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" 
                    placeholder="https://youtube.com/watch?v=..." 
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">Click to upload or drag video here</p>
              <p className="text-xs text-slate-500 mt-1">MP4, MOV up to 2GB</p>
            </div>
          )}

          {/* Loop Option */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="loop" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300" />
            <label htmlFor="loop" className="text-sm font-medium text-slate-700 flex items-center">
              Loop Stream (24/7 Mode) <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase rounded">Pro</span>
            </label>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 flex items-center transition-all">
              <Play className="w-5 h-5 mr-2 fill-current" />
              Start Streaming
            </button>
          </div>
        </div>
      </section>

      {/* --- 3. Recent Activity Table --- */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Broadcasts</h2>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Destinations</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Sunday Service Replay</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <Youtube className="w-4 h-4 text-red-600" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">2h 15m</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              {/* Add more rows dynamically later */}
            </tbody>
          </table>
          <div className="px-6 py-4 border-t border-slate-200 text-center">
             <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">View All History</button>
          </div>
        </div>
      </section>

    </div>
  );
}

function DestinationCard({ platform, icon, color, status, target, opacity = '' }: any) {
  return (
    <div className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:border-emerald-200 transition-colors ${opacity}`}>
      <div className="flex justify-between items-start">
        <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center shadow-md`}>
          {icon}
        </div>
        <div className={`w-2 h-2 rounded-full ${status === 'Ready' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
      </div>
      <div>
        <h3 className="font-bold text-slate-900">{platform}</h3>
        <p className="text-xs text-slate-500 truncate">{target}</p>
      </div>
      
      {/* Switch Toggle (Visual) */}
      <div className="absolute top-4 right-4">
         {/* Could add a real switch here later */}
      </div>
    </div>
  );
}
