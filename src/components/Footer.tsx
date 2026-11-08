import React from 'react';
import { 
  Waves, 
  ShieldCheck, 
  ExternalLink, 
  Github, 
  MapPin, 
  Radio, 
  Mail, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { NavigationPage } from '../types/hydrology';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAbout }) => {
  return (
    <footer className="bg-[#0f172a] text-white border-t border-[#1e293b] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1e293b]">
          {/* Brand & Mission (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-heading font-extrabold text-base tracking-tight text-white">
                RIVERGUARD AI
              </span>
              <p className="text-[11px] text-[#94a3b8]">Hydrologic Encroachment & Flood Risk Intelligence</p>
            </div>

            <p className="text-xs text-[#94a3b8] leading-relaxed max-w-md">
              An advanced AI-IoT dual-channel environmental defense platform designed to protect river ecosystems, identify unauthorized human settlements and agricultural encroachment via satellite imagery, and assess early municipal flood risks using real-time hydro-telemetry.
            </p>

            <div className="p-3 bg-[#1e293b]/80 rounded border border-[#334155] text-[11px] text-[#cbd5e1] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
              <span>
                <strong>Academic & Prototype Notice:</strong> Field sensor nodes (ESP32) and deep learning segmentation checkpoints (U-Net) are currently powered by demonstrated simulation datasets pending deployment of on-ground physical hardware.
              </span>
            </div>
          </div>

          {/* Nav Links: Systems & Analysis */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#89f5e7] mb-3">
              System Modules
            </h4>
            <ul className="space-y-2 text-xs text-[#94a3b8]">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Project Homepage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                  Encroachment Image Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('satellite')} className="hover:text-white transition-colors">
                  Satellite U-Net Segmentation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sensors')} className="hover:text-white transition-colors">
                  Live IoT Sensor Array
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('river')} className="hover:text-white transition-colors">
                  River Basin Hydraulics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('flood-risk')} className="hover:text-white transition-colors">
                  Flood Risk Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Research & Methodology */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#89f5e7] mb-3">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs text-[#94a3b8]">
              <li>
                <span className="text-[#cbd5e1] font-medium block">Computer Vision:</span>
                <span className="text-[11px]">U-Net HydroSeg Model (ResNet-34)</span>
              </li>
              <li>
                <span className="text-[#cbd5e1] font-medium block">Hardware Array:</span>
                <span className="text-[11px]">ESP32 + Ultrasonic Hydro-Sonar</span>
              </li>
              <li>
                <span className="text-[#cbd5e1] font-medium block">Telemetry Relay:</span>
                <span className="text-[11px]">MQTT / LoRaWAN Virtual Mesh</span>
              </li>
              <li>
                <span className="text-[#cbd5e1] font-medium block">Synthesis Engine:</span>
                <span className="text-[11px]">Hydrologic Runoff Hazard Scoring</span>
              </li>
            </ul>
          </div>

          {/* Governance & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#89f5e7] mb-3">
              Governance & Access
            </h4>
            <ul className="space-y-2 text-xs text-[#94a3b8]">
              <li>
                <button onClick={onOpenAbout} className="hover:text-white transition-colors">
                  About Project & Team
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  Emergency Dispatch Center
                </button>
              </li>
              <li className="pt-2 text-[11px]">
                <span className="text-[#cbd5e1] block">Emergency Watchroom:</span>
                <span>Municipal Hydrology Division</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <p>© {new Date().getFullYear()} RIVERGUARD AI Project. All rights reserved. Environmental Telemetry & Flood Disaster Mitigation Initiative.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Version 2.4.0 (Dual-Channel Architecture)</span>
            <span>·</span>
            <span className="text-[#89f5e7]">Simulated Demonstration Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
