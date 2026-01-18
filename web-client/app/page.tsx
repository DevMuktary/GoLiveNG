import Link from 'next/link';
import { Video, Globe, Zap, Shield, ChevronRight, Activity, Users, Lock, Radio } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* Background Gradients (Subtle Glows) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] opacity-30"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              GoLiveNG
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="group relative px-6 py-2.5 rounded-full bg-white text-[#0B0F19] text-sm font-bold hover:bg-blue-50 transition-all overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-40 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">v1.0 Public Beta</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Stream to Facebook. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Without the Lag.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              The enterprise-grade relay engine. We process your YouTube stream on high-performance cloud servers and push it directly to Facebook Live in pristine 1080p.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 group">
                Start Streaming Free
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center px-6 text-sm text-slate-500">
                <Shield className="w-4 h-4 mr-2 text-slate-400" />
                Official API Partner
              </div>
            </div>
          </div>

          {/* Right: Abstract UI Visualization */}
          <div className="relative hidden lg:block">
            {/* Main Card */}
            <div className="relative z-10 bg-[#131926] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 aspect-video flex flex-col">
              {/* Fake Browser Header */}
              <div className="flex items-center space-x-2 border-b border-white/5 pb-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                <div className="ml-4 h-2 w-32 bg-white/5 rounded-full"></div>
              </div>
              {/* Fake Video Content */}
              <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg relative overflow-hidden border border-white/5 group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                    <Video className="w-6 h-6 text-white/50" />
                  </div>
                </div>
                {/* Live Badge */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
                  <Activity className="w-3 h-3 mr-1" /> LIVE
                </div>
                {/* Bitrate overlay */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur text-xs font-mono text-slate-300 px-3 py-1 rounded border border-white/10">
                  4,500 Kbps / 1080p
                </div>
              </div>
            </div>
            
            {/* Floating Element 1 */}
            <div className="absolute -right-8 -bottom-8 z-20 bg-[#1A2030] border border-white/10 p-4 rounded-xl shadow-xl animate-bounce-slow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Destination</div>
                  <div className="text-sm font-bold text-white">Facebook Page</div>
                </div>
              </div>
            </div>

            {/* Background Glow behind graphic */}
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10 rounded-full"></div>
          </div>
        </div>
      </main>

      {/* Stats / Trust Section */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem label="Active Streams" value="120+" />
            <StatItem label="Uptime Guarantee" value="99.9%" />
            <StatItem label="Data Processed" value="50TB+" />
            <StatItem label="Global Latency" value="< 2s" />
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Engineered for Reliability</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              We don't just copy links. We rebuild the video stream packet-by-packet to ensure Facebook accepts it at maximum quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Large Card */}
            <div className="md:col-span-2 bg-[#131926] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Cloud Transcoding Engine</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  Our servers handle the heavy lifting. Even if your internet dips, our engine keeps the connection to Facebook alive and buffering-free.
                </p>
              </div>
            </div>

            {/* Tall Card */}
            <div className="bg-[#131926] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors relative overflow-hidden">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Token Auth</h3>
              <p className="text-slate-400">
                No more copying risky stream keys. We use official OAuth 2.0 to securely connect to your Facebook account.
              </p>
            </div>

            {/* Small Card 1 */}
            <div className="bg-[#131926] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors">
              <Users className="w-8 h-8 text-slate-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Multi-Destination</h3>
              <p className="text-sm text-slate-400">Stream to Profiles, Pages, and Groups simultaneously.</p>
            </div>

            {/* Small Card 2 */}
            <div className="md:col-span-2 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-white/5 rounded-3xl p-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to go live?</h3>
                <p className="text-slate-400">Join the beta and start streaming in minutes.</p>
              </div>
              <Link href="/signup" className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#080B14] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-lg">GoLiveNG</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; 2026 Quadrox Tech. Engineered in Nigeria.
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
      <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}
