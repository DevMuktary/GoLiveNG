"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AddDestination() {
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'Facebook';
  const [loading, setLoading] = useState(false);

  // This function redirects the user to the Official Login Page
  const handleConnect = async () => {
    setLoading(true);
    // In a real app, this points to your backend OAuth route
    // window.location.href = `/api/auth/connect/${platform.toLowerCase()}`;
    
    // For now, we simulate the "Success" flow to show you the UX
    setTimeout(() => {
        alert("In production, this redirects to " + platform + " to approve permissions.");
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto pt-10">
      <Link href="/dashboard/destinations" className="flex items-center text-slate-500 hover:text-slate-800 mb-8 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Cancel Connection
      </Link>

      <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-xl text-center">
        
        {/* Platform Logo */}
        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
           platform === 'Facebook' ? 'bg-blue-600' :
           platform === 'YouTube' ? 'bg-red-600' :
           platform === 'Twitch' ? 'bg-purple-600' : 'bg-slate-800'
        }`}>
           <span className="text-3xl font-bold text-white">{platform.charAt(0)}</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Connect {platform}</h1>
        <p className="text-slate-500 mb-8">
          Grant GoLiveNG permission to stream live video to your {platform} account.
        </p>

        {/* Permissions List */}
        <div className="bg-slate-50 rounded-xl p-6 text-left mb-8 space-y-4 border border-slate-100">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">WE WILL BE ABLE TO:</h3>
           
           <div className="flex items-start gap-3">
             <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
             <p className="text-sm text-slate-700 font-medium">Create live video posts on your behalf</p>
           </div>
           <div className="flex items-start gap-3">
             <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
             <p className="text-sm text-slate-700 font-medium">Read stream keys and RTMP URLs</p>
           </div>
           <div className="flex items-start gap-3">
             <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
             <p className="text-sm text-slate-700 font-medium">We will <strong>never</strong> post without your permission.</p>
           </div>
        </div>

        <button 
          onClick={handleConnect}
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
            platform === 'Facebook' ? 'bg-[#1877F2] hover:bg-[#166fe5]' :
            platform === 'YouTube' ? 'bg-[#FF0000] hover:bg-[#d90000]' :
            platform === 'Twitch' ? 'bg-[#9146FF] hover:bg-[#7a2df9]' : 'bg-slate-900'
          }`}
        >
          {loading ? 'Connecting...' : `Continue with ${platform}`}
        </button>

        <p className="mt-6 text-xs text-slate-400">
          By connecting, you agree to the Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
