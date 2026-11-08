import React, { useState } from 'react';
import { 
  Waves, 
  MapPin, 
  Compass, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle, 
  Filter, 
  Search, 
  ExternalLink,
  Info,
  Droplet
} from 'lucide-react';
import { RiverBasinMetric } from '../types/hydrology';
import { RiskBadge, DemoTag } from '../components/RiskBadge';

interface RiverScreenProps {
  basins: RiverBasinMetric[];
}

export const RiverScreen: React.FC<RiverScreenProps> = ({ basins }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('all');
  const [selectedBasin, setSelectedBasin] = useState<RiverBasinMetric>(basins[0]);

  const filteredBasins = basins.filter(basin => {
    const matchesSearch = basin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          basin.basin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRiskFilter === 'all' || basin.status === selectedRiskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Overview Header Banner */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-heading font-bold text-lg text-[#0f172a]">
                River Corridor & Watershed Network
              </h2>
              <DemoTag label="GAUGE REACH SIMULATION" />
            </div>
            <p className="text-xs text-[#64748b] mt-1">
              Real-time monitoring of mainstem river reaches, tributary discharges, and acoustic cross-section depth profiles.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search river reach or basin..."
                className="pl-8 pr-3 py-1.5 text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#134e4a] w-56"
              />
            </div>

            <div className="flex items-center gap-1 bg-[#f8fafc] p-1 rounded border border-[#e2e8f0] text-xs">
              {['all', 'critical', 'high', 'moderate', 'low'].map((risk) => (
                <button
                  key={risk}
                  onClick={() => setSelectedRiskFilter(risk)}
                  className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors ${
                    selectedRiskFilter === risk 
                      ? 'bg-[#134e4a] text-white shadow-xs' 
                      : 'text-[#64748b] hover:text-[#0f172a]'
                  }`}
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Data Table (Left 7) + Detailed Channel Cross-Section (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* River Basin Telemetry Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <div className="p-4 border-b border-[#f1f5f9] flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-[#0f172a]">
                Stream Gauge Stations ({filteredBasins.length})
              </span>
              <span className="text-[11px] text-[#64748b] font-mono">
                Tabular Numbers · Real-Time CFS
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] font-medium uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Station / Reach</th>
                    <th className="py-3 px-3">Flow (cfs)</th>
                    <th className="py-3 px-3">Stage (ft)</th>
                    <th className="py-3 px-3">Crest Risk</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {filteredBasins.map((basin) => {
                    const isSelected = basin.id === selectedBasin.id;
                    return (
                      <tr
                        key={basin.id}
                        onClick={() => setSelectedBasin(basin)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#eff4ff]' : 'hover:bg-[#f8fafc]'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#0f172a]">{basin.name}</div>
                          <div className="text-[10px] text-[#64748b]">{basin.basin}</div>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-[#0f172a] tabular-nums">
                          {basin.flowRateCfs.toLocaleString()}
                          <div className="text-[10px] text-[#64748b] font-normal font-sans flex items-center gap-0.5">
                            {basin.flowRateTrend === 'rising' ? (
                              <span className="text-[#ef4444] flex items-center"><TrendingUp className="w-3 h-3 inline" /> Rising</span>
                            ) : (
                              <span className="text-[#0d9488]">Steady</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 font-mono text-[#0f172a] tabular-nums">
                          <div className="font-bold">{basin.gaugeHeightFt.toFixed(1)} ft</div>
                          <div className="text-[10px] text-[#64748b]">Limit: {basin.crestThresholdFt} ft</div>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-semibold tabular-nums">
                          <span className={`${basin.crestProbabilityPct > 70 ? 'text-[#b91c1c]' : 'text-[#0f172a]'}`}>
                            {basin.crestProbabilityPct}%
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <RiskBadge level={basin.status} label={basin.status.toUpperCase()} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected Reach Deep Dive & Cross-Section View (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <div>
                <h3 className="font-heading font-bold text-base text-[#0f172a]">
                  {selectedBasin.name}
                </h3>
                <p className="text-xs text-[#64748b] mt-0.5">{selectedBasin.region}</p>
              </div>
              <RiskBadge level={selectedBasin.status} />
            </div>

            {/* River Channel Cross-Section Diagnostic */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-[#64748b] mb-2">
                <span className="font-medium text-[#0f172a]">Acoustic Channel Cross-Section & Stage</span>
                <span className="font-mono text-[11px]">Gauge Station: {selectedBasin.id}</span>
              </div>

              {/* Graphic Cross Section Box */}
              <div className="h-44 bg-[#f8fafc] border border-[#e2e8f0] rounded p-3 relative flex flex-col justify-end overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="riverWater" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#004f48" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* River Banks & Bed */}
                  <path
                    d="M 10 20 L 70 100 L 230 100 L 290 20 L 300 20 L 300 120 L 0 120 L 0 20 Z"
                    fill="#cbd5e1"
                  />

                  {/* Dynamic Water Volume */}
                  {/* Calculate water top y based on gauge height */}
                  {(() => {
                    const waterHeightRatio = Math.min(1, selectedBasin.gaugeHeightFt / selectedBasin.crestThresholdFt);
                    const waterY = 100 - (waterHeightRatio * 75);
                    const leftX = 70 - (waterHeightRatio * 50);
                    const rightX = 230 + (waterHeightRatio * 50);
                    return (
                      <>
                        <polygon
                          points={`${leftX},${waterY} ${rightX},${waterY} 230,100 70,100`}
                          fill="url(#riverWater)"
                        />
                        {/* Water surface line */}
                        <line
                          x1={leftX}
                          y1={waterY}
                          x2={rightX}
                          y2={waterY}
                          stroke="#89f5e7"
                          strokeWidth="2"
                        />
                      </>
                    );
                  })()}

                  {/* Dotted Crest Threshold line across channel */}
                  <line x1="25" y1="35" x2="275" y2="35" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
                </svg>

                <div className="absolute top-2 right-2 bg-[#fef2f2] text-[#b91c1c] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#fecaca]">
                  CREST DANGER: {selectedBasin.crestThresholdFt} FT
                </div>
              </div>
            </div>

            {/* Hydro Parameters Detail */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider block">Discharge Rate</span>
                <span className="font-heading font-bold text-sm text-[#0f172a] mt-0.5 block tabular-nums">
                  {selectedBasin.dischargeM3s} m³/s
                </span>
              </div>
              <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider block">Turbidity</span>
                <span className="font-heading font-bold text-sm text-[#0f172a] mt-0.5 block tabular-nums">
                  {selectedBasin.turbidityNtu} NTU
                </span>
              </div>
              <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider block">Water Temperature</span>
                <span className="font-heading font-bold text-sm text-[#0f172a] mt-0.5 block tabular-nums">
                  {selectedBasin.waterTempC} °C
                </span>
              </div>
              <div className="p-3 bg-[#f8fafc] rounded border border-[#e2e8f0]">
                <span className="text-[10px] text-[#64748b] uppercase tracking-wider block">Coordinates</span>
                <span className="font-mono text-[11px] text-[#0f172a] mt-0.5 block">
                  {selectedBasin.coordinates[0].toFixed(2)}°N, {selectedBasin.coordinates[1].toFixed(2)}°W
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#eff4ff] border border-[#dce9ff] rounded text-[11px] text-[#134e4a] leading-relaxed">
              <strong>Hydro-GIS Protocol:</strong> Flow curves reflect dynamic acoustic sonar profiling coupled with upstream runoff reservoir discharge releases.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
