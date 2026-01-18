"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Video, Github, Facebook, Check, X } from 'lucide-react';

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  
  const [strength, setStrength] = useState(0);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState('');

  // Strength Logic
  useEffect(() => {
    const p = formData.password;
    let score = 0;
    if (!p) { setStrength(0); return; }
    if (p.length > 7) score += 1;
    if (/[A-Z]/.test(p)) score += 1;
    if (/[0-9]/.test(p)) score += 1;
    if (/[^A-Za-z0-9]/.test(p)) score += 1;
    setStrength(score);
  }, [formData.password]);

  // Match Logic
  useEffect(() => {
    setPasswordsMatch(formData.password === formData.confirmPassword || formData.confirmPassword === '');
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (strength < 3) {
      setError('Please choose a stronger password.');
      return;
    }
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        full_name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password
      };

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        // Auto-save token and redirect
        if (data.access_token) {
           localStorage.setItem('token', data.access_token);
        }
        router.push('/dashboard'); 
      } else {
        setError(data.error || 'Registration failed');
        setLoading(false);
      }
    } catch (err) {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  // Helper for Strength Color
  const getStrengthColor = () => {
    if (strength === 0) return 'bg-slate-700';
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      {/* --- THE LOADER (Your Request) --- */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F19]/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-white font-medium tracking-wide animate-pulse">Setting up your studio...</p>
        </div>
      )}
      {/* ---------------------------------- */}

      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <Link href="/" className="mb-8 flex items-center space-x-3 group">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
          <Video className="w-5 h-5 text-white" />
        </div>
        <span className="text-2xl font-bold text-white tracking-tight">GoLiveNG</span>
      </Link>

      <div className="w-full max-w-lg bg-[#131926] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400 text-sm">Start streaming in minutes.</p>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button className="flex items-center justify-center py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
          </button>
          <button className="flex items-center justify-center py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
            <Facebook className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
          </button>
          <button className="flex items-center justify-center py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
            <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#131926] px-4 text-slate-500">Or continue with email</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
            <X className="w-4 h-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 ml-1">First Name</label>
              <input required type="text" className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none transition-all" placeholder="John" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 ml-1">Last Name</label>
              <input required type="text" className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none transition-all" placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 ml-1">Email Address</label>
            <input required type="email" className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-medium text-slate-400">Password</label>
            </div>
            <input required type="password" className="w-full bg-[#0B0F19] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-blue-500 outline-none transition-all" placeholder="••••••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mt-2">
              <div className={`h-full transition-all duration-500 ${getStrengthColor()}`} style={{ width: `${(strength / 4) * 100}%` }}></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 ml-1">Confirm Password</label>
            <div className="relative">
              <input required type="password" className={`w-full bg-[#0B0F19] border rounded-xl px-4 py-3.5 text-white focus:ring-2 outline-none transition-all ${!passwordsMatch && formData.confirmPassword ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500'}`} placeholder="••••••••••••" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
              {passwordsMatch && formData.confirmPassword && (
                <div className="absolute right-4 top-3.5 text-green-500"><Check className="w-5 h-5" /></div>
              )}
            </div>
          </div>

          <button type="submit" disabled={loading || strength < 3 || !passwordsMatch} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center disabled:opacity-50 mt-4">
            Get Started
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
