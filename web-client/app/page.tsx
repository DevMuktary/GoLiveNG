import Link from 'next/link';
import { 
  Video, Globe, Zap, Shield, Check, Play, 
  Smartphone, Cast, Server, Radio, Users, 
  ArrowRight, LayoutGrid, Lock
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* --- Navigation --- */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">GoLiveNG</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <Link href="#solutions" className="hover:text-emerald-600 transition-colors">Solutions</Link>
            <Link href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</Link>
            <Link href="#resources" className="hover:text-emerald-600 transition-colors">Resources</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden md:block text-sm font-bold text-slate-600 hover:text-emerald-600">
              Log In
            </Link>
            <Link href="/signup" className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 px-6 relative bg-white overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-1.5">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">New: 4K RTMP Support</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              The Operating System for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Live Video.
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
              GoLiveNG is the infrastructure layer for creators. Stream to Facebook, YouTube, and 30+ destinations simultaneously with zero latency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-emerald-200 flex items-center justify-center">
                Start Streaming Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="#demo" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:border-emerald-200 hover:text-emerald-700 transition-all flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                View Demo
              </Link>
            </div>

            <div className="pt-8 flex items-center space-x-6 text-sm font-medium text-slate-400">
              <span className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-500" /> No Credit Card</span>
              <span className="flex items-center"><Check className="w-4 h-4 mr-2 text-emerald-500" /> 14-Day Pro Trial</span>
            </div>
          </div>

          {/* Hero Visual (Abstract Interface) */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden aspect-[4/3]">
              {/* Fake UI Header */}
              <div className="h-10 border-b border-slate-800 bg-slate-900/50 flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              {/* Fake UI Body */}
              <div className="p-8 grid grid-cols-2 gap-4 h-full">
                <div className="bg-slate-800 rounded-lg animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-24 bg-slate-800 rounded-lg"></div>
                  <div className="h-24 bg-slate-800 rounded-lg"></div>
                  <div className="h-24 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700"></div>
                </div>
              </div>
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg flex items-center">
                <Radio className="w-4 h-4 mr-2 animate-pulse" /> Live: 1080p / 60fps
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Deep Dive Features (Checkerboard) --- */}
      <section id="solutions" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          
          {/* Feature 1: Multi-streaming */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="aspect-square bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex items-center justify-center">
                 <div className="grid grid-cols-2 gap-4 w-full">
                   <PlatformIcon color="bg-blue-600" name="Facebook" />
                   <PlatformIcon color="bg-red-600" name="YouTube" />
                   <PlatformIcon color="bg-purple-600" name="Twitch" />
                   <PlatformIcon color="bg-black" name="TikTok" />
                 </div>
               </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Cast className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Multiply your audience. Instantly.</h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-6">
                Stop choosing between platforms. With our cloud relay, you send one stream to us, and we distribute it to Facebook, YouTube, LinkedIn, and custom RTMP destinations simultaneously.
              </p>
              <ul className="space-y-3">
                <FeaturePoint text="No extra bandwidth required" />
                <FeaturePoint text="Individual chat aggregation (Coming Soon)" />
                <FeaturePoint text="Custom RTMP for bespoke platforms" />
              </ul>
            </div>
          </div>

          {/* Feature 2: Pre-Recorded */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <Server className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Go live while you sleep.</h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-6">
                Upload your high-quality edited videos and schedule them to go live automatically. Perfect for product launches, re-runs, and maintaining 24/7 presence.
              </p>
              <ul className="space-y-3">
                <FeaturePoint text="Loop videos for 24/7 streaming" />
                <FeaturePoint text="Cloud storage included" />
                <FeaturePoint text="Server-side scheduling (No PC needed)" />
              </ul>
            </div>
            <div className="relative">
               <div className="aspect-video bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center p-8">
                 <div className="text-center">
                   <div className="text-5xl font-mono font-bold text-slate-900 mb-2">24:00:00</div>
                   <div className="text-sm text-emerald-600 font-bold uppercase tracking-wider">Continuous Uptime</div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- Pricing Section (Detailed) --- */}
      <section id="pricing" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Transparent Pricing</h2>
            <p className="text-xl text-slate-500">Choose the plan that fits your growth. No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <PricingCard 
              name="Starter"
              price="Free"
              desc="For testing waters"
              features={[
                "20 mins / stream",
                "1 Destination",
                "Watermarked",
                "Standard Quality"
              ]}
              btnText="Sign Up Free"
              btnStyle="bg-slate-100 text-slate-900 hover:bg-slate-200"
            />
            
            {/* Pro */}
            <PricingCard 
              name="Creator"
              price="₦8,500"
              period="/mo"
              desc="For serious influencers"
              highlight={true}
              features={[
                "4 Hours / stream",
                "3 Destinations",
                "No Watermark",
                "1080p HD",
                "Pre-recorded Streaming"
              ]}
              btnText="Start Pro Trial"
              btnStyle="bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200"
            />

            {/* Business */}
            <PricingCard 
              name="Business"
              price="₦25,000"
              period="/mo"
              desc="For media agencies"
              features={[
                "Unlimited Duration",
                "Unlimited Destinations",
                "4K Support",
                "Team Seats",
                "Priority Support",
                "API Access"
              ]}
              btnText="Contact Sales"
              btnStyle="bg-slate-900 text-white hover:bg-slate-800"
            />
          </div>
        </div>
      </section>

      {/* --- Global Footer --- */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Video className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">GoLiveNG</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                GoLiveNG is the leading cloud streaming platform in Nigeria, empowering creators to reach global audiences on Facebook, YouTube, and Twitch without hardware limitations.
              </p>
              <div className="flex space-x-4">
                 {/* Social Icons Placeholder */}
                 <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                 <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                 <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-emerald-600">Features</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Pricing</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">API</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-emerald-600">Blog</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Help Center</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Community</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">OBS Guide</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-emerald-600">Privacy</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Terms</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <p>&copy; 2026 Quadrox Tech. Lagos, Nigeria.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <span>English (NG)</span>
               <span>₦ NGN</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// --- Sub Components ---

function FeaturePoint({ text }: { text: string }) {
  return (
    <li className="flex items-center text-slate-700">
      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3 shrink-0">
        <Check className="w-3 h-3 text-emerald-600" />
      </div>
      {text}
    </li>
  );
}

function PlatformIcon({ color, name }: { color: string, name: string }) {
  return (
    <div className={`aspect-video rounded-xl ${color} flex items-center justify-center text-white font-bold shadow-lg`}>
      {name}
    </div>
  );
}

function PricingCard({ name, price, period, desc, features, btnText, btnStyle, highlight }: any) {
  return (
    <div className={`p-8 rounded-3xl border flex flex-col ${highlight ? 'border-emerald-200 bg-emerald-50/30 relative' : 'border-slate-200 bg-white'}`}>
      {highlight && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          Most Popular
        </span>
      )}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-2">{name}</h3>
        <p className="text-sm text-slate-500 mb-6">{desc}</p>
        <div className="flex items-baseline">
          <span className="text-4xl font-extrabold text-slate-900">{price}</span>
          {period && <span className="text-slate-500 ml-1">{period}</span>}
        </div>
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center text-sm text-slate-600">
            <Check className="w-4 h-4 text-emerald-500 mr-3 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link href="/signup" className={`w-full py-3 rounded-xl font-bold text-center transition-all ${btnStyle}`}>
        {btnText}
      </Link>
    </div>
  );
}
