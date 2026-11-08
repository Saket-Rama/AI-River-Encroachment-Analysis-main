import React from 'react';
import { RiskLevel } from '../types/hydrology';

interface RiskBadgeProps {
  level: RiskLevel;
  label?: string;
  pulsing?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, label, pulsing = false }) => {
  const configs = {
    low: {
      bg: 'bg-[#ecfdf5]',
      border: 'border-[#a7f3d0]',
      text: 'text-[#047857]',
      dot: 'bg-[#10b981]',
      defaultLabel: 'Low / Nominal'
    },
    moderate: {
      bg: 'bg-[#fffbeb]',
      border: 'border-[#fde68a]',
      text: 'text-[#b45309]',
      dot: 'bg-[#f59e0b]',
      defaultLabel: 'Moderate / Advisory'
    },
    high: {
      bg: 'bg-[#fff7ed]',
      border: 'border-[#fed7aa]',
      text: 'text-[#c2410c]',
      dot: 'bg-[#f97316]',
      defaultLabel: 'High Risk'
    },
    critical: {
      bg: 'bg-[#fef2f2]',
      border: 'border-[#fecaca]',
      text: 'text-[#b91c1c]',
      dot: 'bg-[#ef4444]',
      defaultLabel: 'Critical Evacuation'
    }
  };

  const config = configs[level] || configs.low;
  const isPulsing = pulsing || level === 'critical';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${config.bg} ${config.border} ${config.text}`}
    >
      <span className="relative flex h-2 w-2">
        {isPulsing && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
      </span>
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};

export const DemoTag: React.FC<{ label?: string }> = ({ label = 'DEMO DATA' }) => {
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium tracking-wide bg-[#eff4ff] text-[#134e4a] border border-[#d3e4fe]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#316763]"></span>
      {label}
    </span>
  );
};
