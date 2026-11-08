import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { AboutModal } from './components/AboutModal';
import { HomeScreen } from './screens/HomeScreen';
import { GalleryScreen } from './screens/GalleryScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { SatelliteScreen } from './screens/SatelliteScreen';
import { SensorScreen } from './screens/SensorScreen';
import { RiverScreen } from './screens/RiverScreen';
import { FloodRiskScreen } from './screens/FloodRiskScreen';

import { 
  DEMO_RIVER_BASINS, 
  DEMO_SENSOR_NODES, 
  DEMO_SATELLITE_PASSES, 
  DEMO_FLOOD_ZONES 
} from './data/mockHydrology';
import { NavigationPage, RiverBasinMetric, SensorTelemetryNode } from './types/hydrology';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [basins, setBasins] = useState<RiverBasinMetric[]>(DEMO_RIVER_BASINS);
  const [sensors, setSensors] = useState<SensorTelemetryNode[]>(DEMO_SENSOR_NODES);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [aiBriefing, setAiBriefing] = useState<string>('');
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);

  // Poll telemetry simulation
  const handlePollTelemetry = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSensors(prev => prev.map(s => {
        const delta = (Math.random() * 0.1 - 0.04);
        const newLevel = Math.max(1.0, +(s.waterLevelM + delta).toFixed(2));
        return {
          ...s,
          waterLevelM: newLevel,
          waterLevelDeltaPerHour: +(s.waterLevelDeltaPerHour + delta * 0.5).toFixed(2),
          lastUpdated: 'Just now'
        };
      }));
      setIsRefreshing(false);
    }, 600);
  };

  // Trigger Simulated Rain Flash Surge on an individual sensor node
  const handleTriggerSimulatedSurge = (sensorId: string) => {
    setSensors(prev => prev.map(s => {
      if (s.id === sensorId) {
        const surgeLevel = +(s.waterLevelM + 0.65).toFixed(2);
        return {
          ...s,
          waterLevelM: surgeLevel,
          waterLevelDeltaPerHour: +0.65,
          rainfallMmHr: +(s.rainfallMmHr + 24.5).toFixed(1),
          status: 'critical',
          lastUpdated: 'Just now (Surge Detected)',
          history: [
            ...s.history.slice(1),
            { timestamp: 'NOW', level: surgeLevel, velocity: 3.4, flow: 3600 }
          ]
        };
      }
      return s;
    }));
  };

  // Call Server-side Gemini AI for Hydro-Meteorological Briefing
  const handleRunAiSummary = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/hydro/ai-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          basins,
          sensors,
          zones: DEMO_FLOOD_ZONES
        })
      });
      const data = await res.json();
      if (data.briefing) {
        setAiBriefing(data.briefing);
      }
    } catch (err) {
      console.error(err);
      setAiBriefing(
        `[SYNTHETIC BRIEFING · SIMULATION ACTIVE]\n` +
        `• Upper Columbia and Santiam channels show elevated velocity (+14.2%).\n` +
        `• U-Net multi-spectral models detect 4,210 ha of flooded area.\n` +
        `• Critical Stage Advisory remains active across 2 drainage sectors.\n` +
        `• Recommended Action: Pre-position high-water rescue equipment.`
      );
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const criticalCount = DEMO_FLOOD_ZONES.filter(z => z.riskLevel === 'critical' || z.riskLevel === 'high').length;

  const isPublicWebPage = currentPage === 'home' || currentPage === 'gallery' || currentPage === 'about';

  // Page title mapping for dashboard views
  const dashboardTitles: Partial<Record<NavigationPage, { title: string; subtitle: string }>> = {
    'dashboard': {
      title: 'Hydrologic Intelligence Dashboard',
      subtitle: 'Real-time telemetry aggregation, basin risk classification, and hydrograph curves'
    },
    'satellite': {
      title: 'Satellite Image Analysis',
      subtitle: 'Multi-spectral U-Net water segmentation, flood inundation masks, and spectral indices'
    },
    'sensors': {
      title: 'Live Sensor Monitoring',
      subtitle: 'Edge ESP32 transducer array, acoustic river depth, Doppler flow, and tipping bucket telemetry'
    },
    'river': {
      title: 'River Monitoring',
      subtitle: 'Stream gauge reach cross-sections, discharge velocity, and hydro-GIS routing'
    },
    'flood-risk': {
      title: 'Flood Risk Assessment',
      subtitle: 'Civil evacuation readiness, critical infrastructure hazard exposure, and municipal warning dispatch'
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0b1c30] flex flex-col">
      {/* Top Universal Navbar for Website Experience */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Conditional Layout: Full Website Page vs Mission Console Workspace */}
      {isPublicWebPage ? (
        <div className="flex-1 flex flex-col">
          {currentPage === 'home' && (
            <HomeScreen
              onNavigate={(page) => setCurrentPage(page)}
              onOpenLogin={() => setIsLoginOpen(true)}
            />
          )}

          {currentPage === 'gallery' && (
            <GalleryScreen
              onNavigate={(page) => setCurrentPage(page)}
            />
          )}

          {currentPage === 'about' && (
            <HomeScreen
              onNavigate={(page) => setCurrentPage(page)}
              onOpenLogin={() => setIsLoginOpen(true)}
            />
          )}

          <Footer
            onNavigate={(page) => setCurrentPage(page)}
            onOpenAbout={() => setIsAboutOpen(true)}
          />
        </div>
      ) : (
        /* Mission Control Workroom with Sidebar */
        <div className="flex-1 flex overflow-hidden">
          <Sidebar
            currentPage={currentPage}
            onNavigate={(page) => setCurrentPage(page)}
            criticalCount={criticalCount}
          />

          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            <Header
              title={dashboardTitles[currentPage]?.title || 'Mission Operations'}
              subtitle={dashboardTitles[currentPage]?.subtitle || 'Hydrometric telemetry feeds'}
              onRefresh={handlePollTelemetry}
              isRefreshing={isRefreshing}
            />

            <main className="flex-1 pb-12">
              {currentPage === 'dashboard' && (
                <DashboardScreen
                  basins={basins}
                  sensors={sensors}
                  passes={DEMO_SATELLITE_PASSES}
                  zones={DEMO_FLOOD_ZONES}
                  onNavigate={(page) => setCurrentPage(page)}
                  onRunAiSummary={handleRunAiSummary}
                  aiBriefing={aiBriefing}
                  isGeneratingAi={isGeneratingAi}
                />
              )}

              {currentPage === 'satellite' && (
                <SatelliteScreen
                  passes={DEMO_SATELLITE_PASSES}
                />
              )}

              {currentPage === 'sensors' && (
                <SensorScreen
                  sensors={sensors}
                  onTriggerSimulatedSurge={handleTriggerSimulatedSurge}
                />
              )}

              {currentPage === 'river' && (
                <RiverScreen
                  basins={basins}
                />
              )}

              {currentPage === 'flood-risk' && (
                <FloodRiskScreen
                  zones={DEMO_FLOOD_ZONES}
                />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccessLogin={(user) => setAuthenticatedUser(user)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
