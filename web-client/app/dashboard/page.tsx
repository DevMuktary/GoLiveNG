"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Wifi, Activity, HardDrive, Calendar, Signal, Globe, MoreHorizontal, CheckCircle, Clock, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  
  // Stream Form State
  const [sourceUrl, setSourceUrl] = useState('');
  const [selectedDestId, setSelectedDestId] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));

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
            // Auto-select first destination if available
            if (json.destinations?.length > 0) {
                setSelectedDestId(json.destinations[0].id);
            }
        }
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleGoLive = async () => {
    if (!sourceUrl) return alert("Please enter a video link.");
    if (!selectedDestId) return alert("Please select a destination.");

    setIsStarting(true);
    const token = localStorage.getItem('token');

    try {
        const res = await fetch('/api/streams/start', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: "Live from Dashboard",
                sourceUrl,
                destinationId: selectedDestId,
                pageId: 'me' // Default to Profile for now (We can add Page selector later)
            })
        });

        const result = await res.json();
        
        if (res.ok) {
            alert(`Stream Started! Target: ${result.targetUrl.substring(0, 30)}...`);
            // Refresh dashboard data to show new stream
            window.location.reload(); 
        } else {
            alert("Error: " + result.error);
        }
    } catch (err) {
        alert("Failed to start stream.");
    } finally {
        setIsStarting(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-emerald-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-slate-500 mt-1">Here is your studio performance overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/destinations" className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center shadow-lg shadow-slate-200">
            <Globe className="w-4 h-4 mr-2" /> Manage Destinations
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Streams" value={data?.stats?.totalStreams || '0'} icon={<Activity className="text-emerald-600" />} trend="All time" />
        <StatCard label="Active Destinations" value={data?.stats?.activeDestinations || '0'} icon={<Signal className="text-blue-600" />} trend="Connected" />
        <StatCard label="System Status" value="Online" icon={<HardDrive className="text-purple-600" />} trend="100% Uptime" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Action Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Go Live Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Start a Broadcast</h2>
              <p className="text-slate-500 mb-6">
                Enter a video source URL (YouTube, m3u8, mp4) to begin.
              </p>
              
              <div className="space-y-4">
                 {/* Destination Selector */}
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Destination</label>
                    <select 
                        className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
                        value={selectedDestId}
                        onChange={(e) => setSelectedDestId(e.target.value)}
                    >
                        {data?.destinations?.map((d: any) => (
                            <option key={d.id} value={d.id}>
                                {d.platform.charAt(0).toUpperCase() + d.platform.slice(1)} - {d.nickname}
                            </option>
                        ))}
                        {data?.destinations?.length === 0 && <option>No destinations found</option>}
                    </select>
                 </div>

                 {/* Source Input */}
                 <div className="flex gap-3">
                    <input 
                    type="text" 
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                    <button 
                        onClick={handleGoLive}
                        disabled={isStarting || data?.destinations?.length === 0}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 flex items-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isStarting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 mr-2 fill-current" />}
                        Go Live
                    </button>
                 </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100"><h3 className="font-bold text-slate-900">Recent Broadcasts</h3></div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.recentStreams?.map((stream: any) => (
                    <tr key={stream.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stream.status === 'LIVE' ? 'bg-red-100 text-red-800 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                          {stream.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">{stream.title}</td>
                      <td className="px-6 py-4 text-slate-500">{new Date(stream.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (Info) */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-4">Connections</h3>
             {data?.destinations?.length === 0 ? (
                 <p className="text-sm text-slate-400">No platforms connected.</p>
             ) : (
                 <div className="space-y-3">
                     {data?.destinations?.map((d: any) => (
                         <div key={d.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                            <span className="font-medium text-slate-700 capitalize">{d.platform}</span>
                            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">Ready</span>
                         </div>
                     ))}
                 </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div><p className="text-slate-500 text-sm font-medium">{label}</p><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{value}</h3></div>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <p className="text-xs font-medium text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded-md">{trend}</p>
    </div>
  );
}
