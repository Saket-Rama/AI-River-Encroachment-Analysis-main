import React, { useState } from 'react';
import { 
  ArrowRight, 
  Satellite, 
  Radio, 
  ShieldAlert, 
  AlertTriangle, 
  Activity, 
  Waves, 
  Cpu, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  ChevronRight, 
  Sliders, 
  FileCheck, 
  Eye, 
  ExternalLink,
  Droplets,
  Sparkles
} from 'lucide-react';
import { NavigationPage } from '../types/hydrology';
import { ENCROACHMENT_GALLERY } from '../data/encroachmentGallery';

interface HomeScreenProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenLogin: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenLogin
}) => {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isHoveringComparison, setIsHoveringComparison] = useState<boolean>(false);

  // Gallery categories
  const categories = ['All', 'Residential Encroachment', 'Agricultural Encroachment', 'Riverbank Construction', 'Waste Dumping', 'Channel Narrowing', 'Before & After'];

  const filteredGallery = selectedGalleryCategory === 'All' 
    ? ENCROACHMENT_GALLERY 
    : ENCROACHMENT_GALLERY.filter(item => item.category === selectedGalleryCategory);

  return (
    <div className="bg-[#f8fafc] text-[#0b1c30]">
      {/* 2. HERO SECTION */}
      <section className="relative bg-[#0f172a] text-white overflow-hidden border-b border-[#1e293b]">
        {/* Background Aerial Satellite Image with measured environmental overlay scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_river_satellite_1794121957764.jpg"
            alt="Aerial satellite photograph of winding river basin and encroaching urban developments"
            className="w-full h-full object-cover opacity-35 filter brightness-90 contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c30] via-[#0b1c30]/90 to-[#0b1c30]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 cols: Hero Copy & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#134e4a]/60 border border-[#87beb8]/30 backdrop-blur-xs text-[#89f5e7] text-xs font-semibold">
                <ShieldAlert className="w-4 h-4 text-[#89f5e7]" />
                <span>AI-IoT Environmental Defense Framework</span>
                <span className="text-white/40">·</span>
                <span className="font-mono text-[10px] text-white/90">v2.4 Live Prototype</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.15] text-balance">
                Protecting Rivers. Detecting Encroachment. Preventing Flood Risks.
              </h1>

              <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed max-w-2xl font-normal">
                RIVERGUARD AI is an environmental monitoring platform combining <strong>AI-based satellite image analysis</strong> (U-Net deep segmentation) and <strong>IoT-based water-level monitoring</strong> (ultrasonic ESP32 hydro-nodes) to proactively safeguard river floodways, detect unauthorized riverbank settlements, and evaluate early flood risk before disaster strikes.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('satellite')}
                  className="px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#134e4a] hover:bg-[#115e59] rounded-md transition-colors shadow-sm flex items-center gap-2 border border-[#87beb8]/40"
                >
                  <Satellite className="w-4 h-4 text-[#89f5e7]" />
                  <span>Explore River Analysis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('sensors')}
                  className="px-5 py-3 text-xs sm:text-sm font-bold text-[#0f172a] bg-white hover:bg-[#f1f5f9] rounded-md transition-colors shadow-sm flex items-center gap-2 border border-[#e2e8f0]"
                >
                  <Radio className="w-4 h-4 text-[#0d9488]" />
                  <span>View Live Monitoring</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="block font-heading font-bold text-lg text-white tabular-nums">10m GSD</span>
                  <span className="text-[11px] text-[#94a3b8]">Satellite Multispectral</span>
                </div>
                <div>
                  <span className="block font-heading font-bold text-lg text-[#89f5e7] tabular-nums">0.884 IoU</span>
                  <span className="text-[11px] text-[#94a3b8]">U-Net Segmentation</span>
                </div>
                <div>
                  <span className="block font-heading font-bold text-lg text-white tabular-nums">1.2s Sync</span>
                  <span className="text-[11px] text-[#94a3b8]">Simulated IoT Telemetry</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Live Snapshot Teaser Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#1e293b]/90 backdrop-blur-md rounded-xl border border-[#334155] p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <span className="text-xs font-bold text-white tracking-wide uppercase">
                      Operational Status
                    </span>
                  </div>
                  <span className="font-mono text-[10px] bg-[#003633] text-[#89f5e7] px-2 py-0.5 rounded border border-[#316763]">
                    DEMO SIMULATION
                  </span>
                </div>

                {/* Satellite + IoT Dual Card */}
                <div className="space-y-3">
                  <div className="p-3 bg-[#0f172a] rounded-lg border border-[#334155] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#134e4a]/60 text-[#89f5e7] rounded">
                        <Satellite className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Sentinel-2 HydroSeg Pass</div>
                        <div className="text-[10px] text-[#94a3b8]">34% Floodplain Encroachment Detected</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#ef4444] bg-[#ef4444]/15 px-2 py-0.5 rounded">
                      CRITICAL
                    </span>
                  </div>

                  <div className="p-3 bg-[#0f172a] rounded-lg border border-[#334155] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#134e4a]/60 text-[#89f5e7] rounded">
                        <Radio className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">ESP32 Acoustic Sonar #01</div>
                        <div className="text-[10px] text-[#94a3b8]">Water Stage: 4.82m · Rising (+0.28m/h)</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#f59e0b] bg-[#f59e0b]/15 px-2 py-0.5 rounded">
                      ADVISORY
                    </span>
                  </div>

                  <div className="p-3 bg-[#134e4a]/30 rounded-lg border border-[#134e4a] text-xs text-[#cbd5e1] flex items-center justify-between">
                    <span>Aggregated Municipal Risk:</span>
                    <strong className="text-[#ef4444] font-heading text-sm">Level 4: Evacuation Watch</strong>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full py-2.5 bg-[#134e4a] hover:bg-[#115e59] text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-2"
                >
                  <span>Launch Hydrologic Intelligence Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RIVER ENCROACHMENT IMAGE GALLERY (MOST IMPORTANT SECTION) */}
      <section className="py-20 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#f1f5f9]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#134e4a] mb-1">
                <span>Critical Environmental Evidence</span>
                <span>·</span>
                <span className="text-[#0d9488]">High-Resolution Documentation</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] tracking-tight">
                River Encroachment Visual Evidence
              </h2>
              <p className="text-xs sm:text-sm text-[#64748b] mt-2 leading-relaxed">
                Realistic aerial photographs, drone surveillance, and satellite records documenting unauthorized construction, agricultural expansion, waste dumping, and riverbank constriction.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedGalleryCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedGalleryCategory === cat
                      ? 'bg-[#134e4a] text-white font-semibold shadow-xs'
                      : 'text-[#475569] hover:text-[#0f172a] hover:bg-[#f1f5f9]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Image-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Image Container with Consistent Aspect Ratio */}
                <div className="relative aspect-4/3 bg-[#0f172a] overflow-hidden">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-[#134e4a] backdrop-blur-xs shadow-xs border border-white/20">
                      {item.category}
                    </span>
                  </div>

                  {/* Severity Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.encroachmentSeverity === 'Critical'
                        ? 'bg-[#ef4444] text-white'
                        : 'bg-[#f59e0b] text-white'
                    }`}>
                      {item.encroachmentSeverity} Risk
                    </span>
                  </div>

                  {/* Location Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-[11px] text-[#e2e8f0] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#89f5e7] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#0f172a] group-hover:text-[#134e4a] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748b] mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Environmental / Hydraulic Impact Box */}
                  <div className="pt-3 border-t border-[#f1f5f9] text-[11px] text-[#475569] bg-[#f8fafc] p-2.5 rounded border border-[#e2e8f0]/80">
                    <strong className="text-[#134e4a] block font-semibold mb-0.5">Hydraulic Flood Impact:</strong>
                    <span>{item.floodImpact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Encroachment Deep Dive Callout */}
          <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-heading font-bold text-base text-[#134e4a]">
                Need to inspect geospatial coordinates or report illegal river construction?
              </h4>
              <p className="text-xs text-[#475569]">
                View live U-Net deep learning segmentation maps and compare raw satellite imagery across municipal watershed zones.
              </p>
            </div>
            <button
              onClick={() => onNavigate('satellite')}
              className="px-4 py-2 bg-[#134e4a] hover:bg-[#115e59] text-white text-xs font-bold rounded transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <span>Inspect Satellite Segmentation</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. AI SATELLITE ANALYSIS PREVIEW (BEFORE & AFTER SEGMENTATION) */}
      <section className="py-20 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#134e4a]">
              <Satellite className="w-4 h-4 text-[#0d9488]" />
              <span>Computer Vision Pipeline</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] tracking-tight">
              AI Satellite Segmentation Preview
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Our U-Net segmentation model identifies river, vegetation, and encroachment regions from uploaded images.
            </p>
          </div>

          {/* Interactive Before & After Comparison Showcase */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 lg:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Visual Split Screen (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div 
                  className="relative aspect-16/9 rounded-xl overflow-hidden border border-[#cbd5e1] select-none shadow-inner"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                    setSliderPosition((x / rect.width) * 100);
                  }}
                >
                  {/* Base Image: Original River Satellite Image */}
                  <img
                    src="/src/assets/images/hero_river_satellite_1794121957764.jpg"
                    alt="Original river satellite image"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Overlay Image: AI-Generated Segmentation Result */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                  >
                    <div className="relative w-full h-full bg-[#0b1c30]">
                      {/* Procedural AI Segmentation Canvas */}
                      <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="none">
                        {/* Background Vegetation: Green color */}
                        <rect width="800" height="450" fill="#15803d" fillOpacity="0.82" />

                        {/* Riparian buffer zone / fields */}
                        <path d="M 0 0 L 800 0 L 800 120 L 0 160 Z" fill="#166534" fillOpacity="0.85" />
                        <path d="M 0 320 L 800 280 L 800 450 L 0 450 Z" fill="#166534" fillOpacity="0.85" />

                        {/* River / Water: Blue color */}
                        <path
                          d="M 20 80 C 180 120, 260 220, 380 200 S 540 340, 780 320"
                          fill="none"
                          stroke="#0284c7"
                          strokeWidth="38"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 20 80 C 180 120, 260 220, 380 200 S 540 340, 780 320"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="28"
                          strokeLinecap="round"
                        />

                        {/* Illegal Encroachment: Red color */}
                        {/* Encroachment Cluster 1: Northern bank residential expansion */}
                        <path
                          d="M 230 110 C 270 95, 340 120, 380 180 C 330 210, 260 190, 230 110 Z"
                          fill="#ef4444"
                          fillOpacity="0.85"
                          stroke="#b91c1c"
                          strokeWidth="2"
                        />
                        {/* Encroachment Cluster 2: Commercial constriction */}
                        <path
                          d="M 460 190 C 530 180, 620 220, 650 320 C 560 340, 480 270, 460 190 Z"
                          fill="#ef4444"
                          fillOpacity="0.85"
                          stroke="#b91c1c"
                          strokeWidth="2"
                        />
                        {/* Encroachment Cluster 3: Bankside industrial fill */}
                        <circle cx="160" cy="120" r="28" fill="#ef4444" fillOpacity="0.85" stroke="#b91c1c" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                  {/* Vertical Dividing Line & Draggable Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-20 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#0f172a] shadow-xl flex items-center justify-center font-bold text-xs border border-[#cbd5e1]">
                      ⇄
                    </div>
                  </div>

                  {/* Floating Labels */}
                  <div className="absolute top-3 left-3 bg-[#0f172a]/80 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-semibold border border-white/10 z-10">
                    Original Satellite Image
                  </div>
                  <div className="absolute top-3 right-3 bg-[#134e4a]/90 backdrop-blur-xs text-white px-2.5 py-1 rounded text-[11px] font-semibold border border-[#89f5e7]/30 z-10">
                    AI U-Net Segmentation Result
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-mono z-10">
                    Drag or hover to compare (Position: {Math.round(sliderPosition)}%)
                  </div>
                </div>

                {/* Slider Input Fallback for Accessibility */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs text-[#64748b] font-medium">Original</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="flex-1 accent-[#134e4a] cursor-pointer"
                  />
                  <span className="text-xs text-[#64748b] font-medium">AI Mask</span>
                </div>
              </div>

              {/* Color Coding Legend & Explanation (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#0f172a]">
                    Pixel-Level Classification Key
                  </h3>
                  <p className="text-xs text-[#64748b] mt-1">
                    Multi-spectral band reflection trained to detect river boundaries and human interventions.
                  </p>
                </div>

                {/* 3 Color Badges */}
                <div className="space-y-3">
                  <div className="p-3.5 bg-[#f0f9ff] border border-[#bae6fd] rounded-lg flex items-start gap-3">
                    <span className="w-5 h-5 rounded bg-[#0284c7] shrink-0 mt-0.5 border border-[#0369a1]"></span>
                    <div>
                      <div className="text-xs font-bold text-[#0369a1]">Blue: River / Water Channel</div>
                      <p className="text-[11px] text-[#0c4a6e] mt-0.5">
                        Active hydraulic waterway detected using Normalized Difference Water Index (NDWI) and SAR radar backscatter.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg flex items-start gap-3">
                    <span className="w-5 h-5 rounded bg-[#16a34a] shrink-0 mt-0.5 border border-[#15803d]"></span>
                    <div>
                      <div className="text-xs font-bold text-[#15803d]">Green: Vegetation & Natural Buffer</div>
                      <p className="text-[11px] text-[#14532d] mt-0.5">
                        Riparian forest, wetland marshes, and authorized greenbelt zones that naturally absorb seasonal high tides.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#fef2f2] border border-[#fecaca] rounded-lg flex items-start gap-3">
                    <span className="w-5 h-5 rounded bg-[#ef4444] shrink-0 mt-0.5 border border-[#b91c1c]"></span>
                    <div>
                      <div className="text-xs font-bold text-[#b91c1c]">Red: Unauthorized Encroachment</div>
                      <p className="text-[11px] text-[#7f1d1d] mt-0.5">
                        Illegal buildings, agricultural tilling inside the buffer line, artificial landfills, and heavy construction.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('satellite')}
                    className="w-full py-2.5 bg-[#134e4a] hover:bg-[#115e59] text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Launch Full Interactive U-Net Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SYSTEM FEATURES (4 ATTRACTIVE CARDS) */}
      <section className="py-20 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#134e4a]">
              Core Capabilities
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] tracking-tight">
              Integrated System Features
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b]">
              Four pillars engineered to protect vulnerable watersheds from unregulated expansion and flash inundation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 space-y-4 hover:border-[#134e4a] hover:bg-white transition-all duration-200 shadow-[0_1px_2px_rgba(15,23,42,0.03)] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-[#eff4ff] text-[#134e4a] flex items-center justify-center border border-[#dce9ff]">
                  <Satellite className="w-5 h-5 text-[#0d9488]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#0f172a]">
                  1. AI-Based River Encroachment Detection
                </h3>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Automated computer vision segmentation scanning satellite imagery to flag illegal constructions, narrowed channels, and agricultural intrusions across historical river boundaries.
                </p>
              </div>
              <button
                onClick={() => onNavigate('satellite')}
                className="text-xs font-bold text-[#134e4a] hover:underline flex items-center gap-1 pt-2"
              >
                <span>Satellite Segmentation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 space-y-4 hover:border-[#134e4a] hover:bg-white transition-all duration-200 shadow-[0_1px_2px_rgba(15,23,42,0.03)] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-[#eff4ff] text-[#134e4a] flex items-center justify-center border border-[#dce9ff]">
                  <Radio className="w-5 h-5 text-[#0d9488]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#0f172a]">
                  2. Real-Time IoT Water-Level Monitoring
                </h3>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Continuous hydrometric data collection via ultrasonic water-depth transducers and ESP32 edge microcontrollers logging water depth, rate-of-rise, and rainfall accumulation.
                </p>
              </div>
              <button
                onClick={() => onNavigate('sensors')}
                className="text-xs font-bold text-[#134e4a] hover:underline flex items-center gap-1 pt-2"
              >
                <span>View Live IoT Nodes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 space-y-4 hover:border-[#134e4a] hover:bg-white transition-all duration-200 shadow-[0_1px_2px_rgba(15,23,42,0.03)] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-[#eff4ff] text-[#134e4a] flex items-center justify-center border border-[#dce9ff]">
                  <AlertTriangle className="w-5 h-5 text-[#0d9488]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#0f172a]">
                  3. Flood Risk Assessment
                </h3>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Predictive mathematical modeling combining narrowed river carrying capacities with active upstream runoff rates to quantify immediate danger scores and population exposure.
                </p>
              </div>
              <button
                onClick={() => onNavigate('flood-risk')}
                className="text-xs font-bold text-[#134e4a] hover:underline flex items-center gap-1 pt-2"
              >
                <span>Assess Flood Hazards</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 space-y-4 hover:border-[#134e4a] hover:bg-white transition-all duration-200 shadow-[0_1px_2px_rgba(15,23,42,0.03)] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-[#eff4ff] text-[#134e4a] flex items-center justify-center border border-[#dce9ff]">
                  <Activity className="w-5 h-5 text-[#0d9488]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#0f172a]">
                  4. Alerts and Environmental Monitoring Dashboard
                </h3>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  Mission-critical control room interface for municipal authorities, disaster response teams, and environmental engineers to coordinate alerts and early evacuation dispatches.
                </p>
              </div>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-xs font-bold text-[#134e4a] hover:underline flex items-center gap-1 pt-2"
              >
                <span>Enter Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW THE SYSTEM WORKS (DUAL-CHANNEL WORKFLOW) */}
      <section className="py-20 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#134e4a]">
              Dual-Channel Architectural Pipeline
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] tracking-tight">
              How the System Works
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b]">
              Satellite image analysis and IoT sensor monitoring are independent, complementary input pipelines synthesized by the risk-assessment module.
            </p>
          </div>

          {/* Visual Workflow Diagram */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 lg:p-10 shadow-sm space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
              {/* Channel A: Computer Vision Flow */}
              <div className="p-6 rounded-xl bg-[#eff4ff]/60 border border-[#dce9ff] space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#dce9ff]">
                  <Satellite className="w-5 h-5 text-[#134e4a]" />
                  <span className="font-heading font-bold text-sm text-[#134e4a] uppercase tracking-wide">
                    Input Channel A: Remote Sensing AI
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border border-[#e2e8f0] flex items-center gap-3">
                    <span className="w-7 h-7 rounded bg-[#eff4ff] text-[#134e4a] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <div>
                      <strong className="text-xs text-[#0f172a] block">Satellite Image Acquisition</strong>
                      <span className="text-[11px] text-[#64748b]">Multispectral Sentinel-2 & Landsat raster feeds</span>
                    </div>
                  </div>

                  <div className="text-center text-[#134e4a] font-bold text-xs">↓</div>

                  <div className="p-3 bg-white rounded-lg border border-[#e2e8f0] flex items-center gap-3">
                    <span className="w-7 h-7 rounded bg-[#eff4ff] text-[#134e4a] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <div>
                      <strong className="text-xs text-[#0f172a] block">U-Net Segmentation Model</strong>
                      <span className="text-[11px] text-[#64748b]">Pixel classification of water, green buffer & structures</span>
                    </div>
                  </div>

                  <div className="text-center text-[#134e4a] font-bold text-xs">↓</div>

                  <div className="p-3 bg-white rounded-lg border border-[#e2e8f0] flex items-center gap-3">
                    <span className="w-7 h-7 rounded bg-[#eff4ff] text-[#134e4a] font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <div>
                      <strong className="text-xs text-[#0f172a] block">Encroachment Estimation</strong>
                      <span className="text-[11px] text-[#64748b]">Quantifies lost river cross-section & bottleneck width</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel B: IoT Telemetry Flow */}
              <div className="p-6 rounded-xl bg-[#ecfdf5]/60 border border-[#a7f3d0] space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#a7f3d0]">
                  <Radio className="w-5 h-5 text-[#047857]" />
                  <span className="font-heading font-bold text-sm text-[#047857] uppercase tracking-wide">
                    Input Channel B: Physical IoT Telemetry
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg border border-[#e2e8f0] flex items-center gap-3">
                    <span className="w-7 h-7 rounded bg-[#ecfdf5] text-[#047857] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <div>
                      <strong className="text-xs text-[#0f172a] block">Physical River Sensor Nodes</strong>
                      <span className="text-[11px] text-[#64748b]">Riverbank gauge stations and ultrasonic depth transducers</span>
                    </div>
                  </div>

                  <div className="text-center text-[#047857] font-bold text-xs">↓</div>

                  <div className="p-3 bg-white rounded-lg border border-[#e2e8f0] flex items-center gap-3">
                    <span className="w-7 h-7 rounded bg-[#ecfdf5] text-[#047857] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <div>
                      <strong className="text-xs text-[#0f172a] block">ESP32 Edge Microcontroller</strong>
                      <span className="text-[11px] text-[#64748b]">Analog/digital signal filtering and MQTT packet transmission</span>
                    </div>
                  </div>

                  <div className="text-center text-[#047857] font-bold text-xs">↓</div>

                  <div className="p-3 bg-white rounded-lg border border-[#e2e8f0] flex items-center gap-3">
                    <span className="w-7 h-7 rounded bg-[#ecfdf5] text-[#047857] font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <div>
                      <strong className="text-xs text-[#0f172a] block">Live Water-Level Data</strong>
                      <span className="text-[11px] text-[#64748b]">Real-time gauge elevation, delta/hour and rainfall accumulation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Convergence Node: Risk Assessment & Action */}
            <div className="p-6 bg-[#0f172a] text-white rounded-xl border border-[#334155] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#134e4a] text-[#89f5e7] rounded-lg">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      Convergence: Risk Assessment Engine → Dashboard & Alerts
                    </h3>
                    <p className="text-xs text-[#94a3b8]">
                      Both independent inputs correlate spatial channel narrowing with temporal water surges.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 bg-white text-[#0f172a] hover:bg-[#f1f5f9] text-xs font-bold rounded transition-colors whitespace-nowrap shadow-xs"
                >
                  View Active Alert Relays
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-[#cbd5e1]">
                <div className="p-3 bg-[#1e293b] rounded border border-[#334155]">
                  <strong className="text-[#89f5e7] block mb-1">1. Hydrodynamic Correlation</strong>
                  Narrowed cross-sections reduce discharge velocity thresholds.
                </div>
                <div className="p-3 bg-[#1e293b] rounded border border-[#334155]">
                  <strong className="text-[#89f5e7] block mb-1">2. Rapid Risk Categorization</strong>
                  Instantly scores flood hazard level into 4 actionable municipal tiers.
                </div>
                <div className="p-3 bg-[#1e293b] rounded border border-[#334155]">
                  <strong className="text-[#89f5e7] block mb-1">3. Automated Warning Relays</strong>
                  Notifies disaster response officers before water reaches residential levees.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RISK CATEGORIES (4 DISTINCT CARDS) */}
      <section className="py-20 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#134e4a]">
              Emergency Warning Spectrum
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0f172a] tracking-tight">
              Standardized Municipal Risk Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b]">
              Calibrated flood hazard thresholds enabling civil defense agencies to execute graduated response protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Risk Card 1: Low - Green */}
            <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl p-6 space-y-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] inline-block"></span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#047857] border border-[#a7f3d0]">
                    Score: 0 - 39
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#047857] mt-3">
                  Low Risk
                </h3>
                <p className="text-xs text-[#065f46] mt-2 leading-relaxed">
                  Natural riparian buffer intact. River stage within baseline limits. Flow velocity nominal with negligible inundation threat.
                </p>
              </div>

              <div className="pt-3 border-t border-[#a7f3d0]/80 text-[11px] text-[#047857] font-semibold">
                Action: Routine continuous sensor telemetry
              </div>
            </div>

            {/* Risk Card 2: Moderate - Yellow */}
            <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-6 space-y-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#f59e0b] inline-block"></span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#b45309] border border-[#fde68a]">
                    Score: 40 - 59
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#b45309] mt-3">
                  Moderate Risk
                </h3>
                <p className="text-xs text-[#92400e] mt-2 leading-relaxed">
                  Partial riverbank encroachment detected. Minor water-level increase from upstream runoff. Low-lying agricultural zones advised.
                </p>
              </div>

              <div className="pt-3 border-t border-[#fde68a]/80 text-[11px] text-[#b45309] font-semibold">
                Action: Issue advisory watch & calibrate IoT sensors
              </div>
            </div>

            {/* Risk Card 3: High - Orange */}
            <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-xl p-6 space-y-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#f97316] inline-block"></span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#c2410c] border border-[#fed7aa]">
                    Score: 60 - 79
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#c2410c] mt-3">
                  High Risk
                </h3>
                <p className="text-xs text-[#9a3412] mt-2 leading-relaxed">
                  Significant channel bottlenecking from illegal constructions. Gauge approaching Stage 2 action level. Residential access roads vulnerable.
                </p>
              </div>

              <div className="pt-3 border-t border-[#fed7aa]/80 text-[11px] text-[#c2410c] font-semibold">
                Action: Pre-stage emergency rescue & flood barriers
              </div>
            </div>

            {/* Risk Card 4: Critical - Red */}
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl p-6 space-y-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ef4444] animate-ping inline-block"></span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#b91c1c] border border-[#fecaca]">
                    Score: 80 - 100
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-[#b91c1c] mt-3">
                  Critical Risk
                </h3>
                <p className="text-xs text-[#7f1d1d] mt-2 leading-relaxed">
                  Catastrophic flood breach imminent. Critical infrastructure inundated. Severe channel constriction obstructing torrential discharge.
                </p>
              </div>

              <div className="pt-3 border-t border-[#fecaca]/80 text-[11px] text-[#b91c1c] font-semibold">
                Action: Trigger civil evacuation dispatch immediately
              </div>
            </div>
          </div>

          {/* Direct CTA Bar */}
          <div className="p-8 bg-[#134e4a] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl">
                Ready to explore the active municipal monitoring network?
              </h3>
              <p className="text-xs sm:text-sm text-[#b5ede7] mt-1">
                Access real-time stream gauges, satellite segmentation masks, and emergency action dossiers.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-5 py-2.5 bg-white text-[#134e4a] hover:bg-[#eff4ff] text-xs font-bold rounded transition-colors shadow-xs"
              >
                Open Mission Dashboard
              </button>
              <button
                onClick={onOpenLogin}
                className="px-4 py-2.5 bg-[#003633] text-white hover:bg-[#00201d] text-xs font-bold rounded transition-colors border border-[#316763]"
              >
                Agency Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
