
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';
import { UserRole } from '../types.ts';
import { Button } from './ui/Button.tsx';

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockNewUserJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ldy51c2VyQGJldHRlcmhyLnBybyIsImlzTmV3Ijp0cnVlfQ';
      onLoginSuccess(mockNewUserJwt);
    }, 1000);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('mock_jwt_token_android_v4');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 safe-top safe-pb relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl"></div>

      <div className="w-full max-w-sm space-y-10 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-[2.5rem] shadow-2xl mb-8 border-4 border-white">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2">
            BetterHR <span className="text-blue-600">Pro</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em]">
            {isRegistering ? 'Join the movement' : 'Empowering Workplace'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600" />
              <input type="email" placeholder="Work Email" className="w-full bg-white border border-slate-200 rounded-[1.5rem] py-5 pl-14 pr-6 text-sm font-bold focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all shadow-sm" required />
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600" />
              <input type="password" placeholder="Password" className="w-full bg-white border border-slate-200 rounded-[1.5rem] py-5 pl-14 pr-6 text-sm font-bold focus:outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all shadow-sm" required />
            </div>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full py-5 text-base font-black rounded-[2rem] bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200">
            {isRegistering ? 'Create Account' : 'Sign In Now'}
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </form>

        <div className="grid grid-cols-1 gap-4">
          <Button 
            variant="outline" 
            className="h-14 border-slate-200 rounded-3xl font-black text-xs uppercase tracking-widest bg-white hover:bg-slate-50"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5 mr-3" alt="Google" />
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};
