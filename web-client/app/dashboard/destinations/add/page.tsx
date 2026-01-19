"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AddDestination() {
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'Facebook';
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      // 1. Ask Backend for the Facebook Link
      const res = await fetch('/api/auth/connect', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ platform })
      });

      const data = await res.json();

      if (data.url) {
        // 2. Redirect User to Facebook
        window.location.href = data.url;
      } else {
        alert("Error: " + (data.error || "Could not connect"));
        setLoading(false);
      }
    } catch (err) {
      alert("Connection failed");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto pt-10">
      <Link href="/dashboard/destinations" className="flex items-center text-slate-500 hover:text-slate-800 mb-8 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Cancel Connection
      </Link>

      <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-xl text-center">
        
        {/* Logo */}
        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
           platform === 'Facebook' ? 'bg-blue-600' : 'bg-slate-800'
        }`}>
           <span className="text-3xl font-bold text-white">{platform.charAt(0)}</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Connect {platform}</h1>
        <p className="text-slate-500 mb-8">
          Grant GoLiveNG permission to stream live video to your {platform} account.
        </p>

        {/* Info Box */}
        <div className="bg-slate-50 rounded-xl p-6 text-left mb-8 space-y-4 border border-slate-100">
           <div className="flex items-start gap-3">
             <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
             <p className="text-sm text-slate-700 font-medium">Create live video posts</p>
           </div>
           <div className="flex items-start gap-3">
             <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
             <p className="text-sm text-slate-700 font-medium">We <strong>never</strong> post without your permission.</p>
           </div>
        </div>

        <button 
          onClick={handleConnect}
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-70 ${
            platform === 'Facebook' ? 'bg-[#1877F2] hover:bg-[#166fe5]' : 'bg-slate-900'
          }`}
        >
          {loading ? 'Redirecting...' : `Continue with ${platform}`}
        </button>
      </div>
    </div>
  );
}
