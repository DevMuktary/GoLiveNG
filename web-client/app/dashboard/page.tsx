"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, Wifi, Activity, HardDrive, 
  Calendar, ArrowUpRight, Signal, Globe,
  MoreHorizontal, Clock, CheckCircle, AlertCircle 
} from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Load User & Data
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
        }
      } catch (err) {
        console.error("Dashboard Load Error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* --- Header: Business Greeting --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-slate-500 mt-1">Here is your studio performance overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/schedule" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center shadow-sm">
            <Calendar className="w-4 h-4 mr-2" /> Schedule Event
          </Link>
          <Link href="/dashboard/destinations" className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center shadow-lg shadow-slate-200">
            <Globe className="w-4 h-4 mr-2" /> Manage Destinations
          </Link>
        </div>
      </div>

      {/* --- KPI Grid (Business Metrics) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="Total Streams" 
          value={data?.stats?.totalStreams || '0'} 
          icon={<Activity className="w-5 h-5 text-emerald-600" />}
          trend="+12% vs last month"
        />
        <StatCard 
          label="Active Destinations" 
          value={data?.stats?.activeDestinations || '0'} 
          icon={<Signal className="w-5 h-5 text-blue-600" />}
          trend="Healthy connection"
        />
        <StatCard 
          label="Storage Used" 
          value="1.2 GB" 
          icon={<HardDrive className="w-5 h-5 text-purple-600" />}
          trend="15% of quota"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* --- Left Column: Action & History (2/3 width) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Go Live Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Wifi className="w-32 h-32 text-emerald-500" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Start a Broadcast</h2>
              <p className="text-slate-500 mb-6 max-w-md">
                Ready to go live? Enter your source link or upload a file to begin streaming to your {data?.stats?.activeDestinations || 0} connected destinations.
              </p>
              
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="Paste YouTube or Direct Video Link..." 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-200 flex items-center transition-all">
                  <Play className="w-4 h-4 mr-2 fill-current" /> Go Live
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Recent Broadcasts</h3>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View All</button>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data?.recentStreams?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">
                      No streams found. Start your first broadcast above!
                    </td>
                  </tr>
                ) : (
                  data?.recentStreams?.map((stream: any) => (
                    <tr key={stream.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stream.status === 'LIVE' 
                            ? 'bg-red-100 text-red-800 animate-pulse' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {stream.status === 'LIVE' ? '● LIVE' : 'Completed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">{stream.title || 'Untitled Stream'}</td>
                      <td className="px-6 py-4 text-slate-500">{new Date(stream.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Right Column: Status & Health (1/3 width) --- */}
        <div className="space-y-6">
          
          {/* Destination Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Connections</h3>
              <Link href="/dashboard/destinations" className="p-1 hover:bg-slate-100 rounded-full">
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {data?.destinations?.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-slate-400 mb-3">No platforms connected.</p>
                  <Link href="/dashboard/destinations" className="text-sm font-bold text-emerald-600 hover:underline">
                    Connect Now
                  </Link>
                </div>
              ) : (
                data?.destinations?.map((dest: any) => (
                  <div key={dest.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${true ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                      <span className="font-medium text-slate-700 text-sm capitalize">{dest.platform}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Ready</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> Engine Status</span>
                <span className="font-bold text-emerald-600">Operational</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 flex items-center"><Clock className="w-4 h-4 mr-2 text-blue-500" /> Server Time</span>
                <span className="font-mono text-slate-700">UTC {new Date().getHours()}:00</span>
              </div>
            </div>
          </div>

          {/* Upgrade Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Upgrade to Pro</h3>
              <p className="text-slate-300 text-sm mb-4">Unlock 4K streaming and unlimited destinations.</p>
              <button className="w-full bg-white text-slate-900 py-2 rounded-lg font-bold text-sm hover:bg-emerald-50 transition-colors">
                View Plans
              </button>
            </div>
            {/* Abstract Shape */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500 rounded-full blur-2xl opacity-20"></div>
          </div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-500 text-sm font-medium">{label}</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{value}</h3>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <p className="text-xs font-medium text-emerald-600 bg-emerald-50 inline-block px-2 py-1 rounded-md">
        {trend}
      </p>
    </div>
  );
}
