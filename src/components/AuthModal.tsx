import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, ShieldCheck, ArrowRight, CheckCircle2, KeyRound, Sparkles, RefreshCw, UserPlus } from 'lucide-react';
import { UserProfile } from '../types';
import {
  registerNewPatron,
  verifyPatronCredentials,
  patronToUserProfile,
  findPatronByPhone,
  findPatronByIdentifier
} from '../utils/patronAuth';

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
  const [signinMode, setSigninMode] = useState<'password' | 'otp'>('password');

  // Registration Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sign In Password Fields
  const [identifier, setIdentifier] = useState(''); // Email or Phone
  const [loginPassword, setLoginPassword] = useState('');

  // Mobile OTP Fields
  const [otpPhone, setOtpPhone] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [activeOtp, setActiveOtp] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpNotification, setOtpNotification] = useState<string | null>(null);

  // Status & Validation
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [needsRegistrationPrompt, setNeedsRegistrationPrompt] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setInterval(() => {
      setOtpCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  if (!isOpen) return null;

  const resetMessages = () => {
    setError('');
    setSuccessMsg('');
    setNeedsRegistrationPrompt(false);
  };

  const handleGoToRegister = () => {
    resetMessages();
    setTab('signup');
    // If they typed a phone or email during sign in attempt, prefill it!
    if (signinMode === 'otp' && otpPhone) {
      setPhone(otpPhone);
    } else if (identifier) {
      if (identifier.includes('@')) {
        setEmail(identifier);
      } else if (/^\d{10}$/.test(identifier.replace(/\D/g, ''))) {
        setPhone(identifier.replace(/\D/g, ''));
      }
    }
  };

  // 1. Password-based Sign In Handler
  const handlePasswordSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!identifier.trim()) {
      setError('Please enter your registered email address or mobile number.');
      return;
    }
    if (!loginPassword) {
      setError('Please enter your account password.');
      return;
    }

    // Strict Check: Must already be registered!
    const existing = findPatronByIdentifier(identifier);
    if (!existing) {
      setError(`Account "${identifier}" is not registered yet. First-time patrons must Register first before signing in.`);
      setNeedsRegistrationPrompt(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const res = verifyPatronCredentials(identifier, loginPassword);
      if (!res.success || !res.patron) {
        setError(res.error || 'Invalid credentials.');
        return;
      }

      const user = patronToUserProfile(res.patron, 'email');
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  // 2. Mobile OTP - Send OTP Handler (STRICT: ONLY IF ALREADY REGISTERED)
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    const clean = otpPhone.replace(/\D/g, '').slice(-10);
    if (clean.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    // Strict Check: Only already registered numbers can receive sign-in OTP!
    const registeredPatron = findPatronByPhone(clean);
    if (!registeredPatron) {
      setError(`Mobile number +91 ${clean} is not registered yet. First-time patrons must Register first before signing in.`);
      setNeedsRegistrationPrompt(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Generate authentic 6-digit OTP code for the registered patron
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setActiveOtp(generatedCode);
      setOtpSent(true);
      setOtpCountdown(30);
      setInputOtp('');

      const notificationText = `🔔 SMS OTP Sent to +91 ${clean}: Your Sacred Login Code is [${generatedCode}] (Valid for 5 mins)`;
      setOtpNotification(notificationText);
      setSuccessMsg(`OTP sent to registered mobile +91 ${clean}! Enter code below.`);
    }, 500);
  };

  // 3. Mobile OTP - Verify OTP Handler
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    const cleanInput = inputOtp.trim();
    if (!cleanInput || cleanInput.length !== 6) {
      setError('Please enter the full 6-digit OTP received on your mobile.');
      return;
    }

    if (cleanInput !== activeOtp) {
      setError('Incorrect OTP code! Please enter the valid 6-digit code received on your phone.');
      return;
    }

    const cleanPhone = otpPhone.replace(/\D/g, '').slice(-10);
    const registeredPatron = findPatronByPhone(cleanPhone);
    if (!registeredPatron) {
      setError('Account not found. First-time patrons must Register first.');
      setNeedsRegistrationPrompt(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = patronToUserProfile(registeredPatron, 'phone');
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  // 4. Registration / Sign Up Handler
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const res = registerNewPatron({
        name: name.trim(),
        email: cleanEmail,
        phone: cleanPhone,
        password: password,
      });

      if (!res.success || !res.patron) {
        setError(res.error || 'Failed to register account.');
        return;
      }

      const user = patronToUserProfile(res.patron, 'email');
      onLoginSuccess(user);
      onClose();
    }, 500);
  };

  // 5. Google Sign-In Fallback
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const enteredName = name.trim();
      const enteredEmail = email.trim();
      const googleUser: UserProfile = {
        id: 'user-google-' + Date.now(),
        name: enteredName || (enteredEmail ? enteredEmail.split('@')[0] : 'Patron Member'),
        email: enteredEmail || 'patron@gmail.com',
        phone: phone.trim() ? `+91 ${phone.replace(/\D/g, '').slice(-10)}` : undefined,
        provider: 'google',
        isAdmin: enteredEmail.toLowerCase().includes('admin'),
      };
      onLoginSuccess(googleUser);
      onClose();
    }, 600);
  };

  // Demo Shortcuts
  const handleQuickPatron = () => {
    const user: UserProfile = {
      id: 'patron-demo-01',
      name: 'Ayurvedic Patron',
      email: 'patron@shritejayurveda.com',
      phone: '+91 98765 43210',
      provider: 'email',
      isAdmin: false,
    };
    onLoginSuccess(user);
    onClose();
  };

  const handleQuickAdmin = () => {
    const user: UserProfile = {
      id: 'patron-admin-01',
      name: 'SHRITEJ Administrator',
      email: 'admin@shritejayurveda.com',
      phone: '+91 98765 00000',
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
            {tab === 'signin'
              ? 'Sign in to your registered patron account'
              : 'First-time patrons: Register once with your password'}
          </p>
        </div>

        {/* Auth Mode Tabs (Sign In / Register) */}
        <div className="flex rounded-2xl bg-[#EFE6D6] p-1 mb-5 font-ui text-xs uppercase tracking-wider font-bold">
          <button
            type="button"
            onClick={() => { setTab('signin'); resetMessages(); }}
            className={
              'flex-1 py-2 rounded-xl transition-all ' +
              (tab === 'signin' ? 'bg-[#2D3E2F] text-white shadow-sm' : 'text-[#554636] hover:text-[#222E22]')
            }
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setTab('signup'); resetMessages(); }}
            className={
              'flex-1 py-2 rounded-xl transition-all ' +
              (tab === 'signup' ? 'bg-[#2D3E2F] text-white shadow-sm' : 'text-[#554636] hover:text-[#222E22]')
            }
          >
            Register First
          </button>
        </div>

        {/* OTP Notification Toast Banner */}
        {otpNotification && (
          <div className="mb-4 p-3 bg-[#EAF2E8] border border-[#B9D8B5] text-[#224424] rounded-2xl font-ui text-xs shadow-sm flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
            <Sparkles className="w-4 h-4 text-[#2D3E2F] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold block text-[11px] uppercase tracking-wider text-[#2D3E2F]">Simulated SMS Dispatch</span>
              <p className="font-mono text-xs font-semibold text-[#1B361C] mt-0.5">{otpNotification}</p>
            </div>
          </div>
        )}

        {/* Error / Success Alerts */}
        {error && (
          <div className="space-y-2 mb-3">
            <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-center font-ui font-medium">
              {error}
            </p>
            {needsRegistrationPrompt && (
              <button
                type="button"
                onClick={handleGoToRegister}
                className="w-full py-2.5 px-4 rounded-xl bg-[#7D5A34] hover:bg-[#684928] text-white font-ui text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register Account Now</span>
              </button>
            )}
          </div>
        )}
        {successMsg && !otpNotification && (
          <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl mb-3 text-center font-ui font-medium">
            {successMsg}
          </p>
        )}

        {/* =========================================
            SIGN IN SECTION (ONLY FOR REGISTERED PATRONS)
           ========================================= */}
        {tab === 'signin' ? (
          <div>
            {/* Sub-toggle: Password vs Mobile OTP */}
            <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-[#F3EADB] rounded-xl font-ui text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => { setSigninMode('password'); resetMessages(); }}
                className={
                  'py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ' +
                  (signinMode === 'password'
                    ? 'bg-[#FAF7F2] text-[#222E22] shadow-sm font-bold border border-[#DECDB3]'
                    : 'text-[#6A5A48] hover:text-[#222E22]')
                }
              >
                <KeyRound className="w-3.5 h-3.5 text-[#7D5A34]" />
                <span>Password</span>
              </button>
              <button
                type="button"
                onClick={() => { setSigninMode('otp'); resetMessages(); }}
                className={
                  'py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ' +
                  (signinMode === 'otp'
                    ? 'bg-[#FAF7F2] text-[#222E22] shadow-sm font-bold border border-[#DECDB3]'
                    : 'text-[#6A5A48] hover:text-[#222E22]')
                }
              >
                <Phone className="w-3.5 h-3.5 text-[#2D3E2F]" />
                <span>Mobile OTP</span>
              </button>
            </div>

            {/* A. Sign In with Password */}
            {signinMode === 'password' ? (
              <form onSubmit={handlePasswordSignIn} className="space-y-3.5 font-ui text-xs">
                <div>
                  <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                    Registered Email or Mobile Number *
                  </label>
                  <input
                    required
                    type="text"
                    value={identifier}
                    onChange={(e) => { setIdentifier(e.target.value); resetMessages(); }}
                    placeholder="e.g. patron@gmail.com or 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-[#453A2E] uppercase tracking-wider text-[10px]">
                      Account Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => { setSigninMode('otp'); resetMessages(); }}
                      className="text-[10px] text-[#7D5A34] hover:underline font-semibold"
                    >
                      Forgot? Use OTP
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => { setLoginPassword(e.target.value); resetMessages(); }}
                      placeholder="Enter registered password"
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
                  className="w-full py-3.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? 'Verifying Credentials...' : 'Sign In to Account'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[11px] text-[#695A48] pt-1">
                  First time visiting SHRITEJ?{' '}
                  <button
                    type="button"
                    onClick={handleGoToRegister}
                    className="font-bold text-[#7D5A34] hover:underline"
                  >
                    Register your account first
                  </button>
                </p>
              </form>
            ) : (
              /* B. Sign In with Mobile Number & OTP */
              <div>
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-3.5 font-ui text-xs">
                    <div>
                      <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                        Registered 10-Digit Mobile Number *
                      </label>
                      <div className="flex gap-2">
                        <span className="px-3 py-2.5 bg-[#EAE0D0] border border-[#DECDB3] rounded-xl font-bold text-xs text-[#4E3922] flex items-center">
                          +91
                        </span>
                        <input
                          required
                          type="tel"
                          maxLength={10}
                          value={otpPhone}
                          onChange={(e) => {
                            setOtpPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                            resetMessages();
                          }}
                          placeholder="98765 43210"
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none font-mono"
                        />
                      </div>
                      <p className="text-[10px] text-[#7A6B5B] mt-1">
                        Must be previously registered. We will send a 6-digit code to verify your identity.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? 'Checking Registration...' : 'Send Sacred OTP Code'}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-center text-[11px] text-[#695A48] pt-1">
                      Not registered yet?{' '}
                      <button
                        type="button"
                        onClick={handleGoToRegister}
                        className="font-bold text-[#7D5A34] hover:underline"
                      >
                        Register your account first
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3.5 font-ui text-xs">
                    <div className="p-3 bg-[#F2E8D7] rounded-xl border border-[#DECDB3] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#7D5A34] block">Registered mobile:</span>
                        <span className="font-mono text-xs font-bold text-[#222E22]">+91 {otpPhone}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setOtpSent(false); setActiveOtp(null); setOtpNotification(null); }}
                        className="text-[11px] text-[#7D5A34] hover:underline font-semibold"
                      >
                        Change
                      </button>
                    </div>

                    <div>
                      <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                        Enter 6-Digit OTP Code *
                      </label>
                      <input
                        required
                        type="text"
                        maxLength={6}
                        autoFocus
                        value={inputOtp}
                        onChange={(e) => setInputOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-center text-lg font-mono tracking-[0.5em] text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#695A48]">
                      <span>Didn&apos;t receive code?</span>
                      {otpCountdown > 0 ? (
                        <span className="text-[#8E6E45] font-semibold">Resend in {otpCountdown}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-[#2D3E2F] font-bold hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Resend OTP
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? 'Verifying OTP...' : 'Verify & Sign In'}
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        ) : (
          /* =========================================
              REGISTER FIRST SECTION (Mandatory for First-Comers)
             ========================================= */
          <form onSubmit={handleSignUp} className="space-y-3 font-ui text-xs">
            <div className="p-3 bg-[#EFE6D6] rounded-2xl border border-[#D5C2A4] mb-1">
              <span className="font-ui text-[10px] uppercase font-bold text-[#7D5A34] tracking-wider block">
                Patron Registration
              </span>
              <p className="text-[11px] text-[#554636] mt-0.5">
                First-time patrons must register once with their name, mobile, and password.
              </p>
            </div>

            <div>
              <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                Full Name *
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                Mobile Number (For OTP & Deliveries) *
              </label>
              <div className="flex gap-2">
                <span className="px-3 py-2.5 bg-[#EAE0D0] border border-[#DECDB3] rounded-xl font-bold text-xs text-[#4E3922] flex items-center">
                  +91
                </span>
                <input
                  required
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98765 43210"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                Email Address *
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                Create Password (Min 6 Characters) *
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create your sacred password"
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

            <div>
              <label className="block font-bold text-[#453A2E] mb-1 uppercase tracking-wider text-[10px]">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4EDE2] border border-[#DECDB3] text-sm text-[#222E22] focus:border-[#7D5A34] focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6B5B] hover:text-[#222E22]"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-[#2D3E2F] hover:bg-[#202E22] text-white font-ui text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Complete Sacred Registration'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[11px] text-[#695A48] pt-1">
              Already registered?{' '}
              <button
                type="button"
                onClick={() => { setTab('signin'); resetMessages(); }}
                className="font-bold text-[#7D5A34] hover:underline"
              >
                Sign in here
              </button>
            </p>
          </form>
        )}

        {/* Google Authentication Alternative */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-[#DECDB3]"></div>
          <span className="font-ui text-[10px] uppercase tracking-wider text-[#8A7966]">or continue with</span>
          <div className="flex-1 h-px bg-[#DECDB3]"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-neutral-50 border border-[#D5C2A4] text-xs font-ui font-semibold text-[#332A21] flex items-center justify-center gap-3 transition-all shadow-sm"
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

        {/* Demo Fast Login Shortcuts */}
        <div className="pt-3 mt-4 border-t border-[#DECDB3] space-y-2">
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
