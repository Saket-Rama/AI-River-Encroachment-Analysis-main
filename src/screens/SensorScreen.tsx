import React, { useState } from 'react';
import { 
  Radio, 
  Battery, 
  Wifi, 
  Activity, 
  Droplet, 
  Wind, 
  Clock, 
  Server, 
  AlertCircle, 
  Plus, 
  Check, 
  Terminal,
  Cpu,
  Layers,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { SensorTelemetryNode } from '../types/hydrology';
import { RiskBadge, DemoTag } from '../components/RiskBadge';

interface SensorScreenProps {
  sensors: SensorTelemetryNode[];
  onTriggerSimulatedSurge: (sensorId: string) => void;
}

export const SensorScreen: React.FC<SensorScreenProps> = ({
  sensors,
  onTriggerSimulatedSurge
}) => {
  const [selectedSensorId, setSelectedSensorId] = useState<string>(sensors[0]?.id || 'ESP-HYDRO-01');
  const [filterType, setFilterType] = useState<'all' | 'esp32' | 'usgs'>('all');

  const activeSensor = sensors.find(s => s.id === selectedSensorId) || sensors[0];

  const filteredSensors = sensors.filter(s => {
    if (filterType === 'esp32') return s.hardwareType.includes('ESP32');
    if (filterType === 'usgs') return s.hardwareType.includes('USGS');
    return true;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Simulation & Hardware Notice */}
      <div className="bg-[#fffbeb] border border-[#fde68a] rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#92400e]">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-[#b45309] shrink-0" />
          <div>
            <span className="font-bold">Hardware Connectivity Status (Simulated Field Array):</span>
            <span className="text-[#78350f] ml-1">
              Field ESP32 nodes are transmitting telemetry over simulated MQTT brokers. Physical hardware integration requires binding the SPI/UART sonar transducer firmware.
            </span>
          </div>
        </div>
        <DemoTag label="DEMO SENSOR ARRAY" />
      </div>

      {/* Main Grid: Sensor List (Left) + Detail Telemetry Stream (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sensor List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <div>
                <h3 className="font-heading font-bold text-sm text-[#0f172a]">
                  Hydrometric Sensor Nodes
                </h3>
                <p className="text-[11px] text-[#64748b]">Active acoustic depth & rainfall telemetry</p>
              </div>
              <span className="text-xs font-mono font-semibold text-[#0d9488] bg-[#ecfdf5] px-2 py-0.5 rounded border border-[#a7f3d0]">
                {sensors.filter(s => s.isOnline).length} / {sensors.length} ACTIVE
              </span>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 py-3 border-b border-[#f1f5f9] text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded transition-colors font-medium ${
                  filterType === 'all'
                    ? 'bg-[#134e4a] text-white shadow-xs'
                    : 'bg-[#f8fafc] text-[#64748b] hover:bg-[#eff4ff]'
                }`}
              >
                All Transducers
              </button>
              <button
                onClick={() => setFilterType('esp32')}
                className={`px-2.5 py-1 rounded transition-colors font-medium ${
                  filterType === 'esp32'
                    ? 'bg-[#134e4a] text-white shadow-xs'
                    : 'bg-[#f8fafc] text-[#64748b] hover:bg-[#eff4ff]'
                }`}
              >
                ESP32 Nodes (Sim)
              </button>
              <button
                onClick={() => setFilterType('usgs')}
                className={`px-2.5 py-1 rounded transition-colors font-medium ${
                  filterType === 'usgs'
                    ? 'bg-[#134e4a] text-white shadow-xs'
                    : 'bg-[#f8fafc] text-[#64748b] hover:bg-[#eff4ff]'
                }`}
              >
                USGS Gauges
              </button>
            </div>

            {/* Sensor Items */}
            <div className="divide-y divide-[#f1f5f9] mt-2">
              {filteredSensors.map((sensor) => {
                const isSelected = sensor.id === selectedSensorId;
                return (
                  <div
                    key={sensor.id}
                    onClick={() => setSelectedSensorId(sensor.id)}
                    className={`p-3 rounded -mx-1 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#eff4ff] border-l-3 border-[#134e4a]'
                        : 'hover:bg-[#f8fafc]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#0f172a]">{sensor.name}</span>
                        {sensor.isSimulatedDemo && (
                          <span className="text-[9px] px-1 bg-[#fffbeb] text-[#b45309] font-mono rounded border border-[#fde68a]">
                            DEMO
                          </span>
                        )}
                      </div>
                      <RiskBadge level={sensor.status} label={sensor.status.toUpperCase()} />
                    </div>

                    <div className="text-[11px] text-[#64748b] mt-1">{sensor.location}</div>

                    <div className="mt-2.5 grid grid-cols-3 gap-2 text-xs pt-2 border-t border-[#f1f5f9]/80 font-mono">
                      <div>
                        <span className="text-[10px] text-[#94a3b8] block">Depth</span>
                        <span className="font-bold text-[#0f172a]">{sensor.waterLevelM.toFixed(2)} m</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#94a3b8] block">Rainfall</span>
                        <span className="font-bold text-[#0f172a]">{sensor.rainfallMmHr} mm/h</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#94a3b8] block">Velocity</span>
                        <span className="font-bold text-[#0f172a]">{sensor.flowVelocityMs} m/s</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Detailed Live Telemetry Inspection (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-6 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#f1f5f9]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-base text-[#0f172a]">
                    {activeSensor.name}
                  </h3>
                  <DemoTag label="ESP32 EMULATOR ACTIVE" />
                </div>
                <p className="text-xs text-[#64748b] mt-0.5">{activeSensor.location}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTriggerSimulatedSurge(activeSensor.id)}
                  className="px-3 py-1.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#134e4a] text-xs font-semibold rounded transition-colors flex items-center gap-1.5 border border-[#bfc8c6]"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-[#ef4444]" />
                  <span>Simulate Rain Flash Surge</span>
                </button>
              </div>
            </div>

            {/* Real-time telemetry dials */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded">
                <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Acoustic Water Depth</div>
                <div className="font-heading text-xl font-bold text-[#0f172a] mt-1 tabular-nums">
                  {activeSensor.waterLevelM.toFixed(2)} <span className="text-xs font-normal text-[#64748b]">m</span>
                </div>
                <div className="text-[10px] text-[#b91c1c] font-medium mt-0.5">
                  Δ {activeSensor.waterLevelDeltaPerHour > 0 ? `+${activeSensor.waterLevelDeltaPerHour}m/hr` : `${activeSensor.waterLevelDeltaPerHour}m/hr`}
                </div>
              </div>

              <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded">
                <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Flow Velocity</div>
                <div className="font-heading text-xl font-bold text-[#0f172a] mt-1 tabular-nums">
                  {activeSensor.flowVelocityMs.toFixed(2)} <span className="text-xs font-normal text-[#64748b]">m/s</span>
                </div>
                <div className="text-[10px] text-[#0d9488] font-medium mt-0.5">
                  Hydro-Doppler
                </div>
              </div>

              <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded">
                <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Tipping Bucket Rain</div>
                <div className="font-heading text-xl font-bold text-[#0f172a] mt-1 tabular-nums">
                  {activeSensor.rainfallMmHr} <span className="text-xs font-normal text-[#64748b]">mm/h</span>
                </div>
                <div className="text-[10px] text-[#64748b] mt-0.5">
                  Intensity: Severe
                </div>
              </div>

              <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded">
                <div className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Soil Saturation</div>
                <div className="font-heading text-xl font-bold text-[#0f172a] mt-1 tabular-nums">
                  {activeSensor.soilMoisturePct}%
                </div>
                <div className="text-[10px] text-[#ef4444] font-medium mt-0.5">
                  Runoff Limit Exceeded
                </div>
              </div>
            </div>

            {/* Live Chart: Water Depth Trend */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-[#64748b] mb-2">
                <span className="font-medium text-[#0f172a]">Hourly Water Stage vs Inundation Threshold</span>
                <span className="font-mono text-[11px]">Last 6 Hours Telemetry Log</span>
              </div>

              <div className="h-44 bg-[#f8fafc] border border-[#e2e8f0] rounded p-3 flex flex-col justify-end">
                <div className="flex items-end justify-between gap-3 h-32 px-4">
                  {activeSensor.history.map((pt, i) => {
                    const heightPct = Math.min(100, (pt.level / 7.0) * 100);
                    const isLast = i === activeSensor.history.length - 1;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className="text-[10px] font-mono font-bold text-[#0f172a]">
                          {pt.level.toFixed(2)}m
                        </span>
                        <div 
                          className={`w-full rounded-t transition-all ${
                            isLast ? 'bg-[#134e4a]' : 'bg-[#9ad1cb]'
                          }`}
                          style={{ height: `${heightPct}%` }}
                        />
                        <span className="text-[10px] font-mono text-[#64748b]">
                          {pt.timestamp}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Diagnostic Hardware Telemetry Row */}
            <div className="mt-6 p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded">
              <div className="text-xs font-bold text-[#0f172a] mb-2 flex items-center justify-between">
                <span>Transceiver & Peripheral Diagnostics</span>
                <span className="font-mono text-[10px] text-[#64748b]">ESP-NOW / LoRa Gateway: Node ID #{activeSensor.id}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-[#0d9488]" />
                  <div>
                    <div className="text-[10px] text-[#64748b]">Battery Reserve</div>
                    <div className="font-mono font-bold text-[#0f172a]">{activeSensor.batteryPct}% Solar LiFePO4</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-[#0d9488]" />
                  <div>
                    <div className="text-[10px] text-[#64748b]">Signal RSSI</div>
                    <div className="font-mono font-bold text-[#0f172a]">{activeSensor.signalStrengthDbm} dBm (Optimal)</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0d9488]" />
                  <div>
                    <div className="text-[10px] text-[#64748b]">Last Ping Interval</div>
                    <div className="font-mono font-bold text-[#0f172a]">{activeSensor.lastUpdated}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
