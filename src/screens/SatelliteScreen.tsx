import React, { useState, useRef } from 'react';
import { 
  Satellite, 
  Upload, 
  Layers, 
  Eye, 
  EyeOff, 
  Sliders, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Maximize2,
  Sparkles,
  Info,
  RefreshCw,
  Zap
} from 'lucide-react';
import { SatellitePassAnalysis } from '../types/hydrology';
import { DemoTag } from '../components/RiskBadge';

interface SatelliteScreenProps {
  passes: SatellitePassAnalysis[];
}

export const SatelliteScreen: React.FC<SatelliteScreenProps> = ({ passes }) => {
  const [selectedPass, setSelectedPass] = useState<SatellitePassAnalysis>(passes[0]);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(75);
  const [showMask, setShowMask] = useState<boolean>(true);
  const [showContours, setShowContours] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customSegmentationRun, setCustomSegmentationRun] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setCustomSegmentationRun(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunInference = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCustomSegmentationRun(true);
    }, 1400);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Notice: Architecture Calibration */}
      <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-[#134e4a]">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-[#0d9488] shrink-0" />
          <div>
            <span className="font-bold">U-Net HydroSeg Model Pipeline (Awaiting Live Hardware Weights):</span>
            <span className="text-[#334155] ml-1">
              Currently executing on validated multi-spectral synthetic imagery. Sentinel-2 and Landsat raster tiles are mapped using NDWI index boundaries.
            </span>
          </div>
        </div>
        <DemoTag label="DEMO WEIGHTS / SIMULATED U-NET" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Raster & Segmentation Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            {/* Viewport Control Bar */}
            <div className="px-5 py-3 border-b border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3 bg-[#ffffff]">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-[#0f172a]">
                  Multispectral Geospatial Raster Viewport
                </span>
                <span className="text-[10px] font-mono text-[#64748b]">10m GSD Resolution</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMask(!showMask)}
                  className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition-colors border ${
                    showMask 
                      ? 'bg-[#134e4a] text-white border-[#134e4a]' 
                      : 'bg-white text-[#475569] border-[#e2e8f0]'
                  }`}
                >
                  {showMask ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>U-Net Mask</span>
                </button>

                <button
                  onClick={() => setShowContours(!showContours)}
                  className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition-colors border ${
                    showContours 
                      ? 'bg-[#0f172a] text-white border-[#0f172a]' 
                      : 'bg-white text-[#475569] border-[#e2e8f0]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Contours</span>
                </button>
              </div>
            </div>

            {/* Viewport Canvas Display Area */}
            <div className="relative aspect-16/10 bg-[#0b1c30] flex items-center justify-center overflow-hidden group select-none">
              {/* Background satellite simulation terrain */}
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  alt="Custom Uploaded Raster" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full relative bg-gradient-to-br from-[#1a2e26] via-[#15232d] to-[#0f172a]">
                  {/* Procedural GIS map terrain styling */}
                  <svg className="w-full h-full absolute inset-0 opacity-80" viewBox="0 0 800 500" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a4356" strokeWidth="0.5" strokeOpacity="0.4" />
                      </pattern>
                      {/* Linear gradient for river flood water */}
                      <linearGradient id="floodWater" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0d9488" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>

                    {/* Topographic background grid */}
                    <rect width="800" height="500" fill="url(#grid)" />

                    {/* Terrain contours */}
                    {showContours && (
                      <g stroke="#334d5c" strokeWidth="1" fill="none" opacity="0.6">
                        <ellipse cx="200" cy="150" rx="180" ry="120" />
                        <ellipse cx="650" cy="350" rx="220" ry="160" />
                        <ellipse cx="600" cy="180" rx="140" ry="90" />
                        <path d="M 50 300 C 150 200, 300 350, 450 250 S 700 300, 780 180" />
                        <path d="M 80 400 C 200 350, 350 420, 500 380 S 720 400, 790 320" />
                      </g>
                    )}

                    {/* Natural River Course */}
                    <path
                      d="M 20 80 C 180 120, 260 220, 380 200 S 540 340, 780 320"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="24"
                      strokeLinecap="round"
                    />

                    {/* U-Net Flood Inundation Mask Overlay */}
                    {showMask && (
                      <g opacity={overlayOpacity / 100}>
                        {/* Overflow zone 1: North agricultural reach */}
                        <path
                          d="M 210 130 C 260 90, 340 110, 390 190 C 340 250, 240 240, 210 130 Z"
                          fill="#ef4444"
                          fillOpacity="0.45"
                          stroke="#ef4444"
                          strokeWidth="2"
                        />
                        {/* Overflow zone 2: Main downstream floodplain */}
                        <path
                          d="M 430 220 C 520 160, 680 240, 720 380 C 600 440, 480 350, 430 220 Z"
                          fill="#f97316"
                          fillOpacity="0.5"
                          stroke="#f97316"
                          strokeWidth="2"
                        />
                      </g>
                    )}
                  </svg>
                </div>
              )}

              {/* Processing Spinner Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-[#0f172a]/70 flex flex-col items-center justify-center text-white backdrop-blur-xs z-30">
                  <div className="w-10 h-10 border-3 border-[#89f5e7] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-3 font-heading font-semibold text-sm">Executing U-Net Segmentation Pipeline...</p>
                  <p className="text-[11px] text-[#94a3b8] font-mono mt-0.5">Calculating NDWI water spectral indices</p>
                </div>
              )}

              {/* Floating GIS Coordinate Telemetry Stamp */}
              <div className="absolute bottom-3 left-3 bg-[#0f172a]/85 text-white backdrop-blur-xs px-2.5 py-1.5 rounded border border-white/10 text-[11px] font-mono flex items-center gap-3 z-10">
                <span>LAT: 45°31'12" N</span>
                <span>LON: 122°40'44" W</span>
                <span className="text-[#89f5e7]">CRS: EPSG:4326</span>
              </div>

              {/* Legend overlay */}
              <div className="absolute top-3 right-3 bg-[#ffffff]/95 text-[#0f172a] backdrop-blur-xs px-3 py-2 rounded border border-[#e2e8f0] shadow-md text-xs space-y-1.5 z-10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">Classification Legend</div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#0284c7]"></span>
                  <span className="text-[11px]">Normal River Channel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#ef4444]/60 border border-[#ef4444]"></span>
                  <span className="text-[11px]">Critical Flood Inundation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#f97316]/60 border border-[#f97316]"></span>
                  <span className="text-[11px]">Moderate Runoff Accumulation</span>
                </div>
              </div>
            </div>

            {/* Bottom Sliders & Canvas Controls */}
            <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#64748b]" />
                  <span className="text-xs font-semibold text-[#0f172a]">Segmentation Mask Opacity:</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-32 accent-[#134e4a] cursor-pointer"
                />
                <span className="text-xs font-mono font-medium text-[#475569] tabular-nums">
                  {overlayOpacity}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white border border-[#e2e8f0] hover:bg-[#eff4ff] text-[#0f172a] text-xs font-medium rounded transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5 text-[#134e4a]" />
                  <span>Upload Satellite Raster</span>
                </button>

                <button
                  onClick={handleRunInference}
                  disabled={isProcessing}
                  className="px-3 py-1.5 bg-[#134e4a] hover:bg-[#115e59] text-white text-xs font-semibold rounded transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5 text-[#89f5e7]" />
                  <span>Run U-Net Inference</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pass Details & Model Diagnostics (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Satellite Orbit Passes List */}
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
            <h4 className="font-heading font-bold text-sm text-[#0f172a] pb-3 border-b border-[#f1f5f9]">
              Satellite Orbital Passes
            </h4>
            <div className="divide-y divide-[#f1f5f9] mt-2">
              {passes.map((pass) => (
                <div
                  key={pass.id}
                  onClick={() => setSelectedPass(pass)}
                  className={`py-3 cursor-pointer rounded px-2 -mx-2 transition-colors ${
                    selectedPass.id === pass.id ? 'bg-[#eff4ff] border-l-2 border-[#134e4a]' : 'hover:bg-[#f8fafc]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0f172a]">{pass.satellite}</span>
                    <span className="text-[10px] text-[#64748b] font-mono">{pass.captureDate}</span>
                  </div>
                  <div className="text-[11px] text-[#475569] mt-1 truncate">{pass.zone}</div>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="text-[#64748b]">Inundation: <strong className="text-[#b91c1c] font-mono">+{pass.waterSurfaceExpansionPct}%</strong></span>
                    <span className="text-[#0d9488] font-semibold">{pass.resolution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Specification Card */}
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-sm text-[#0f172a]">
                Deep Learning Model Profile
              </h4>
              <DemoTag label="PRE-TRAINED DEMO" />
            </div>

            <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Architecture:</span>
                <span className="font-mono font-medium text-[#0f172a]">U-Net (ResNet-34 Backbone)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Input Channels:</span>
                <span className="font-mono font-medium text-[#0f172a]">4-Band (B2, B3, B4, B8 NIR)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Mean IoU Score:</span>
                <span className="font-mono font-medium text-[#0d9488]">0.884 (Validation Set)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Model State:</span>
                <span className="font-medium text-[#b45309]">Awaiting Production Hardware Calibration</span>
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] border border-[#dce9ff] rounded text-[11px] text-[#134e4a] leading-relaxed">
              <Info className="w-3.5 h-3.5 inline mr-1 text-[#0d9488]" />
              <strong>Integration Note:</strong> Once the active weights checkpoint is placed in the model container, real-time inferencing will stream straight to the flood risk dispatch engine.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
