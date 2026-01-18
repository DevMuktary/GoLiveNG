import Link from 'next/link';
import { 
  Video, Globe, Zap, Shield, Check, Play, 
  Facebook, Youtube, Tv, Smartphone, Layers, Cast 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-blue-200 shadow-lg">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">GoLiveNG</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-blue-600 transition-colors">FAQs</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden md:block text-sm font-bold text-slate-600 hover:text-blue-600">
              Log In
            </Link>
            <Link href="/signup" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-blue-200">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Live in 120+ Countries</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            One Stream. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Every Platform.
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The professional cloud engine that relays your content to Facebook, YouTube, Twitch, and TikTok simultaneously. No software required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center">
              Start Streaming Free
              <Zap className="w-5 h-5 ml-2 text-yellow-400 fill-current" />
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
              <Play className="w-5 h-5 mr-2 text-slate-400" />
              Watch Demo
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-8 opacity-60 grayscale">
             {/* Text placeholders for logos since we don't have images yet */}
             <span className="font-bold text-slate-400 text-xl flex items-center"><Youtube className="w-6 h-6 mr-2"/> YouTube</span>
             <span className="font-bold text-slate-400 text-xl flex items-center"><Facebook className="w-6 h-6 mr-2"/> Facebook</span>
             <span className="font-bold text-slate-400 text-xl flex items-center"><Cast className="w-6 h-6 mr-2"/> Twitch</span>
             <span className="font-bold text-slate-400 text-xl flex items-center"><Smartphone className="w-6 h-6 mr-2"/> TikTok</span>
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-70"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-50 rounded-full blur-[100px] opacity-70"></div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section id="features" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to go live</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We handle the complex transcoding infrastructure so you can focus on creating content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-blue-600" />}
              title="Cloud Simulcast"
              desc="Send one stream to us, and we distribute it to 30+ destinations instantly."
            />
            <FeatureCard 
              icon={<Layers className="w-6 h-6 text-green-600" />}
              title="Pre-Recorded Live"
              desc="Upload a video file and schedule it to go live 24/7. Perfect for replays."
            />
            <FeatureCard 
              icon={<Tv className="w-6 h-6 text-purple-600" />}
              title="No Hardware Needed"
              desc="Runs entirely in the cloud. You don't need an expensive PC or fast internet."
            />
          </div>
        </div>
      </section>

      {/* --- Pricing Section (Naira) --- */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-500">Start for free, scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
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
                "HD (1080p) Quality"
              ]}
              cta="Start Pro Trial"
              popular={true}
            />

            {/* Business Plan */}
            <PricingCard 
              title="Agency"
              price="₦25,000"
              period="/mo"
              features={[
                "24/7 Continuous Streaming",
                "Unlimited Destinations",
                "4K Quality Support",
                "Team Management",
                "Priority Support"
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
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GoLiveNG</span>
            </div>
            <p className="text-sm max-w-xs">
              Empowering creators in Nigeria and beyond to reach global audiences instantly.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white">Supported Apps</Link></li>
              <li><Link href="#" className="hover:text-white">Status</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 text-center text-sm">
          &copy; 2026 Quadrox Tech. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// --- Components ---

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, period, features, cta, popular }: any) {
  return (
    <div className={`p-8 rounded-3xl border ${popular ? 'border-blue-200 bg-blue-50/50 relative' : 'border-slate-200 bg-white'}`}>
      {popular && (
        <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
          MOST POPULAR
        </span>
      )}
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-extrabold text-slate-900">{price}</span>
        {period && <span className="text-slate-500 ml-1">{period}</span>}
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center text-sm text-slate-600">
            <Check className="w-4 h-4 text-green-500 mr-3 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link href="/signup" className={`block w-full py-3 rounded-xl font-bold text-center transition-all ${
        popular 
          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200' 
          : 'bg-slate-900 text-white hover:bg-slate-800'
      }`}>
        {cta}
      </Link>
    </div>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  return (
    <details className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
      <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-slate-900 hover:bg-slate-50 transition-colors">
        <span>{q}</span>
        <span className="transition group-open:rotate-180">
          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
        </span>
      </summary>
      <p className="text-slate-600 px-6 pb-6 leading-relaxed">
        {a}
      </p>
    </details>
  );
}
