import Link from 'next/link';
import { 
  Video, Globe, Zap, Shield, Check, Play, 
  Facebook, Youtube, Tv, Smartphone, Layers, Cast,
  Layout, Users, BarChart3, ChevronRight, Menu
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">GoLiveNG</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <Link href="#features" className="hover:text-blue-700 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-blue-700 transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-blue-700 transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden md:block text-sm font-bold text-slate-600 hover:text-blue-700">
              Log In
            </Link>
            <Link href="/signup" className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-20 pb-32 px-6 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span>Live in 120+ Countries</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] mb-6">
              Stream Once. <br />
              <span className="text-blue-700">Reach Everywhere.</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              The professional cloud engine that relays your content to Facebook, YouTube, Twitch, and TikTok simultaneously. No software installation required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-200">
                Start Streaming Free
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="#demo" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                <Play className="w-5 h-5 mr-2 text-blue-600" />
                View Demo
              </Link>
            </div>

            <div className="mt-10 flex items-center space-x-6 text-sm font-medium text-slate-500">
              <span className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> No Credit Card</span>
              <span className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> 14-Day Pro Trial</span>
            </div>
          </div>

          {/* Right Visual (Mockup) */}
          <div className="relative lg:block hidden">
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="bg-slate-50 rounded-xl overflow-hidden aspect-video border border-slate-100 relative group">
                {/* Fake UI */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></div> LIVE
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                  <Video className="w-16 h-16 text-slate-300" />
                </div>
                {/* Floating Stats */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur border border-slate-200 p-3 rounded-lg flex justify-between items-center shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <Youtube className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-bold text-slate-600">+3 others</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-green-600">Bitrate: 4500kbps</div>
                </div>
              </div>
            </div>
            {/* Background Blob */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200/50 rounded-full blur-[80px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* --- Trust / Social Proof --- */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by 12,000+ Creators</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale">
            <span className="flex items-center font-bold text-xl text-slate-500"><Youtube className="w-6 h-6 mr-2" /> YouTube</span>
            <span className="flex items-center font-bold text-xl text-slate-500"><Facebook className="w-6 h-6 mr-2" /> Facebook</span>
            <span className="flex items-center font-bold text-xl text-slate-500"><Cast className="w-6 h-6 mr-2" /> Twitch</span>
            <span className="flex items-center font-bold text-xl text-slate-500"><Smartphone className="w-6 h-6 mr-2" /> TikTok</span>
          </div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Everything you need to go live</h2>
            <p className="text-lg text-slate-500">
              We handle the complex transcoding infrastructure so you can focus on creating content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-blue-600" />}
              title="Cloud Simulcast"
              desc="Send one stream to us, and we distribute it to 30+ destinations instantly without lagging your internet."
            />
            <FeatureCard 
              icon={<Layers className="w-6 h-6 text-indigo-600" />}
              title="Pre-Recorded Live"
              desc="Upload a video file and schedule it to go live 24/7. Perfect for replays and webinars."
            />
            <FeatureCard 
              icon={<Tv className="w-6 h-6 text-purple-600" />}
              title="No Hardware Needed"
              desc="Runs entirely in the cloud. You don't need an expensive PC, OBS, or fast internet upload speed."
            />
             <FeatureCard 
              icon={<Layout className="w-6 h-6 text-teal-600" />}
              title="Custom Branding"
              desc="Add your logo, watermarks, and overlays directly from the dashboard to look professional."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6 text-orange-600" />}
              title="Analytics"
              desc="Track viewer counts, engagement, and stream health across all platforms in one place."
            />
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-pink-600" />}
              title="Team Accounts"
              desc="Invite your editors and producers to manage streams without sharing your passwords."
            />
          </div>
        </div>
      </section>

      {/* --- How it Works --- */}
      <section id="how-it-works" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">How it Works</h2>
              <div className="space-y-8">
                <StepItem number="1" title="Connect your Accounts" desc="Link your Facebook, YouTube, and Twitch accounts securely via official APIs." />
                <StepItem number="2" title="Choose your Source" desc="Upload a video, use your webcam, or send an RTMP signal from OBS." />
                <StepItem number="3" title="Go Live" desc="Click one button to start broadcasting to all platforms simultaneously." />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
               {/* Visual representation of flow */}
               <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 w-full text-center">
                    <span className="font-bold text-blue-800">Your Source</span>
                  </div>
                  <div className="h-8 w-0.5 bg-slate-300"></div>
                  <div className="p-6 bg-slate-900 rounded-xl w-full text-center text-white shadow-lg">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <span className="font-bold">GoLiveNG Cloud Engine</span>
                  </div>
                  <div className="h-8 w-0.5 bg-slate-300"></div>
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <div className="p-2 bg-white border border-slate-200 rounded text-center text-xs font-bold">Facebook</div>
                    <div className="p-2 bg-white border border-slate-200 rounded text-center text-xs font-bold">YouTube</div>
                    <div className="p-2 bg-white border border-slate-200 rounded text-center text-xs font-bold">Twitch</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Pricing Section (Naira) --- */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-500">Prices in Naira. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <PricingCard 
              title="Starter"
              price="₦0"
              features={[
                "20 minutes per stream",
                "1 Destination",
                "Watermarked Video",
                "Standard Support"
              ]}
              cta="Try Free"
              popular={false}
            />

            {/* Pro Plan */}
            <PricingCard 
              title="Creator Pro"
              price="₦8,500"
              period="/mo"
              features={[
                "4 Hours per stream",
                "3 Destinations",
                "No Watermark",
                "Pre-recorded Streaming",
                "HD (1080p) Quality",
                "Priority Support"
              ]}
              cta="Start Pro Trial"
              popular={true}
            />

            {/* Agency Plan */}
            <PricingCard 
              title="Agency"
              price="₦25,000"
              period="/mo"
              features={[
                "24/7 Continuous Streaming",
                "Unlimited Destinations",
                "4K Quality Support",
                "Team Management",
                "Commercial License",
                "Dedicated Manager"
              ]}
              cta="Contact Sales"
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqItem 
              q="Do I need OBS software?" 
              a="No. You can stream directly from your browser or upload a video file to our dashboard. However, we fully support OBS if you prefer it." 
            />
            <FaqItem 
              q="Can I stream to Facebook Groups?" 
              a="Yes! GoLiveNG supports Facebook Profiles, Pages, and Groups using our official API integration." 
            />
            <FaqItem 
              q="Is my social media account safe?" 
              a="Absolutely. We use official OAuth login (Login with Facebook/Google). We never see or store your passwords." 
            />
            <FaqItem 
              q="Does it work on mobile?" 
              a="Yes, our platform is fully responsive. You can manage and start streams directly from your phone." 
            />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">GoLiveNG</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Empowering creators in Nigeria and beyond to reach global audiences instantly.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-blue-700">Pricing</Link></li>
              <li><Link href="#" className="hover:text-blue-700">Supported Apps</Link></li>
              <li><Link href="#" className="hover:text-blue-700">Status</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#" className="hover:text-blue-700">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-700">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-700">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
          &copy; 2026 Quadrox Tech. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// --- Components ---

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 border border-slate-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, period, features, cta, popular }: any) {
  return (
    <div className={`p-8 rounded-3xl border flex flex-col ${popular ? 'border-blue-200 bg-blue-50/50 relative shadow-xl' : 'border-slate-200 bg-white hover:shadow-lg transition-shadow'}`}>
      {popular && (
        <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl tracking-widest uppercase">
          Most Popular
        </span>
      )}
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-extrabold text-slate-900">{price}</span>
        {period && <span className="text-slate-500 ml-1 text-sm font-medium">{period}</span>}
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-start text-sm text-slate-600">
            <Check className="w-4 h-4 text-blue-600 mr-3 shrink-0 mt-0.5" />
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>
      <Link href="/signup" className={`block w-full py-3.5 rounded-xl font-bold text-center text-sm transition-all ${
        popular 
          ? 'bg-blue-700 text-white hover:bg-blue-800 shadow-lg shadow-blue-200' 
          : 'bg-slate-900 text-white hover:bg-slate-800'
      }`}>
        {cta}
      </Link>
    </div>
  );
}

function StepItem({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex items-start">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 mr-4 shrink-0">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-slate-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  return (
    <details className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-slate-900 hover:bg-slate-50 transition-colors">
        <span>{q}</span>
        <span className="transition-transform group-open:rotate-180 text-blue-600">
          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
        </span>
      </summary>
      <p className="text-slate-600 px-6 pb-6 leading-relaxed border-t border-slate-100 pt-4 text-sm">
        {a}
      </p>
    </details>
  );
}
