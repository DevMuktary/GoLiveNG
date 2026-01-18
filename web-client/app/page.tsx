import Link from 'next/link';
import { 
  Video, Globe, Zap, Shield, ChevronRight, Check, 
  Smartphone, Cast, Layout, HelpCircle, Facebook, Youtube, Twitch
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">GoLiveNG</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold text-blue-700 tracking-wide uppercase">Live on Social Media</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              One Stream. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                Every Platform.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Stop struggling with slow internet. Send us one video feed, and our cloud servers will relay it to Facebook, YouTube, and Instagram instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="/signup" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 group">
                Start Streaming Free
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                See How It Works
              </a>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start space-x-6 grayscale opacity-60">
               {/* Platform Logos (CSS Placeholders) */}
               <div className="flex items-center space-x-2"><Facebook className="w-5 h-5" /><span className="font-bold">Facebook</span></div>
               <div className="flex items-center space-x-2"><Youtube className="w-5 h-5" /><span className="font-bold">YouTube</span></div>
               <div className="flex items-center space-x-2"><Twitch className="w-5 h-5" /><span className="font-bold">Twitch</span></div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative mx-auto lg:mx-0 max-w-[600px] perspective-1000">
             {/* Main App Window Mockup */}
             <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 transform rotate-y-12 transition-transform hover:rotate-0 duration-700">
                <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100 aspect-video relative group">
                  {/* Fake Header */}
                  <div className="absolute top-0 w-full h-10 bg-white border-b border-slate-100 flex items-center px-4 space-x-2 z-10">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  
                  {/* Fake Content */}
                  <div className="absolute inset-0 pt-10 flex items-center justify-center bg-gradient-to-br from-slate-100 to-white">
                     <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                           <Cast className="w-8 h-8" />
                        </div>
                        <div className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold inline-flex items-center">
                           <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                           Connection Excellent
                        </div>
                     </div>
                  </div>
                </div>
             </div>

             {/* Floating Badge */}
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center space-x-3 animate-bounce-slow">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Latency</p>
                  <p className="text-sm font-bold text-slate-900">0.5 Seconds</p>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <Stat label="Active Streamers" value="12,000+" />
          <Stat label="Countries Reached" value="35+" />
          <Stat label="Uptime Guarantee" value="99.9%" />
          <Stat label="Data Served" value="500 TB" />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to go viral</h2>
            <p className="text-slate-600 text-lg">We handle the technical heavy lifting so you can focus on creating content.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             <FeatureCard 
               icon={<Globe className="w-6 h-6 text-blue-600" />}
               title="Multistreaming"
               desc="Stream to Facebook, YouTube, Twitch, and custom RTMP destinations simultaneously."
             />
             <FeatureCard 
               icon={<Smartphone className="w-6 h-6 text-purple-600" />}
               title="Mobile Ready"
               desc="Our interface works perfectly on mobile browsers. Go live from anywhere in Nigeria."
             />
             <FeatureCard 
               icon={<Layout className="w-6 h-6 text-emerald-600" />}
               title="No Software Needed"
               desc="Forget OBS. Just upload a video or use your webcam directly in the browser."
             />
             <FeatureCard 
               icon={<Shield className="w-6 h-6 text-indigo-600" />}
               title="Secure & Private"
               desc="We use official APIs. We never store your passwords or stream keys."
             />
             <FeatureCard 
               icon={<Zap className="w-6 h-6 text-yellow-600" />}
               title="Cloud Transcoding"
               desc="We convert your video quality in the cloud to ensure smooth playback for viewers."
             />
             <FeatureCard 
               icon={<Cast className="w-6 h-6 text-pink-600" />}
               title="Pre-recorded Live"
               desc="Schedule a pre-recorded video to go live automatically while you sleep."
             />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple Pricing</h2>
            <p className="text-slate-600 text-lg">Start for free, upgrade as you grow.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <PricingCard 
              name="Starter"
              price="₦0"
              desc="For testing the waters."
              features={[
                "20 mins per stream",
                "1 Destination",
                "Watermarked Video",
                "Standard Support"
              ]}
            />
            
            {/* Pro Plan */}
            <PricingCard 
              name="Creator"
              price="₦3,500"
              period="/mo"
              desc="For serious content creators."
              popular={true}
              features={[
                "4 hours per stream",
                "3 Destinations",
                "No Watermark",
                "Pre-recorded Streaming",
                "Priority Support"
              ]}
            />

            {/* Business Plan */}
            <PricingCard 
              name="Business"
              price="₦15,000"
              period="/mo"
              desc="For Mosques and businesses."
              features={[
                "24/7 Streaming",
                "Unlimited Destinations",
                "4K Quality Support",
                "Custom RTMP Server",
                "Dedicated Account Manager"
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            <FAQItem question="Do I need fast internet?" answer="For our cloud streaming service, you only need enough internet to upload the file once. After that, our servers handle the rest." />
            <FAQItem question="Can I stream to Facebook Groups?" answer="Yes! You can stream to Profiles, Pages, and Groups." />
            <FAQItem question="Is there a free trial for paid plans?" answer="We offer a 7-day money-back guarantee on all paid plans." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 text-white mb-4">
              <Video className="w-6 h-6" />
              <span className="text-xl font-bold">GoLiveNG</span>
            </div>
            <p className="max-w-xs">The #1 Restreaming platform built for the Nigerian creator economy.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Showcase</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm">
          &copy; 2026 Quadrox Tech. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

// --- Helper Components ---

function Stat({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <div className="text-3xl font-extrabold text-blue-600 mb-1">{value}</div>
      <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors group">
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ name, price, period, desc, features, popular }: any) {
  return (
    <div className={`p-8 rounded-3xl border ${popular ? 'border-blue-600 bg-white shadow-xl relative' : 'border-slate-200 bg-white'}`}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900 mb-2">{name}</h3>
      <p className="text-slate-500 text-sm mb-6">{desc}</p>
      <div className="mb-6">
        <span className="text-4xl font-extrabold text-slate-900">{price}</span>
        {period && <span className="text-slate-500 font-medium">{period}</span>}
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-center text-slate-600">
            <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Link href="/signup" className={`w-full block text-center py-3 rounded-xl font-bold transition-all ${popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
        Choose {name}
      </Link>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  return (
    <details className="group bg-slate-50 rounded-xl">
      <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-slate-900">
        <span>{question}</span>
        <span className="transition group-open:rotate-180">
          <ChevronRight className="w-5 h-5 text-slate-400" />
        </span>
      </summary>
      <div className="text-slate-600 px-6 pb-6 animate-in slide-in-from-top-2">
        {answer}
      </div>
    </details>
  );
}
