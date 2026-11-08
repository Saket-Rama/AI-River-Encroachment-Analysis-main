import React, { useState } from 'react';
import { 
  Waves, 
  Menu, 
  X, 
  LogIn, 
  ShieldCheck, 
  LayoutDashboard, 
  Satellite, 
  Radio, 
  AlertTriangle, 
  Image as ImageIcon,
  Info
} from 'lucide-react';
import { NavigationPage } from '../types/hydrology';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenLogin: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenLogin,
  onOpenAbout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; shortLabel: string; page: NavigationPage; icon?: React.ReactNode }[] = [
    { label: 'Home', shortLabel: 'Home', page: 'home' },
    { label: 'River Encroachment Gallery', shortLabel: 'Gallery', page: 'gallery' },
    { label: 'Satellite Analysis', shortLabel: 'Satellite', page: 'satellite' },
    { label: 'Live IoT Monitoring', shortLabel: 'IoT Telemetry', page: 'sensors' },
    { label: 'Flood Risk Assessment', shortLabel: 'Flood Risk', page: 'flood-risk' },
  ];

  const handleLinkClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      {/* Main Nav Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button 
          onClick={() => onNavigate('home')}
          className="text-left focus:outline-hidden group shrink-0"
        >
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-heading font-extrabold text-base tracking-tight text-[#0f172a]">
                RIVERGUARD
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-[#eff4ff] text-[#134e4a] px-1.5 py-0.5 rounded border border-[#dce9ff]">
                AI
              </span>
            </div>
            <p className="text-[10px] text-[#64748b] leading-tight font-medium mt-1">
              River Encroachment & Flood Risk System
            </p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page)}
                className={`px-2.5 xl:px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-[#134e4a] bg-[#eff4ff] shadow-2xs font-bold'
                    : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc]'
                }`}
              >
                <span className="hidden xl:inline">{link.label}</span>
                <span className="inline xl:hidden">{link.shortLabel}</span>
              </button>
            );
          })}
          
          <button
            onClick={onOpenAbout}
            className={`px-2.5 xl:px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              currentPage === 'about'
                ? 'text-[#134e4a] bg-[#eff4ff] shadow-2xs font-bold'
                : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc]'
            }`}
          >
            About Project
          </button>
        </nav>

        {/* Actions Zone: Mission Dashboard Link & Login */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-xs font-semibold text-[#134e4a] bg-white border border-[#134e4a]/30 hover:bg-[#eff4ff] rounded transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#134e4a]" />
            <span className="hidden md:inline">Mission Control</span>
            <span className="inline md:hidden">Console</span>
          </button>

          <button
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#0f172a] hover:bg-[#1e293b] rounded transition-colors shadow-xs"
          >
            <LogIn className="w-3.5 h-3.5 text-[#89f5e7]" />
            <span>Login</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenLogin}
            className="sm:hidden px-2.5 py-1 text-xs font-bold text-white bg-[#0f172a] rounded"
          >
            Login
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#475569] hover:text-[#0f172a] hover:bg-[#f8fafc] rounded"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e2e8f0] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleLinkClick(link.page)}
              className={`w-full text-left px-3 py-2 text-xs font-medium rounded ${
                currentPage === link.page
                  ? 'bg-[#eff4ff] text-[#134e4a] font-bold'
                  : 'text-[#334155] hover:bg-[#f8fafc]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenAbout();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-medium text-[#334155] hover:bg-[#f8fafc] rounded"
          >
            About Project
          </button>
          <button
            onClick={() => {
              onNavigate('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs font-semibold text-[#134e4a] bg-[#eff4ff] rounded flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Open Hydrologic Intelligence Dashboard</span>
          </button>
        </div>
      )}
    </header>
  );
};
