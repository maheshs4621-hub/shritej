import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onOpenAdminPortal?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenAdminPortal,
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const googleUser: UserProfile = {
        id: 'user-google-' + Date.now(),
        name: 'Mahesh Swami',
        email: 'mahesh.s.4621@gmail.com',
        provider: 'google',
        isAdmin: true,
      };
      onLoginSuccess(googleUser);
      onClose();
    }, 600);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide a valid email address');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase() === 'mahesh.s.4621@gmail.com';
      const user: UserProfile = {
        id: 'user-' + Date.now(),
        name: name || (isAdmin ? 'Admin Mahesh' : email.split('@')[0]),
        email,
        phone: phone || '+91 80802 18728',
        provider: 'email',
        isAdmin,
      };
      onLoginSuccess(user);
      onClose();
    }, 500);
  };

  const handleQuickPatron = () => {
    const user: UserProfile = {
      id: 'user-patron-1',
      name: 'Mahesh Swami',
      email: 'mahesh.s.4621@gmail.com',
      phone: '+91 80802 18728',
      provider: 'google',
      isAdmin: true,
    };
    onLoginSuccess(user);
    onClose();
  };

  const handleQuickAdmin = () => {
    const user: UserProfile = {
      id: 'admin-1',
      name: 'Super Admin',
      email: 'admin@shritejayurveda.com',
      provider: 'email',
      isAdmin: true,
    };
    onLoginSuccess(user);
    onClose();
    if (onOpenAdminPortal) onOpenAdminPortal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#FAF7F2] border border-[#DECDB3] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EFE6D6] text-[#695A48] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#2D3E2F] text-white flex items-center justify-center mx-auto shadow-md">
            <User className="w-6 h-6 text-[#E8DFD0]" />
          </div>
          <h2 className="font-brand text-2xl font-bold tracking-wide text-[#222E22]">
            {tab === 'signin' ? 'Welcome Back' : 'Create Sacred Account'}
          </h2>
          <p className="font-editorial text-xs text-[#6A5947]">
            Join the SHRiTEJ Ayurvedic patron sanctuary
          </p>
        </div>

        {/* Auth Tabs */}
        <div className="flex rounded-2xl bg-[#EFE6D6] p-1 mb-5 font-ui text-xs uppercase tracking-wider font-bold">
          <button
            type="button"
            onClick={() => { setTab('signin'); setError(''); }}
            className={
              'flex-1 py-2 rounded-xl transition-all ' +
              (tab === 'signin' ? 'bg-[#2D3E2F] text-white shadow-sm' : 'text-[#554636] hover:text-[#222E22]')
            }
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('signup'); setError(''); }}
            className={
              'flex-1 py-2 rounded-xl transition-all ' +
              (tab === 'signup' ? 'bg-[#2D3E2F] text-white shadow-sm' : 'text-[#554636] hover:text-[#222E22]')
            }
          >
            Register
          </button>
        </div>

        {/* Google Authentication Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-neutral-50 border border-[#D5C2A4] text-xs font-ui font-semibold text-[#332A21] flex items-center justify-center gap-3 transition-all shadow-sm mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-[#DECDB3]"></div>
          <span className="font-ui text-[10px] uppercase tracking-wider text-[#8A7966]">or with email</span>
          <div className="flex-1 h-px bg-[#DECDB3]"></div>
        </div>

        {error && (
          <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-xl mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-3.5 font-ui text-xs">
          {tab === 'signup' && (
            <div>
              <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">Full Name *</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mahesh Swami"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">Email Address *</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. mahesh@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
            />
          </div>

          {tab === 'signup' && (
            <div>
              <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 80802 18728"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">Password *</label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6B5B] hover:text-[#222E22]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2"
          >
            {tab === 'signin' ? 'Sign In to Account' : 'Create Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="pt-4 mt-4 border-t border-[#DECDB3] space-y-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleQuickPatron}
              className="flex-1 py-2 px-2.5 rounded-xl bg-[#EFE6D6] hover:bg-[#E5D8C3] text-[#7D5A34] font-ui text-[10px] font-bold uppercase tracking-wider transition-colors text-center border border-[#DECDB3]"
            >
              ⚡ Patron 1-Click
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="flex-1 py-2 px-2.5 rounded-xl bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-[10px] font-bold uppercase tracking-wider transition-colors text-center"
            >
              🛡️ Admin Console
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};