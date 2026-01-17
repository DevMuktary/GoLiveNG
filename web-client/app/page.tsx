import Link from 'next/link';
import { Video, Cast, Zap, Shield, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="border-b border-slate-800 backdrop-blur-md fixed w-full z-50 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">GoLiveNG</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">
              Log in
            </Link>
            <Link href="/signup" className="bg-white text-slate-950 px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Now Available for Facebook
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Restreaming, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Perfected.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The professional engine to relay your YouTube streams directly to Facebook Live in 1080p. No dropped frames. No complex setups.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center group">
              Start Streaming Free
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#features" className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl font-medium text-lg transition-all">
              How it works
            </Link>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Cast className="w-6 h-6 text-blue-400" />}
            title="Smart Relay"
            desc="Paste a YouTube link, and we instantly relay it to your Facebook Page, Profile, or Group."
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-amber-400" />}
            title="Zero Latency Engine"
            desc="Powered by high-performance servers that transcode your video in real-time without buffering."
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-emerald-400" />}
            title="Secure Integration"
            desc="We use official Facebook APIs. No shady stream keys or risk of account bans."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>&copy; 2026 Quadrox Tech. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
      <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
