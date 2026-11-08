import React from 'react';
import { 
  X, 
  Waves, 
  Cpu, 
  Satellite, 
  ShieldCheck, 
  Layers, 
  Radio, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/75 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-[#e2e8f0] max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-[#134e4a] text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                About RIVERGUARD AI
              </h3>
              <p className="text-xs text-[#b5ede7]">
                AI-IoT Based Real-Time River Encroachment Detection & Flood Risk Assessment System
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#334155] leading-relaxed">
          <div>
            <h4 className="font-heading font-bold text-sm text-[#0f172a] mb-2">
              Mission Statement & Core Concept
            </h4>
            <p>
              Rivers and urban waterways across the world suffer from unchecked human encroachment—including residential illegal construction, unauthorized agricultural reclamation, industrial building, and hazardous solid waste dumping. When the natural riverbank buffer and riparian floodplain are diminished, river discharge capacity plummets, causing rapid flash flooding and devastating socioeconomic damage.
            </p>
            <p className="mt-2">
              <strong>RIVERGUARD AI</strong> introduces a dual-channel environmental surveillance paradigm that decouples spatial encroachment detection (via orbital multi-spectral satellite imagery) from hydraulic flood risk forecasting (via real-time IoT water-level sensor telemetry).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
              <div className="flex items-center gap-2 text-[#134e4a] font-bold mb-2">
                <Satellite className="w-4 h-4 text-[#0d9488]" />
                <span>Channel 1: AI Satellite Vision</span>
              </div>
              <p className="text-[11px] text-[#475569]">
                Employs a custom deep learning <strong>U-Net convolutional neural network</strong> to segment river waterways (blue), vegetation buffers (green), and unauthorized structural encroachment (red) from high-resolution Sentinel and Landsat imagery.
              </p>
            </div>

            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
              <div className="flex items-center gap-2 text-[#134e4a] font-bold mb-2">
                <Radio className="w-4 h-4 text-[#0d9488]" />
                <span>Channel 2: Edge IoT Telemetry</span>
              </div>
              <p className="text-[11px] text-[#475569]">
                Integrates physical river gauge transducers using <strong>ultrasonic sensors and ESP32 microcontrollers</strong>. Streams live water levels, velocity estimates, and rainfall accumulation through low-latency telemetry protocols.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-[#0f172a] mb-2">
              Dual-Channel Risk Assessment Module
            </h4>
            <p>
              Rather than assuming one data feed can solve municipal flood prevention alone, RIVERGUARD AI correlates the <strong>geometric loss of channel cross-section</strong> (detected by satellite U-Net) with <strong>real-time surge rates</strong> (detected by IoT sensor gauges) to calculate 4-tier standardized risk advisories: <em>Low, Moderate, High, and Critical Evacuation</em>.
            </p>
          </div>

          <div className="p-3 bg-[#eff4ff] border border-[#dce9ff] rounded text-[11px] text-[#134e4a] flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
            <div>
              <strong>Demonstration & Research Integrity:</strong> Live sensor readouts and deep learning model inferencing in this portal utilize authenticated simulation data until direct ESP32 hardware field nodes and live model server endpoints are provisioned.
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#134e4a] hover:bg-[#115e59] text-white text-xs font-semibold rounded transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
