
import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  UserPlus, 
  Globe,
  Facebook,
  AlertCircle
} from 'lucide-react';
import { UserRole } from '../types';
import { Button } from './ui/Button';

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState<UserRole>('EMPLOYEE');
  const [isLoading, setIsLoading] = useState(false);

  const NEON_AUTH_URL = process.env.NEON_AUTH_URL || '';
  const REDIRECT_URL = `${window.location.origin}/auth/callback`;

  useEffect(() => {
    // Handle OAuth callback
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const code = params.get('code');
    
    if (token) {
      localStorage.setItem('betterhr_token', token);
      onLoginSuccess(token);
    }
  }, [onLoginSuccess]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Redirect to Neon Auth with Google provider
    const authUrl = new URL(`${NEON_AUTH_URL}?method=google`);
    authUrl.searchParams.append('redirect_url', REDIRECT_URL);
    authUrl.searchParams.append('role', role);
    window.location.href = authUrl.toString();
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Call Neon Auth endpoint for email/password auth
      const response = await fetch(`${NEON_AUTH_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password,
          is_register: isRegistering,
          role: isRegistering ? role : undefined 
        })
      });

      if (!response.ok) throw new Error('Auth failed');
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('betterhr_token', data.token);
        onLoginSuccess(data.token);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 safe-top safe-pb">
      <div className="w-full max-w-sm space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-3xl shadow-xl shadow-blue-200 mb-6">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">BetterHR <span className="text-blue-600">Pro</span></h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            {isRegistering ? 'Empowering your workplace journey' : 'Sign in to access your portal'}
          </p>
        </div>

        <div className="bg-slate-200/50 p-1.5 rounded-2xl flex gap-1">
          <button 
            onClick={() => setIsRegistering(false)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${!isRegistering ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsRegistering(true)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${isRegistering ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {isRegistering && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'EMPLOYEE', label: 'Employee', icon: UserPlus },
                { id: 'ADMIN', label: 'Admin', icon: Building2 }
              ].map((item) => (
                <button 
                  key={item.id}
                  type="button"
                  onClick={() => setRole(item.id as UserRole)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${role === item.id ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 bg-white'}`}
                >
                  <item.icon className={`w-5 h-5 ${role === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className={`text-[11px] font-bold ${role === item.id ? 'text-blue-900' : 'text-slate-500'}`}>{item.label}</span>
                </button>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input name="email" type="email" placeholder="Work Email" className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" required />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input name="password" type="password" placeholder="Password" className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" required />
            </div>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full py-4 text-base shadow-lg shadow-slate-900/10">
            {isRegistering ? 'Get Started' : 'Sign In'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black text-slate-400">
            <span className="bg-slate-50 px-4">Social Connect</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-12 border-slate-200/60 font-bold"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            type="button"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4 mr-2" alt="Google" />
            Google
          </Button>
          <Button variant="outline" className="h-12 border-slate-200/60 font-bold bg-[#1877F2] text-white hover:bg-[#1877F2]/90 border-none" disabled={isLoading}>
            <Facebook className="w-4 h-4 mr-2 fill-current" />
            Facebook
          </Button>
        </div>

        {isRegistering && (
          <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 border border-blue-100/50">
            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-blue-800 font-semibold leading-relaxed">
              New to BetterHR? Your company administrator will approve your access once you provide the valid company code.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
