"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Video, Globe, Zap, Shield, ChevronRight, Activity, Users, 
  Lock, Radio, Check, Plus, Minus, Facebook, Youtube, Twitch, Cast 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* --- Background FX --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] opacity-30"></div>
      </div>

      {/* --- Navigation --- */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">GoLiveNG</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Log In</Link>
            <Link href="/signup" className="px-6 py-2.5 rounded-full bg-white text-[#0B0F19] text-sm font-bold hover:bg-blue-50 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="pt-40 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">Live on v2.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Go Live on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                All Channels.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Stop choosing between YouTube and Facebook. Stream to all your social platforms simultaneously with zero lag. No software required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
                Start Streaming Free
              </Link>
              <div className="flex items-center px-6 text-sm text-slate-500">
                <Users className="w-4 h-4 mr-2 text-slate-400" />
                Trusted by 600k+ Users
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative z-10 bg-[#131926] border border-white/10 rounded-2xl p-2 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610366624921-6d7389816c2e?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/20 transition-all z-20">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
                {/* Live Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md flex items-center z-20">
                  <Activity className="w-3 h-3 mr-1.5" /> LIVE
                </div>
              </div>
              
              {/* Floating Platform Icons */}
              <div className="absolute -left-6 top-10 p-3 bg-[#1A2030] border border-white/10 rounded-xl shadow-xl">
                 <Youtube className="w-6 h-6 text-red-500" />
              </div>
              <div className="absolute -right-6 bottom-10 p-3 bg-[#1A2030] border border-white/10 rounded-xl shadow-xl">
                 <Facebook className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- Platforms Section --- */}
      <section className="py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Stream Everywhere</h2>
            <p className="text-slate-400">Connect your accounts once. Broadcast forever.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <PlatformCard icon={<Facebook className="text-blue-500" />} name="Facebook" desc="Profile & Pages" />
            <PlatformCard icon={<Youtube className="text-red-500" />} name="YouTube" desc="Channels & Events" />
            <PlatformCard icon={<Twitch className="text-purple-500" />} name="Twitch" desc="Gaming Live" />
            <PlatformCard icon={<Cast className="text-orange-500" />} name="RTMP" desc="Custom Server" />
          </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Choose the power you need. Upgrade anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <PricingCard 
              name="Basic" 
              price="30" 
              features={[
                "2 Live streams / day",
                "20 mins duration",
                "1 Destination",
                "360p Quality",
                "No Watermark"
              ]} 
            />
            
            {/* Gold Plan (Highlighted) */}
            <PricingCard 
              name="Gold" 
              price="299" 
              featured={true}
              features={[
                "15 Live streams / day",
                "8 Hours duration",
                "3 Destinations",
                "720p HD Quality",
                "Custom Logo Overlay",
                "No Ads"
              ]} 
            />

            {/* Diamond Plan */}
            <PricingCard 
              name="Diamond" 
              price="799" 
              features={[
                "Unlimited Streaming",
                "24 Hours duration",
                "8 Destinations",
                "1080p Full HD",
                "Priority Support",
                "Cloud Recording"
              ]} 
            />
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-24 px-6 bg-[#131926]/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem q="Do I need OBS or streaming software?" a="No. GoLiveNG allows you to stream directly from your browser. OBS is optional." />
            <FAQItem q="Can I stream to multiple Facebook pages?" a="Yes! Our Gold and Diamond plans allow multiple destinations, including multiple pages and profiles." />
            <FAQItem q="Is my account safe?" a="Absolutely. We use official APIs verified by Facebook and YouTube. We never see or store your keys." />
            <FAQItem q="Does it support pre-recorded videos?" a="Yes, you can upload a video file and 'Go Live' with it as if it were happening in real-time." />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-white/5 bg-[#080B14] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Video className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">GoLiveNG</span>
          </div>
          <div className="flex space-x-8 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-slate-500 text-sm">&copy; 2026 Quadrox Tech.</p>
        </div>
      </footer>
    </div>
  );
}

// --- Components ---

function PlatformCard({ icon, name, desc }: { icon: any, name: string, desc: string }) {
  return (
    <div className="bg-[#131926] border border-white/5 p-6 rounded-2xl hover:border-blue-500/50 transition-colors group cursor-pointer">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/10 transition-colors">
        {React.cloneElement(icon, { className: `w-6 h-6 ${icon.props.className}` })}
      </div>
      <h3 className="font-bold text-lg mb-1">{name}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  );
}

function PricingCard({ name, price, features, featured = false }: { name: string, price: string, features: string[], featured?: boolean }) {
  return (
    <div className={`relative p-8 rounded-3xl border ${featured ? 'bg-[#131926] border-blue-500 shadow-2xl shadow-blue-900/20' : 'bg-[#0B0F19] border-white/10'} flex flex-col`}>
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          Most Popular
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-slate-400 mb-2">{name}</h3>
        <div className="flex items-baseline">
          <span className="text-4xl font-bold">₹{price}</span>
          <span className="text-slate-500 ml-2">/month</span>
        </div>
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-center text-sm text-slate-300">
            <Check className={`w-4 h-4 mr-3 ${featured ? 'text-blue-400' : 'text-slate-500'}`} />
            {f}
          </li>
        ))}
      </ul>
      <Link href="/signup" className={`w-full py-3 rounded-xl font-bold text-center transition-all ${featured ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
        Choose {name}
      </Link>
    </div>
  );
}

function FAQItem({ q, a }: { q: string
