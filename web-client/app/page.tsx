import Link from 'next/link';
import { 
  Video, Globe, Zap, Shield, ChevronRight, Activity, 
  Users, Check, Play, Smartphone, Cast, Server 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] opacity-30"></div>
      </div>

      {/* --- Navbar --- */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              GoLiveNG
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="group relative px-6 py-2.5 rounded-full bg-white text-[#0B0F19] text-sm font-bold hover:bg-blue-50 transition-all overflow-hidden">
              <span className="relative z-10">Get Started</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="pt-40 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-xs font-bold text-blue-400 tracking-wide uppercase">New: 4K Support</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Go Live on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                All Platforms.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Stream directly to Facebook, YouTube, Twitch, and 50+ sites simultaneously. 
              No software needed. Just upload or link, and we handle the rest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 group">
                Go Live Now
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#demo" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#131926] border border-white/10 rounded-xl hover:bg-[#1A2030] transition-all">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8 mt-4">
              <div>
                <div className="text-2xl font-bold text-white">600k+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">5M+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Streams</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right: Visual Abstract */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 bg-[#131926] border border-white/10 rounded-2xl p-1 shadow-2xl shadow-black/50 aspect-video">
              <div className="bg-[#0B0F19] w-full h-full rounded-xl overflow-hidden relative flex flex-col">
                {/* Fake UI Header */}
                <div className="h-10 border-b border-white/5 flex items-center px-4 space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                {/* Visual Content */}
                <div className="flex-1 flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                   <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Cast className="w-10 h-10 text-blue-500" />
                      </div>
                      <div className="px-4 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-mono inline-block">
                        ● Broadcasting to 3 Destinations
                      </div>
                   </div>
                </div>
              </div>
            </div>
            {/* Floating Cards */}
            <FloatingCard icon={<Globe className="w-4 h-4 text-blue-400" />} title="Facebook Live" status="Connected" top="10%" right="-5%" />
            <FloatingCard icon={<Video className="w-4 h-4 text-red-400" />} title="YouTube" status="Streaming" bottom="10%" left="-5%" />
          </div>
        </div>
      </main>

      {/* --- Features Grid (Bento) --- */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Stream With Us?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We provide the infrastructure. You provide the content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Server className="w-6 h-6 text-purple-400" />}
              title="Cloud Transcoding"
              desc="We process your video on our servers. Even if you go offline, your stream stays live."
              className="md:col-span-2 bg-gradient-to-br from-[#131926] to-[#0f1219]"
            />
            <FeatureCard 
              icon={<Smartphone className="w-6 h-6 text-blue-400" />}
              title="Mobile Ready"
              desc="Stream directly from your browser or mobile app without OBS."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-yellow-400" />}
              title="Instant RTMP"
              desc="Get a custom stream key to push to any platform that accepts RTMP."
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-green-400" />}
              title="Multi-Streaming"
              desc="Send one video to Facebook, YouTube, and Twitch at the exact same time."
              className="md:col-span-2"
            />
          </div>
        </div>
      </section>

      {/* --- Pricing Plans (Grid instead of Carousel) --- */}
      <section id="pricing" className="py-24 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-400">Choose the plan that fits your streaming needs.</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            <PricingCard 
              title="Free" 
              price="0" 
              features={['2 streams/day', '20 mins duration', '1 Destination', 'Watermark enabled', 'Standard Ads']} 
            />
            <PricingCard 
              title="Basic" 
              price="30" 
              features={['5 recordings/day', '2 hours duration', 'No GoLive Ads', '1 Destination', '360p Quality']} 
              highlight 
            />
            <PricingCard 
              title="Gold" 
              price="299" 
              features={['15 recordings/day', '8 hours duration', '3 Destinations', '720p HD Quality', 'Custom Logo']} 
            />
            <PricingCard 
              title="Diamond" 
              price="799" 
              features={['Unlimited streams', '17 hours duration', '6 Destinations', '1080p Full HD', 'Priority Support']} 
            />
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FaqItem q="Do I need OBS or streaming software?" a="No. GoLiveNG lets you stream directly from your browser or mobile app. OBS is optional." />
          <FaqItem q="Can I stream pre-recorded videos?" a="Yes! You can upload a video file and we will stream it live for you, even looping it 24/7." />
          <FaqItem q="Is my Facebook/YouTube account safe?" a="Absolutely. We use official OAuth APIs verified by these platforms. We never see or store your passwords." />
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-white/5 bg-[#080B14] py-12 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-2 mb-6">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Video className="w-4 h-4 text-white" /></div>
             <span className="text-xl font-bold">GoLiveNG</span>
          </div>
          <div className="flex justify-center space-x-6 text-sm text-slate-400 mb-8">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <p className="text-slate-600 text-sm">&copy; 2026 Quadrox Tech. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

// --- Sub-Components ---

function FloatingCard({ icon, title, status, top, right, bottom, left }: any) {
  return (
    <div 
      className="absolute z-20 bg-[#1A2030] border border-white/10 p-3 rounded-xl shadow-xl flex items-center space-x-3 animate-bounce-slow"
      style={{ top, right, bottom, left }}
    >
      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">{icon}</div>
      <div>
        <div className="text-xs text-slate-400">{title}</div>
        <div className="text-[10px] font-bold text-green-400 flex items-center">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span> {status}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, className = "" }: any) {
  return (
    <div className={`bg-[#131926] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors group ${className}`}>
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, features, highlight }: any) {
  return (
    <div className={`relative p-6 rounded-3xl border flex flex-col ${highlight ? 'bg-blue-600/10 border-blue-500/50' : 'bg-[#131926] border-white/5'}`}>
      {highlight && <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">POPULAR</div>}
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold text-white">₹{price}</span>
        <span className="text-slate-500 text-sm">/mo</span>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-start text-sm text-slate-300">
            <Check className="w-4 h-4 text-blue-400 mr-2 mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${highlight ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
        Choose Plan
      </button>
    </div>
  );
}

function FaqItem({ q, a }: any) {
  return (
    <details className="group bg-[#131926] border border-white/5 rounded-2xl overflow-hidden">
      <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-white group-hover:bg-white/5 transition-colors">
        <span>{q}</span>
        <span className="transition group-open:rotate-180">
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </span>
      </summary>
      <div className="text-slate-400 px-6 pb-6 text-sm leading-relaxed border-t border-white/5 pt-4">
        {a}
      </div>
    </details>
  );
}
