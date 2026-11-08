import React from 'react';
import { 
  Activity, 
  Satellite, 
  Radio, 
  Waves, 
  AlertTriangle, 
  ShieldAlert,
  ChevronRight,
  Database,
  ExternalLink
} from 'lucide-react';
import { NavigationPage } from '../types/hydrology';

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  criticalCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, criticalCount }) => {
  const navItems = [
    {
      id: 'home' as NavigationPage,
      label: 'Public Homepage',
      sublabel: 'Overview & Encroachment Gallery',
      icon: Waves
    },
    {
      id: 'dashboard' as NavigationPage,
      label: 'Hydrologic Intelligence',
      sublabel: 'Executive Overview & Alerts',
      icon: Activity
    },
    {
      id: 'satellite' as NavigationPage,
      label: 'Satellite Image Analysis',
      sublabel: 'U-Net Hydro Segmentation',
      icon: Satellite
    },
    {
      id: 'sensors' as NavigationPage,
      label: 'Live Sensor Monitoring',
      sublabel: 'ESP32 & Real-Time Gauges',
      icon: Radio
    },
    {
      id: 'river' as NavigationPage,
      label: 'River Monitoring',
      sublabel: 'Reach Profiles & Discharge',
      icon: Waves
    },
    {
      id: 'flood-risk' as NavigationPage,
      label: 'Flood Risk Assessment',
      sublabel: 'Inundation Hazard Models',
      icon: AlertTriangle,
      badge: criticalCount > 0 ? `${criticalCount} Active` : undefined
    }
  ];

  return (
    <aside className="w-72 bg-white border-r border-[#e2e8f0] flex flex-col shrink-0 select-none h-screen sticky top-0 shadow-sm z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#e2e8f0]">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-bold text-base tracking-tight text-[#0f172a]">RIVERGUARD</span>
            <span className="text-[10px] uppercase font-bold tracking-wider bg-[#eff4ff] text-[#134e4a] px-1.5 py-0.5 rounded">AI</span>
          </div>
          <p className="text-[11px] text-[#64748b] leading-tight mt-0.5">Hydrologic Intelligence System</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
          Operational Mission Screens
        </div>
        
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded transition-all text-left group relative ${
                isActive 
                  ? 'bg-[#134e4a] text-white font-medium shadow-sm' 
                  : 'text-[#334155] hover:bg-[#f8fafc] hover:text-[#0f172a]'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                isActive ? 'text-[#89f5e7]' : 'text-[#64748b] group-hover:text-[#0f172a]'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-xs truncate font-medium">
                  {item.label}
                </div>
                <div className={`text-[10px] truncate ${isActive ? 'text-[#b5ede7]' : 'text-[#94a3b8]'}`}>
                  {item.sublabel}
                </div>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isActive ? 'bg-[#ef4444] text-white' : 'bg-[#fef2f2] text-[#b91c1c]'
                }`}>
                  {item.badge}
                </span>
              )}
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 text-[#89f5e7] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Hardware & Model Status Footnote */}
      <div className="p-3.5 mx-3 mb-3 bg-[#f8fafc] rounded border border-[#e2e8f0] text-[11px] text-[#475569] space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[#0f172a] text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
            Simulation Status
          </span>
          <span className="text-[10px] font-mono px-1 bg-[#fffbeb] text-[#b45309] rounded border border-[#fde68a]">
            DEMO DATA
          </span>
        </div>
        <p className="text-[10px] text-[#64748b] leading-relaxed">
          Hardware telemetry (ESP32) and Deep Learning segmentation (U-Net) are currently in simulated operational test mode.
        </p>
      </div>

      {/* User / Station Footer */}
      <div className="p-3.5 border-t border-[#e2e8f0] flex items-center justify-between bg-[#ffffff]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#134e4a] text-xs font-bold">
            HQ
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[#0f172a] truncate">Emergency Dispatch</div>
            <div className="text-[10px] text-[#64748b] truncate">Region 4 Watchroom</div>
          </div>
        </div>
        <span className="text-[10px] font-mono text-[#0d9488] bg-[#ecfdf5] px-1.5 py-0.5 rounded font-semibold border border-[#a7f3d0]">
          LIVE
        </span>
      </div>
    </aside>
  );
};
