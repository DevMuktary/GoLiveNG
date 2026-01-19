"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutGrid, Radio, Calendar, Settings, 
  LogOut, Video, Menu, X, Globe 
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [user, setUser] = useState<{name: string} | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // 1. Protect Route: Check for token
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null; // Or a loading spinner

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* --- Sidebar --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0`}>
        
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-3">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">GoLiveNG</span>
        </div>

        <nav className="p-4 space-y-1">
          <NavItem href="/dashboard" icon={<LayoutGrid />} label="Studio" active />
          <NavItem href="/dashboard/destinations" icon={<Globe />} label="Destinations" />
          <NavItem href="/dashboard/schedule" icon={<Calendar />} label="Schedule" />
          <NavItem href="/dashboard/settings" icon={<Settings />} label="Settings" />
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
          <div className="flex items-center mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-slate-700 truncate w-32">{user.name}</p>
              <p className="text-xs text-slate-400">Pro Plan</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-2 py-2 text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" /> Sign Out
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 lg:hidden justify-between">
          <div className="flex items-center">
             <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-2">
              <Video className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">GoLiveNG</span>
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-50"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active }: any) {
  return (
    <Link 
      href={href} 
      className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active 
          ? 'bg-emerald-50 text-emerald-700' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <span className={`mr-3 ${active ? 'text-emerald-600' : 'text-slate-400'}`}>
        {icon}
      </span>
      {label}
    </Link>
  );
}
