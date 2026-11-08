import React from 'react';
import { 
  Bell, 
  Calendar, 
  RefreshCw, 
  SlidersHorizontal, 
  Clock, 
  ShieldCheck,
  Radio,
  Download
} from 'lucide-react';
import { DemoTag } from './RiskBadge';

interface HeaderProps {
  title: string;
  subtitle: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  actionButton?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onRefresh,
  isRefreshing = false,
  actionButton
}) => {
  return (
    <header className="bg-white border-b border-[#e2e8f0] px-8 py-4.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-xl font-bold tracking-tight text-[#0f172a]">
            {title}
          </h1>
          <DemoTag label="SIMULATION / DEMO MODE" />
        </div>
        <p className="text-xs text-[#64748b] mt-0.5 font-normal">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded text-xs text-[#475569] font-medium">
          <Clock className="w-3.5 h-3.5 text-[#64748b]" />
          <span className="tabular-nums">UTC: {new Date().toISOString().substring(11, 19)}</span>
          <span className="text-[#cbd5e1]">•</span>
          <span className="text-[#0d9488] font-semibold">Feed: Active</span>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#cbd5e1] text-[#0f172a] text-xs font-medium rounded transition-colors shadow-xs disabled:opacity-60"
            title="Poll real-time sensor array"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#64748b] ${isRefreshing ? 'animate-spin text-[#134e4a]' : ''}`} />
            <span>Poll Telemetry</span>
          </button>
        )}

        {actionButton}
      </div>
    </header>
  );
};
