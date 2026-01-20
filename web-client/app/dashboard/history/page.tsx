"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, StopCircle, PlayCircle, Calendar, 
  Clock, AlertCircle, Loader2, RefreshCw 
} from 'lucide-react';

export default function HistoryPage() {
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // 1. Fetch Streams
  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      // We assume /api/dashboard returns 'recentStreams'. 
      // For a full history page, you might want a dedicated endpoint later.
      setStreams(data.recentStreams || []);
    } catch (err) {
      console.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    
    // Auto-refresh every 10 seconds to check status updates
    const interval = setInterval(fetchHistory, 10000);
    return () => clearInterval(interval);
  }, []);

  // 2. Handle Stop Stream
  const handleStop = async (streamId: string) => {
    if (!confirm("Are you sure you want to stop this broadcast immediately?")) return;
    
    setProcessingId(streamId);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/streams/stop', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ streamId })
      });

      if (res.ok) {
        // Update UI locally to feel instant
        setStreams(prev => prev.map(s => s.id === streamId ? { ...s, status: 'COMPLETED' } : s));
      } else {
        alert("Failed to stop stream. Server error.");
      }
    } catch (err) {
      alert("Connection failed.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-12">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/dashboard" className="inline-flex items-center text-slate-500 hover:text-emerald-600 mb-2 font-bold text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Studio
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900">Broadcast History</h1>
        </div>
        <button 
          onClick={() => { setLoading(true); fetchHistory(); }}
          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        {streams.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No broadcasts yet</h3>
            <p className="text-slate-500 mb-6">Start your first stream from the dashboard.</p>
            <Link href="/dashboard" className="text-emerald-600 font-bold hover:underline">Go to Studio</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Platform</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {streams.map((stream) => (
                  <tr key={stream.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      {stream.status === 'STARTING' || stream.status === 'LIVE' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 animate-pulse border border-red-200">
                          <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span> LIVE NOW
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          Completed
                        </span>
                      )}
                    </td>

                    {/* Title & Loop Info */}
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{stream.title || "Untitled Stream"}</p>
                      {stream.loopCount !== 0 && (
                         <p className="text-xs text-emerald-600 font-medium flex items-center mt-1">
                           <RefreshCw className="w-3 h-3 mr-1" /> 
                           {stream.loopCount === -1 ? "Infinite Loop" : `Loop x${stream.loopCount}`}
                         </p>
                      )}
                    </td>

                    {/* Platform (Mocked logic for display) */}
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                       Facebook Live
                       {/* In real app, we would join the Destination table to get this */}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                      {new Date(stream.createdAt).toLocaleDateString()}
                      <span className="text-xs ml-2 opacity-60">
                        {new Date(stream.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </td>

                    {/* Stop Button */}
                    <td className="px-6 py-4 text-right">
                      {stream.status === 'STARTING' || stream.status === 'LIVE' ? (
                        <button 
                          onClick={() => handleStop(stream.id)}
                          disabled={processingId === stream.id}
                          className="inline-flex items-center px-4 py-2 bg-white border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-50 hover:border-red-300 transition-all shadow-sm"
                        >
                          {processingId === stream.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <StopCircle className="w-4 h-4 mr-2" />}
                          END STREAM
                        </button>
                      ) : (
                        <button disabled className="text-xs font-bold text-slate-300 cursor-not-allowed">
                          Ended
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
