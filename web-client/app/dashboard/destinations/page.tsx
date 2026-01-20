"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Trash2, Facebook, Youtube, Twitch, Cast, 
  Loader2, CheckCircle, AlertCircle, Eye 
} from 'lucide-react';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // 1. Load Connected Accounts
  useEffect(() => {
    const fetchDests = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/destinations', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setDestinations(data);
        }
      } catch (e) {
        console.error("Failed to load destinations");
      } finally {
        setLoading(false);
      }
    };
    fetchDests();
  }, []);

  // 2. Delete Handler
  const handleDelete = async (id: string) => {
    if (!confirm('Disconnect this account? This will stop all scheduled streams to this target.')) return;
    
    const token = localStorage.getItem('token');
    await fetch(`/api/destinations?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setDestinations(destinations.filter(d => d.id !== id));
  };

  // 3. Test Pages Handler (New Feature)
  const handleCheckPages = async () => {
    const token = localStorage.getItem('token');
    try {
      alert("Fetching your pages from Facebook... This may take a few seconds.");
      const res = await fetch('/api/destinations/facebook/pages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.pages) {
        const pageNames = data.pages.map((p: any) => `• ${p.name} (${p.category})`).join('\n');
        alert(`SUCCESS! Found ${data.pages.length} Pages:\n\n${pageNames}\n\n• Your Profile (${data.profile.name})`);
      } else {
        alert("Error: " + (data.error || "Could not fetch pages."));
      }
    } catch (e) {
      alert("Connection failed. Please check your internet.");
    }
  };

  // Helper to get Icon
  const getIcon = (platform: string) => {
    switch (platform) {
        case 'facebook': return <Facebook className="w-6 h-6 text-white" />;
        case 'youtube': return <Youtube className="w-6 h-6 text-white" />;
        case 'twitch': return <Twitch className="w-6 h-6 text-white" />;
        default: return <Cast className="w-6 h-6 text-white" />;
    }
  }

  // Helper to get Color
  const getColor = (platform: string) => {
    switch (platform) {
        case 'facebook': return 'bg-blue-600';
        case 'youtube': return 'bg-red-600';
        case 'twitch': return 'bg-purple-600';
        default: return 'bg-slate-800';
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Destinations</h1>
        <p className="text-slate-500">Manage where your broadcasts are sent.</p>
      </div>

      {/* Success/Error Messages */}
      {searchParams.get('success') && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-bold">Account connected successfully!</span>
        </div>
      )}
      {searchParams.get('error') && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="font-bold">Connection failed. Please try again.</span>
        </div>
      )}

      {/* 1. Add New Section */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-6">Connect New Platform</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ConnectCard platform="Facebook" icon={<Facebook className="text-white" />} color="bg-blue-600" />
          <ConnectCard platform="YouTube" icon={<Youtube className="text-white" />} color="bg-red-600" />
          <ConnectCard platform="Twitch" icon={<Twitch className="text-white" />} color="bg-purple-600" />
          <ConnectCard platform="Custom RTMP" icon={<Cast className="text-white" />} color="bg-slate-800" />
        </div>
      </section>

      {/* 2. Connected List */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 mb-6">Active Connections</h2>
        
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>
        ) : destinations.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-400">
            No accounts connected yet. Select a platform above.
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
            {destinations.map((dest) => (
              <div key={dest.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50 transition-colors gap-4">
                
                {/* Left: Icon & Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${getColor(dest.platform)}`}>
                    {getIcon(dest.platform)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{dest.nickname}</h3>
                    
                    {/* Display Logic: Key vs OAuth */}
                    {dest.streamKey ? (
                        <p className="text-xs text-slate-500 font-mono mt-1 bg-slate-100 px-2 py-0.5 rounded inline-block">
                          Key: {dest.streamKey.substring(0, 4)}••••••••••••
                        </p>
                    ) : (
                        <div className="flex items-center mt-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                            <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                                Connected via OAuth
                            </p>
                        </div>
                    )}
                  </div>
                </div>
                
                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                   
                   {/* Special Test Button for Facebook */}
                   {dest.platform === 'facebook' && (
                     <button 
                       onClick={handleCheckPages}
                       className="flex items-center px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors"
                     >
                       <Eye className="w-3 h-3 mr-2" /> View Pages
                     </button>
                   )}

                   <div className="h-4 w-px bg-slate-200 mx-2 hidden md:block"></div>

                   <button 
                     onClick={() => handleDelete(dest.id)}
                     className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                     title="Disconnect Account"
                   >
                     <Trash2 className="w-5 h-5" />
                   </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

function ConnectCard({ platform, icon, color }: any) {
  return (
    <Link 
      href={`/dashboard/destinations/add?platform=${platform}`}
      className="group bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:ring-1 hover:ring-emerald-500 transition-all text-left shadow-sm flex items-center gap-4"
    >
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-900">{platform}</h3>
        <span className="text-xs text-emerald-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Connect +</span>
      </div>
    </Link>
  );
}
