import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  ShieldCheck, 
  KeyRound, 
  UserCheck, 
  AlertCircle,
  Lock
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (username: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [role, setRole] = useState<'officer' | 'engineer' | 'researcher'>('officer');
  const [email, setEmail] = useState('officer.dispatch@riverguard.gov');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccessLogin(role === 'officer' ? 'Civil Dispatch Officer' : 'Hydrology Engineer');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/70 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-[#e2e8f0] max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-[#134e4a] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-[#89f5e7]" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">
            RIVERGUARD AI Portal Authentication
          </h3>
          <p className="text-xs text-[#b5ede7] mt-0.5">
            Authorized Municipal Environmental & Hydrologic Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded text-xs text-[#475569] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0d9488] shrink-0" />
            <span>Select an authorized role to simulate mission-control privileges:</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#0f172a] block mb-1.5">
              Select Operating Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setRole('officer');
                  setEmail('officer.dispatch@riverguard.gov');
                }}
                className={`p-2 text-xs font-medium rounded border text-center transition-colors ${
                  role === 'officer'
                    ? 'bg-[#134e4a] text-white border-[#134e4a]'
                    : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc]'
                }`}
              >
                Civil Officer
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('engineer');
                  setEmail('iot.engineer@riverguard.gov');
                }}
                className={`p-2 text-xs font-medium rounded border text-center transition-colors ${
                  role === 'engineer'
                    ? 'bg-[#134e4a] text-white border-[#134e4a]'
                    : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc]'
                }`}
              >
                IoT Engineer
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('researcher');
                  setEmail('unet.researcher@riverguard.gov');
                }}
                className={`p-2 text-xs font-medium rounded border text-center transition-colors ${
                  role === 'researcher'
                    ? 'bg-[#134e4a] text-white border-[#134e4a]'
                    : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc]'
                }`}
              >
                AI Researcher
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#0f172a] block mb-1">
              Government / Agency Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#e2e8f0] rounded text-[#0f172a] focus:outline-hidden focus:border-[#134e4a]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#0f172a] block mb-1">
              Security Token / Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-[#e2e8f0] rounded text-[#0f172a] focus:outline-hidden focus:border-[#134e4a]"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#134e4a] hover:bg-[#115e59] text-white text-xs font-bold rounded shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-[#89f5e7]" />
                  <span>Authenticate Session</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
