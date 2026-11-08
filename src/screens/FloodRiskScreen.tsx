import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Users, 
  Clock, 
  MapPin, 
  Flame, 
  Building2, 
  CheckCircle2, 
  FileText, 
  Send,
  CloudRain,
  Share2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { FloodRiskZone } from '../types/hydrology';
import { RiskBadge, DemoTag } from '../components/RiskBadge';

interface FloodRiskScreenProps {
  zones: FloodRiskZone[];
  onDispatchAlert?: (zone: FloodRiskZone) => void;
}

export const FloodRiskScreen: React.FC<FloodRiskScreenProps> = ({
  zones,
  onDispatchAlert
}) => {
  const [selectedZone, setSelectedZone] = useState<FloodRiskZone>(zones[0]);
  const [alertSent, setAlertSent] = useState<boolean>(false);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);

  const handleTriggerDispatch = () => {
    setAlertSent(true);
    setAlertModalOpen(false);
    if (onDispatchAlert) {
      onDispatchAlert(selectedZone);
    }
  };

  const totalPopAtRisk = zones.reduce((sum, z) => sum + z.populationAtRisk, 0);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner: Emergency Action Level */}
      <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-[#fee2e2] text-[#b91c1c] rounded-full shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-base text-[#991b1b]">
                Civil Inundation Warning & Evacuation Readiness
              </h2>
              <DemoTag label="SIMULATION / DEMO RUN" />
            </div>
            <p className="text-xs text-[#7f1d1d] mt-1 leading-relaxed">
              Total estimated population in direct flood hazard inundation corridors: <strong className="font-bold">{totalPopAtRisk.toLocaleString()} residents</strong>. 
              Municipal dispatch protocol active under Emergency Operation Framework.
            </p>
          </div>
        </div>

        <button
          onClick={() => setAlertModalOpen(true)}
          className="px-4 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-bold rounded shadow-sm transition-colors flex items-center gap-2 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>Broadcast Warning Dispatch</span>
        </button>
      </div>

      {alertSent && (
        <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded p-3 text-xs text-[#047857] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
            <span>Simulated emergency dispatch broadcast dispatched to County Emergency Management relays for <strong>{selectedZone.zoneName}</strong>.</span>
          </div>
          <button onClick={() => setAlertSent(false)} className="text-[#047857] hover:underline font-semibold">
            Dismiss
          </button>
        </div>
      )}

      {/* Grid: Risk Zone Matrix (Left 7) + Selected Zone Action Dossier (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Zones List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <div>
                <h3 className="font-heading font-bold text-sm text-[#0f172a]">
                  Municipal Flood Risk Zones
                </h3>
                <p className="text-[11px] text-[#64748b]">Real-time hazard scoring and population exposure</p>
              </div>
              <span className="text-xs font-mono font-semibold text-[#b91c1c] bg-[#fef2f2] px-2 py-0.5 rounded border border-[#fecaca]">
                {zones.filter(z => z.riskScore >= 70).length} HIGH/CRITICAL ZONES
              </span>
            </div>

            <div className="divide-y divide-[#f1f5f9] mt-2">
              {zones.map((zone) => {
                const isSelected = zone.id === selectedZone.id;
                return (
                  <div
                    key={zone.id}
                    onClick={() => {
                      setSelectedZone(zone);
                      setAlertSent(false);
                    }}
                    className={`p-4 rounded -mx-1 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#eff4ff] border-l-3 border-[#134e4a]'
                        : 'hover:bg-[#f8fafc]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#0f172a]">{zone.zoneName}</span>
                      </div>
                      <RiskBadge level={zone.riskLevel} />
                    </div>

                    <div className="text-[11px] text-[#64748b] mt-1">{zone.watershed}</div>

                    {/* Progress Bar of Risk Score */}
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-[#64748b] mb-1 font-mono">
                        <span>Flood Inundation Probability Score</span>
                        <span className="font-bold text-[#0f172a]">{zone.riskScore} / 100</span>
                      </div>
                      <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            zone.riskScore >= 80 ? 'bg-[#ef4444]' :
                            zone.riskScore >= 60 ? 'bg-[#f97316]' :
                            zone.riskScore >= 40 ? 'bg-[#f59e0b]' : 'bg-[#10b981]'
                          }`}
                          style={{ width: `${zone.riskScore}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#f1f5f9] text-[#475569]">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#64748b]" />
                        <span className="tabular-nums font-mono font-medium">{zone.populationAtRisk.toLocaleString()}</span>
                        <span className="text-[11px] text-[#64748b]">at risk</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#64748b]" />
                        <span className="text-[11px]">Peak Crest:</span>
                        <span className="font-mono font-semibold text-[#0f172a]">+{zone.projectedPeakHours}h</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Zone Tactical Dossier (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <div>
                <h3 className="font-heading font-bold text-base text-[#0f172a]">
                  Emergency Action Dossier
                </h3>
                <p className="text-xs text-[#64748b] mt-0.5">{selectedZone.zoneName}</p>
              </div>
              <RiskBadge level={selectedZone.riskLevel} />
            </div>

            {/* Inundation Stage Metrics */}
            <div className="mt-4 p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#64748b]">Current River Stage:</span>
                <span className="font-mono font-bold text-[#b91c1c] text-sm tabular-nums">
                  {selectedZone.currentStageFt} ft
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748b]">Action Flood Stage:</span>
                <span className="font-mono font-medium text-[#0f172a] tabular-nums">
                  {selectedZone.floodStageFt} ft
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#64748b]">Major Inundation Stage:</span>
                <span className="font-mono font-medium text-[#b91c1c] tabular-nums">
                  {selectedZone.majorFloodStageFt} ft
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#e2e8f0]">
                <span className="text-[#64748b]">72-Hour Cumulative Rain:</span>
                <span className="font-mono font-bold text-[#0d9488] tabular-nums">
                  {selectedZone.precipForecast72hMm} mm
                </span>
              </div>
            </div>

            {/* Critical Infrastructure Exposure */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#134e4a]" />
                <span>Critical Infrastructure Exposed</span>
              </h4>
              <ul className="space-y-1.5">
                {selectedZone.criticalInfrastructures.map((infra, idx) => (
                  <li key={idx} className="p-2 bg-[#f8fafc] rounded border border-[#e2e8f0] text-xs text-[#334155] flex items-center justify-between">
                    <span>{infra}</span>
                    <span className="text-[10px] font-mono text-[#b91c1c] font-semibold bg-[#fee2e2] px-1.5 py-0.2 rounded">
                      High Exposure
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Evacuation Protocol Status */}
            <div className="mt-5 p-4 bg-[#eff4ff] border border-[#dce9ff] rounded">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#134e4a]">Evacuation Readiness:</span>
                <span className="font-mono font-bold text-[#0f172a] bg-white px-2 py-0.5 rounded border border-[#bfc8c6]">
                  {selectedZone.evacuationReadiness}
                </span>
              </div>
              <p className="text-[11px] text-[#334155] mt-2 leading-relaxed">
                Emergency shelters on standby at West Regional High School. High-clearance rescue vehicles pre-staged at District Station 8.
              </p>
            </div>

            <div className="mt-5">
              <button
                onClick={() => setAlertModalOpen(true)}
                className="w-full py-2.5 bg-[#134e4a] hover:bg-[#115e59] text-white text-xs font-semibold rounded shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Trigger Zone Evacuation Advisory</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {alertModalOpen && (
        <div className="fixed inset-0 bg-[#0b1c30]/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#fef2f2] text-[#b91c1c] rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#0f172a]">
                  Confirm Simulated Warning Broadcast
                </h3>
                <p className="text-xs text-[#64748b]">Emergency Operations Center (EOC) Simulation</p>
              </div>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              You are about to issue a simulated flood evacuation dispatch for <strong className="text-[#0f172a]">{selectedZone.zoneName}</strong> with an estimated resident exposure of <strong>{selectedZone.populationAtRisk.toLocaleString()} individuals</strong>.
            </p>

            <div className="p-3 bg-[#fffbeb] rounded border border-[#fde68a] text-[11px] text-[#92400e]">
              <strong>Simulation Mode:</strong> No external SMS gateways will be triggered. This updates the local mission console log.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setAlertModalOpen(false)}
                className="px-3 py-1.5 text-xs text-[#475569] hover:bg-[#f1f5f9] rounded transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleTriggerDispatch}
                className="px-4 py-1.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-bold rounded shadow-xs transition-colors"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
