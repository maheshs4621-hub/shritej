import { RegisteredPatron, UserProfile } from '../types';

const STORAGE_KEY = 'shritej_registered_patrons';

const SEED_PATRONS: RegisteredPatron[] = [
  {
    id: 'patron-demo-01',
    name: 'Ayurvedic Patron',
    email: 'patron@shritejayurveda.com',
    phone: '9876543210',
    password: 'ayurveda123',
    createdAt: '2026-01-01T00:00:00.000Z',
    isAdmin: false,
  },
  {
    id: 'patron-admin-01',
    name: 'SHRiTEJ Administrator',
    email: 'admin@shritejayurveda.com',
    phone: '9876500000',
    password: 'adminayurveda',
    createdAt: '2026-01-01T00:00:00.000Z',
    isAdmin: true,
  },
];

export function getRegisteredPatrons(): RegisteredPatron[] {
  if (typeof window === 'undefined') return SEED_PATRONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PATRONS));
      return SEED_PATRONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PATRONS));
    return SEED_PATRONS;
  } catch (e) {
    return SEED_PATRONS;
  }
}

export function saveRegisteredPatrons(patrons: RegisteredPatron[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patrons));
  } catch (e) {}
}

export function registerNewPatron(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): { success: boolean; patron?: RegisteredPatron; error?: string } {
  const patrons = getRegisteredPatrons();
  const cleanEmail = data.email.trim().toLowerCase();
  const cleanPhone = data.phone.replace(/\D/g, '').slice(-10);

  if (patrons.some((p) => p.email.toLowerCase() === cleanEmail)) {
    return {
      success: false,
      error: 'An account with this email address already exists. Please sign in with your password or Mobile OTP.',
    };
  }

  if (cleanPhone.length === 10 && patrons.some((p) => p.phone.replace(/\D/g, '').slice(-10) === cleanPhone)) {
    return {
      success: false,
      error: 'An account with this mobile number already exists. Please sign in with your password or Mobile OTP.',
    };
  }

  const newPatron: RegisteredPatron = {
    id: 'patron-' + Date.now(),
    name: data.name.trim(),
    email: cleanEmail,
    phone: cleanPhone,
    password: data.password,
    createdAt: new Date().toISOString(),
    isAdmin: cleanEmail.includes('admin'),
  };

  patrons.push(newPatron);
  saveRegisteredPatrons(patrons);

  return { success: true, patron: newPatron };
}

export function verifyPatronCredentials(
  identifier: string,
  passwordInput: string
): { success: boolean; patron?: RegisteredPatron; error?: string } {
  const patrons = getRegisteredPatrons();
  const cleanId = identifier.trim().toLowerCase();
  const cleanDigits = identifier.replace(/\D/g, '').slice(-10);

  const matched = patrons.find((p) => {
    const pEmail = p.email.toLowerCase();
    const pPhone = p.phone.replace(/\D/g, '').slice(-10);
    return pEmail === cleanId || (cleanDigits.length >= 10 && pPhone === cleanDigits);
  });

  if (!matched) {
    return {
      success: false,
      error: 'No account found with this email or mobile number. Please check your credentials or Register a new account.',
    };
  }

  if (matched.password !== passwordInput) {
    return {
      success: false,
      error: 'Incorrect password! Please use the password you created when registering, or sign in via Mobile Number & OTP.',
    };
  }

  return { success: true, patron: matched };
}

export function findPatronByPhone(phoneInput: string): RegisteredPatron | undefined {
  const patrons = getRegisteredPatrons();
  const cleanDigits = phoneInput.replace(/\D/g, '').slice(-10);
  if (!cleanDigits) return undefined;
  return patrons.find((p) => p.phone.replace(/\D/g, '').slice(-10) === cleanDigits);
}

export function createOrGetPatronByPhone(phoneInput: string, name?: string): RegisteredPatron {
  const patrons = getRegisteredPatrons();
  const cleanDigits = phoneInput.replace(/\D/g, '').slice(-10);

  const existing = patrons.find((p) => p.phone.replace(/\D/g, '').slice(-10) === cleanDigits);
  if (existing) return existing;

  const newPatron: RegisteredPatron = {
    id: 'patron-otp-' + Date.now(),
    name: name?.trim() || `Patron ${cleanDigits.slice(-4)}`,
    email: `patron${cleanDigits}@shritejayurveda.com`,
    phone: cleanDigits,
    password: 'otp_verified_' + Date.now(),
    createdAt: new Date().toISOString(),
    isAdmin: false,
  };

  patrons.push(newPatron);
  saveRegisteredPatrons(patrons);
  return newPatron;
}

export function patronToUserProfile(patron: RegisteredPatron, provider: 'email' | 'phone' | 'google' = 'email'): UserProfile {
  return {
    id: patron.id,
    name: patron.name,
    email: patron.email,
    phone: patron.phone ? `+91 ${patron.phone}` : undefined,
    provider,
    isAdmin: patron.isAdmin,
  };
}
