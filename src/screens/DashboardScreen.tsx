import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Droplet, 
  Waves, 
  Activity, 
  Gauge, 
  TrendingUp, 
  ShieldAlert, 
  Satellite, 
  MapPin, 
  Clock, 
  CloudRain, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { RiverBasinMetric, SensorTelemetryNode, SatellitePassAnalysis, FloodRiskZone, NavigationPage } from '../types/hydrology';
import { RiskBadge, DemoTag } from '../components/RiskBadge';

interface DashboardProps {
  basins: RiverBasinMetric[];
  sensors: SensorTelemetryNode[];
  passes: SatellitePassAnalysis[];
  zones: FloodRiskZone[];
  onNavigate: (page: NavigationPage) => void;
  onRunAiSummary?: () => void;
  aiBriefing?: string;
  isGeneratingAi?: boolean;
}

export const DashboardScreen: React.FC<DashboardProps> = ({
  basins,
  sensors,
  passes,
  zones,
  onNavigate,
  onRunAiSummary,
  aiBriefing,
  isGeneratingAi
}) => {
  const [selectedBasinId, setSelectedBasinId] = useState<string>(basins[0]?.id || 'RB-01');
  const activeBasin = basins.find(b => b.id === selectedBasinId) || basins[0];

  const criticalCount = zones.filter(z => z.riskLevel === 'critical' || z.riskLevel === 'high').length;
  const avgCrestProb = Math.round(basins.reduce((acc, curr) => acc + curr.crestProbabilityPct, 0) / basins.length);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Critical Advisory Banner if high risk exists */}
      <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#fee2e2] text-[#b91c1c] rounded-full shrink-0">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm text-[#991b1b]">
                FLOOD STAGE ADVISORY ACTIVE: 2 DRAINAGE BASINS EXCEEDING THRESHOLDS
              </span>
              <span className="bg-[#b91c1c] text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">
                CRITICAL
              </span>
            </div>
            <p className="text-xs text-[#7f1d1d] mt-1 leading-relaxed">
              Santiam North Fork and Lower Mill Creek stations have breached Stage 2 warning elevations. Hydro-meteorological models forecast 84mm cumulative rainfall over the next 36 hours.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => onNavigate('flood-risk')}
            className="px-3 py-1.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Inspect Risk Model</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)] relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">Total Basin Discharge</span>
            <span className="p-1.5 bg-[#eff4ff] text-[#134e4a] rounded">
              <Waves className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold text-[#0f172a] tabular-nums">295,100</span>
            <span className="text-xs font-medium text-[#64748b]">ft³/s</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#b45309]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="font-medium tabular-nums">+14.2%</span>
            <span className="text-[#64748b]">vs 24h baseline</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">Critical Gauge Exceedance</span>
            <span className="p-1.5 bg-[#fef2f2] text-[#ef4444] rounded">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold text-[#b91c1c] tabular-nums">2 / 5</span>
            <span className="text-xs font-medium text-[#64748b]">Active Reaches</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#ef4444]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
            <span className="font-medium">Stage 3 Inundation Threat</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">Satellite Water Extent</span>
            <span className="p-1.5 bg-[#eff4ff] text-[#134e4a] rounded">
              <Satellite className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold text-[#0f172a] tabular-nums">+38.4%</span>
            <span className="text-xs font-medium text-[#64748b]">Surface Delta</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#64748b]">
            <span className="font-medium text-[#0f172a] tabular-nums">4,210 ha</span>
            <span>inundation footprint</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">Telemetry Node Health</span>
            <span className="p-1.5 bg-[#ecfdf5] text-[#047857] rounded">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold text-[#0f172a] tabular-nums">100%</span>
            <span className="text-xs font-medium text-[#047857]">(4/4 Online)</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#64748b]">
            <span className="text-[#0d9488] font-semibold">ESP32 Sim Network</span>
            <span>· 1.2s avg latency</span>
          </div>
        </div>
      </div>

      {/* Main Hydrologic Intelligence Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: River Basin Hydrograph & Inspection (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#f1f5f9]">
              <div>
                <h3 className="font-heading font-bold text-base text-[#0f172a]">
                  Hydrological Basin Hydrograph
                </h3>
                <p className="text-xs text-[#64748b] mt-0.5">
                  Stream gauge depth vs crest threshold for critical drainage corridors
                </p>
              </div>
              <div className="flex items-center gap-2">
                <DemoTag label="SIMULATED TELEMETRY" />
              </div>
            </div>

            {/* Basin Selector Tabs */}
            <div className="flex items-center gap-2 py-3 overflow-x-auto border-b border-[#f1f5f9]">
              {basins.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBasinId(b.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap flex items-center gap-2 ${
                    selectedBasinId === b.id
                      ? 'bg-[#134e4a] text-white shadow-xs'
                      : 'bg-[#f8fafc] text-[#475569] hover:bg-[#eff4ff] hover:text-[#134e4a]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    b.status === 'critical' ? 'bg-[#ef4444]' :
                    b.status === 'high' ? 'bg-[#f97316]' :
                    b.status === 'moderate' ? 'bg-[#f59e0b]' : 'bg-[#10b981]'
                  }`} />
                  <span>{b.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Basin Telemetry Card */}
            <div className="mt-4 p-4 bg-[#f8fafc] rounded border border-[#e2e8f0] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Current Gauge</div>
                <div className="font-heading text-xl font-bold text-[#0f172a] mt-1 tabular-nums">
                  {activeBasin.gaugeHeightFt.toFixed(1)} <span className="text-xs font-normal text-[#64748b]">ft</span>
                </div>
                <div className="text-[10px] text-[#64748b] mt-0.5">Baseline: {activeBasin.gaugeHeightBaselineFt} ft</div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Crest Threshold</div>
                <div className="font-heading text-xl font-bold text-[#b91c1c] mt-1 tabular-nums">
                  {activeBasin.crestThresholdFt.toFixed(1)} <span className="text-xs font-normal text-[#64748b]">ft</span>
                </div>
                <div className="text-[10px] text-[#ef4444] font-medium mt-0.5">
                  {(activeBasin.crestThresholdFt - activeBasin.gaugeHeightFt).toFixed(1)} ft headroom
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Flow Velocity</div>
                <div className="font-heading text-xl font-bold text-[#0f172a] mt-1 tabular-nums">
                  {activeBasin.flowRateCfs.toLocaleString()} <span className="text-xs font-normal text-[#64748b]">cfs</span>
                </div>
                <div className="text-[10px] text-[#0d9488] font-medium mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Trend: {activeBasin.flowRateTrend}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Crest Probability</div>
                <div className="font-heading text-xl font-bold text-[#0f172a] mt-1 tabular-nums">
                  {activeBasin.crestProbabilityPct}%
                </div>
                <div className="mt-1">
                  <RiskBadge level={activeBasin.status} />
                </div>
              </div>
            </div>

            {/* SVG Hydrograph visualization */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-[#64748b] mb-2">
                <span>Stage Progression & 48h Predictive Hydrograph Curve</span>
                <span className="font-mono text-[11px]">T-24h to T+24h Projection</span>
              </div>
              <div className="h-52 w-full bg-[#f8fafc] border border-[#e2e8f0] rounded p-3 relative flex flex-col justify-end">
                {/* Dotted Crest Threshold Line */}
                <div 
                  className="absolute left-3 right-3 border-t-2 border-dashed border-[#ef4444] z-10 flex items-center justify-between text-[10px] font-bold text-[#b91c1c] px-2 pointer-events-none"
                  style={{ top: `${Math.max(10, 85 - (activeBasin.crestThresholdFt / 35) * 80)}%` }}
                >
                  <span className="bg-[#fef2f2] px-1 rounded">MAJOR FLOOD STAGE: {activeBasin.crestThresholdFt} FT</span>
                  <span className="bg-[#fef2f2] px-1 rounded">DANGER ZONE</span>
                </div>

                {/* SVG Curve */}
                <svg className="w-full h-40 overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="basinGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="#e2e8f0" strokeDasharray="3 3" />

                  {/* Area fill */}
                  <path
                    d={`M 0 95 Q 120 ${80 - (activeBasin.gaugeHeightFt * 1.5)}, 250 ${70 - (activeBasin.gaugeHeightFt * 1.8)} T 500 ${50 - (activeBasin.gaugeHeightFt * 1.9)} L 500 120 L 0 120 Z`}
                    fill="url(#basinGrad)"
                  />
                  {/* Line stroke */}
                  <path
                    d={`M 0 95 Q 120 ${80 - (activeBasin.gaugeHeightFt * 1.5)}, 250 ${70 - (activeBasin.gaugeHeightFt * 1.8)} T 500 ${50 - (activeBasin.gaugeHeightFt * 1.9)}`}
                    fill="none"
                    stroke="#134e4a"
                    strokeWidth="2.5"
                  />
                  {/* Current timestamp point at T-0 (center x=250) */}
                  <circle cx="250" cy={70 - (activeBasin.gaugeHeightFt * 1.8)} r="5" fill="#134e4a" stroke="#ffffff" strokeWidth="2" />
                </svg>

                <div className="flex justify-between items-center text-[10px] font-mono text-[#64748b] pt-2 border-t border-[#e2e8f0] mt-2">
                  <span>-24 Hours</span>
                  <span>-12 Hours</span>
                  <span className="font-bold text-[#134e4a]">T-0 (Current Now)</span>
                  <span>+12h (Forecast)</span>
                  <span>+24h (Projected Crest)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[#64748b]">
              <span>Hydrologic Reach: {activeBasin.basin} · {activeBasin.region}</span>
              <button 
                onClick={() => onNavigate('river')}
                className="text-[#134e4a] hover:underline font-semibold flex items-center gap-1"
              >
                Inspect full reach telemetry <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Hydrologic Briefing Card */}
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#eff4ff] text-[#134e4a] rounded">
                  <Sparkles className="w-4 h-4 text-[#0d9488]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0f172a]">
                    AI Hydro-Meteorological Synthesis & Briefing
                  </h4>
                  <p className="text-[11px] text-[#64748b]">Automated real-time inference on runoff dynamics and municipal risks</p>
                </div>
              </div>
              <button
                onClick={onRunAiSummary}
                disabled={isGeneratingAi}
                className="px-3 py-1 bg-[#134e4a] hover:bg-[#115e59] text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                {isGeneratingAi ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-[#89f5e7]" />
                    <span>Generate AI Briefing</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded text-xs text-[#334155] leading-relaxed space-y-2">
              {aiBriefing ? (
                <div className="whitespace-pre-line font-normal text-[#1e293b]">
                  {aiBriefing}
                </div>
              ) : (
                <div className="text-[#64748b]">
                  Click <strong className="text-[#0f172a]">"Generate AI Briefing"</strong> to evaluate current sensor flow rates, satellite inundation masks, and generate an executive tactical summary for civil engineering response crews.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Sensor Streams & Satellite Quick Look (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Sensor Feed */}
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0f172a]">
                  Active Telemetry Nodes
                </h4>
                <p className="text-[11px] text-[#64748b]">Edge ESP32 transducers & acoustic depth gauges</p>
              </div>
              <button 
                onClick={() => onNavigate('sensors')}
                className="text-xs text-[#134e4a] hover:underline font-semibold flex items-center gap-1"
              >
                All Sensors <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#f1f5f9] mt-2">
              {sensors.map((sensor) => (
                <div key={sensor.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#0f172a] truncate">{sensor.name}</span>
                      {sensor.isSimulatedDemo && (
                        <span className="text-[9px] px-1 bg-[#fffbeb] text-[#b45309] rounded border border-[#fde68a] font-mono">
                          SIMULATED
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#64748b] truncate mt-0.5">
                      {sensor.location}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-heading text-sm font-bold text-[#0f172a] tabular-nums">
                      {sensor.waterLevelM.toFixed(2)} m
                    </div>
                    <div className="text-[10px] text-[#64748b]">
                      <RiskBadge level={sensor.status} label={sensor.status.toUpperCase()} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Satellite Inundation Summary Card */}
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0f172a]">
                  Recent Satellite Pass Analysis
                </h4>
                <p className="text-[11px] text-[#64748b]">Multispectral water surface segmentation</p>
              </div>
              <button 
                onClick={() => onNavigate('satellite')}
                className="text-xs text-[#134e4a] hover:underline font-semibold flex items-center gap-1"
              >
                U-Net Viewer <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-3 p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0f172a]">{passes[0].satellite}</span>
                <span className="text-[10px] text-[#64748b] font-mono">{passes[0].captureDate}</span>
              </div>
              <div className="mt-2 text-xs text-[#475569]">
                Area: <strong className="text-[#0f172a]">{passes[0].zone}</strong>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs pt-2 border-t border-[#e2e8f0]">
                <div>
                  <span className="text-[10px] text-[#64748b] block">NDWI Index</span>
                  <span className="font-mono font-bold text-[#0f172a]">{passes[0].ndwiIndex} (High saturation)</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748b] block">Inundation Extent</span>
                  <span className="font-mono font-bold text-[#b91c1c]">+{passes[0].waterSurfaceExpansionPct}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-[#eff4ff] border border-[#dce9ff] rounded text-[11px] text-[#134e4a] flex items-center justify-between">
              <span>Deep Learning Architecture: U-Net ResNet-34</span>
              <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#bfc8c6]">
                DEMO WEIGHTS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
