import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Filter, 
  Layers, 
  Info, 
  ShieldAlert, 
  Maximize2, 
  X,
  ExternalLink
} from 'lucide-react';
import { NavigationPage } from '../types/hydrology';
import { ENCROACHMENT_GALLERY, EncroachmentImageItem } from '../data/encroachmentGallery';

interface GalleryScreenProps {
  onNavigate: (page: NavigationPage) => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<EncroachmentImageItem | null>(null);

  const categories = [
    'All',
    'Residential Encroachment',
    'Agricultural Encroachment',
    'Riverbank Construction',
    'Waste Dumping',
    'Channel Narrowing',
    'Before & After'
  ];

  const filteredItems = selectedCategory === 'All'
    ? ENCROACHMENT_GALLERY
    : ENCROACHMENT_GALLERY.filter(item => item.category === selectedCategory);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb & Navigation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e2e8f0]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#64748b] mb-1">
              <button onClick={() => onNavigate('home')} className="hover:text-[#134e4a] flex items-center gap-1 font-medium">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
              <span>/</span>
              <span className="text-[#0f172a] font-semibold">Encroachment Archive</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0f172a]">
              River Encroachment Visual Archive & Field Records
            </h1>
            <p className="text-xs sm:text-sm text-[#64748b] mt-1">
              Photographic and aerial evidence tracking unauthorized structural incursions, river bottlenecking, and buffer zone degradations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('satellite')}
            className="px-4 py-2 bg-[#134e4a] hover:bg-[#115e59] text-white text-xs font-bold rounded shadow-xs transition-colors self-start md:self-auto"
          >
            Launch Satellite U-Net Viewer
          </button>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#134e4a] text-white font-semibold shadow-xs'
                  : 'bg-white text-[#475569] border border-[#e2e8f0] hover:bg-[#f1f5f9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-lg transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 bg-[#0f172a] overflow-hidden">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-[#134e4a] backdrop-blur-xs shadow-xs">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#89f5e7] shrink-0" />
                    <span className="text-[11px] truncate">{item.location}</span>
                  </div>
                  <span className="p-1 rounded bg-black/40 text-white/80 group-hover:text-white shrink-0">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-heading font-bold text-base text-[#0f172a] group-hover:text-[#134e4a] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-[#f1f5f9] text-[11px] text-[#475569] bg-[#f8fafc] p-2.5 rounded border border-[#e2e8f0]/80">
                  <strong className="text-[#134e4a] block font-semibold mb-0.5">Hydraulic Flood Impact:</strong>
                  <span>{item.floodImpact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/85 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#e2e8f0] animate-in fade-in zoom-in-95 duration-150">
            <div className="relative aspect-16/9 bg-[#0b1c30]">
              <img
                src={activeModalItem.imageSrc}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xs p-3 rounded-lg text-white text-xs flex items-center justify-between">
                <span>Location: <strong>{activeModalItem.location}</strong></span>
                <span className="font-mono text-[#89f5e7]">{activeModalItem.category}</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-xl text-[#0f172a]">
                  {activeModalItem.title}
                </h3>
                <span className="px-2.5 py-1 text-xs font-bold rounded bg-[#fef2f2] text-[#b91c1c] border border-[#fecaca]">
                  {activeModalItem.encroachmentSeverity} Risk
                </span>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                {activeModalItem.description}
              </p>
              <div className="p-3 bg-[#eff4ff] border border-[#dce9ff] rounded text-xs text-[#134e4a]">
                <strong>Hydraulic Vulnerability:</strong> {activeModalItem.floodImpact}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
