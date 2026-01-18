import Link from 'next/link';
import Image from 'next/image';
import { 
  Video, CheckCircle2, Play, 
  Globe, Smartphone, ShieldCheck, Zap, 
  ChevronRight, Facebook, Youtube, Twitch 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* --- Navigation (Sticky & Solid) --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">GoLiveNG</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <Link href="#solutions" className="hover:text-emerald-600 transition-colors">Solutions</Link>
            <Link href="#how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden md:block text-sm font-bold text-slate-700 hover:text-emerald-600">
              Log In
            </Link>
            <Link href="/signup" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-all shadow-md">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section (Split Layout) --- */}
      <header className="pt-16 pb-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2 animate-pulse"></span>
              #1 Streaming Engine in Nigeria
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Stream live to <span className="text-emerald-600">Facebook & YouTube</span> simultaneously.
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              The professional cloud broadcasting tool. Eliminate the need for expensive PCs or high-speed internet. We handle the heavy lifting in the cloud.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center shadow-lg hover:shadow-emerald-200">
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="#demo" className="px-8 py-4 bg-white text-slate-700 border border-slate-300 rounded-lg font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                View Demo
              </Link>
            </div>
            
            <div className="pt-4 flex items-center space-x-6 text-sm font-medium text-slate-500">
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" /> No Credit Card</span>
              <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" /> 14-Day Free Trial</span>
            </div>
          </div>

          {/* Right: Image (Placeholder) */}
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-600/10 rounded-2xl transform rotate-3"></div>
            <img 
              src="https://placehold.co/800x600/0f172a/ffffff?text=GoLiveNG+Dashboard+Preview" 
              alt="Dashboard Preview" 
              className="relative rounded-xl shadow-2xl border border-slate-200 w-full"
            />
          </div>
        </div>
      </header>

      {/* --- Trust Bar --- */}
      <section className="border-y border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by 2,000+ Creators & Businesses</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
            {/* Logos using Text/Icons for now */}
            <div className="flex items-center space-x-2 text-xl font-bold text-slate-800"><Youtube className="text-red-600"/> <span>YouTube</span></div>
            <div className="flex items-center space-x-2 text-xl font-bold text-slate-800"><Facebook className="text-blue-600"/> <span>Facebook</span></div>
            <div className="flex items-center space-x-2 text-xl font-bold text-slate-800"><Globe className="text-emerald-600"/> <span>Restream</span></div>
            <div className="flex items-center space-x-2 text-xl font-bold text-slate-800"><Smartphone className="text-purple-600"/> <span>TikTok</span></div>
          </div>
        </div>
      </section>

      {/* --- Detailed Solutions (Zig-Zag) --- */}
      <section id="solutions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Multistreaming Made Simple</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Why limit yourself to one platform? Reach your audience everywhere. Connect your Facebook Page, YouTube Channel, and Twitch account once, and go live to all of them with a single click.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" /> No bitrate loss</li>
                <li className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" /> Unified chat (Coming Soon)</li>
                <li className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" /> Custom RTMP Destinations</li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <img src="https://placehold.co/600x400/f1f5f9/334155?text=Multistream+Interface" className="rounded-2xl shadow-lg border border-slate-100" alt="Multistream" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <img src="https://placehold.co/600x400/f1f5f9/334155?text=Cloud+Scheduler" className="rounded-2xl shadow-lg border border-slate-100" alt="Cloud Scheduler" />
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Go Live Without Being Live</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Have a pre-recorded video? Upload it to GoLiveNG and schedule it to stream automatically. It looks exactly like a live broadcast to your viewers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" /> 24/7 Looping Streams</li>
                <li className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" /> No PC required (Runs in Cloud)</li>
                <li className="flex items-center text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" /> Schedule weeks in advance</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* --- Detailed Pricing --- */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Transparent Pricing in Naira</h2>
            <p className="text-slate-600">Choose the plan that fits your streaming needs. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-slate-900">Starter</h3>
              <div className="my-4">
                <span className="text-4xl font-extrabold text-slate-900">₦0</span>
                <span className="text-slate-500">/month</span>
              </div>
              <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6">Perfect for testing the waters.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> 20 mins per stream</li>
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> 1 Destination</li>
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> GoLiveNG Watermark</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-lg text-center hover:bg-slate-200">Try Free</Link>
            </div>

            {/* Pro (Highlighted) */}
            <div className="bg-white p-8 rounded-2xl border-2 border-emerald-500 shadow-xl relative scale-105">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-xl font-bold text-slate-900">Creator</h3>
              <div className="my-4">
                <span className="text-4xl font-extrabold text-slate-900">₦8,500</span>
                <span className="text-slate-500">/month</span>
              </div>
              <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6">For serious content creators.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> 4 Hours per stream</li>
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> 3 Destinations</li>
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> <strong>No Watermark</strong></li>
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> 1080p HD Quality</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 bg-emerald-600 text-white font-bold rounded-lg text-center hover:bg-emerald-700 shadow-lg">Get Started</Link>
            </div>

            {/* Business */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-slate-900">Business</h3>
              <div className="my-4">
                <span className="text-4xl font-extrabold text-slate-900">₦25,000</span>
                <span className="text-slate-500">/month</span>
              </div>
              <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6">For agencies and 24/7 radio.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> 24/7 Continuous Stream</li>
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> Unlimited Destinations</li>
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> 4K Quality Support</li>
                <li className="flex items-center text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3" /> Priority Support</li>
              </ul>
              <Link href="/signup" className="block w-full py-3 bg-slate-900 text-white font-bold rounded-lg text-center hover:bg-slate-800">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="group border border-slate-200 rounded-lg open:bg-slate-50">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-slate-900">
                <span>Do I need OBS or high-speed internet?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 px-6 pb-6">
                No! GoLiveNG is cloud-based. You can upload a video file or connect your account, and our servers handle the streaming. You can even turn off your computer.
              </p>
            </details>
            <details className="group border border-slate-200 rounded-lg open:bg-slate-50">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-slate-900">
                <span>Can I stream to a Facebook Group?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 px-6 pb-6">
                Yes, we support Facebook Profiles, Pages, and Groups. You will need to grant permission to our app to stream to groups you admin.
              </p>
            </details>
             <details className="group border border-slate-200 rounded-lg open:bg-slate-50">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-6 text-slate-900">
                <span>Is my account safe?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 px-6 pb-6">
                100%. We use the official API for Facebook and YouTube. We never see your password, and we only ask for permission to publish videos.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* --- Footer (Standard) --- */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">GoLiveNG</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              The #1 Cloud Streaming Platform in Nigeria. Empowering creators to reach global audiences without technical barriers.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 cursor-pointer transition-colors"><Facebook className="w-5 h-5"/></div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer transition-colors"><Youtube className="w-5 h-5"/></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="hover:text-emerald-500">Pricing</Link></li>
              <li><Link href="#" className="hover:text-emerald-500">Features</Link></li>
              <li><Link href="#" className="hover:text-emerald-500">Supported Apps</Link></li>
              <li><Link href="#" className="hover:text-emerald-500">Server Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="hover:text-emerald-500">About Us</Link></li>
              <li><Link href="#" className="hover:text-emerald-500">Contact</Link></li>
              <li><Link href="#" className="hover:text-emerald-500">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-emerald-500">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-12 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; 2026 Quadrox Tech. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
