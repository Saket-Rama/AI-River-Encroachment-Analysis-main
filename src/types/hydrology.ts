// RIVERGUARD AI - Types and Telemetry Schemas

export type NavigationPage = 
  | 'home'
  | 'gallery'
  | 'dashboard'
  | 'satellite'
  | 'sensors'
  | 'river'
  | 'flood-risk'
  | 'about';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface RiverBasinMetric {
  id: string;
  name: string;
  basin: string;
  region: string;
  flowRateCfs: number;
  flowRateTrend: 'rising' | 'steady' | 'falling';
  gaugeHeightFt: number;
  gaugeHeightBaselineFt: number;
  crestThresholdFt: number;
  crestProbabilityPct: number;
  dischargeM3s: number;
  turbidityNtu: number;
  waterTempC: number;
  status: RiskLevel;
  lastPing: string;
  coordinates: [number, number];
}

export interface SensorTelemetryNode {
  id: string;
  name: string;
  hardwareType: 'ESP32 Hydro-Node (Simulated)' | 'USGS Real-Time Gauge' | 'Doppler Radar Relay';
  location: string;
  waterLevelM: number;
  waterLevelDeltaPerHour: number;
  rainfallMmHr: number;
  flowVelocityMs: number;
  soilMoisturePct: number;
  batteryPct: number;
  signalStrengthDbm: number;
  isOnline: boolean;
  isSimulatedDemo: boolean;
  status: RiskLevel;
  lastUpdated: string;
  history: {
    timestamp: string;
    level: number;
    velocity: number;
    flow: number;
  }[];
}

export interface SatellitePassAnalysis {
  id: string;
  satellite: 'Sentinel-2 Multispectral' | 'Landsat 9 OLI-2' | 'Sentinel-1 SAR Radar';
  captureDate: string;
  resolution: string;
  coverageAreaKm2: number;
  waterSurfaceExpansionPct: number;
  inundationAreaHa: number;
  confidenceScore: number;
  unetModelVersion: 'U-Net HydroSeg v3.2 (Awaiting Live Weights)' | 'Simulated Demonstration Weights';
  isModelSimulated: boolean;
  ndwiIndex: number;
  cloudCoverPct: number;
  floodAnomalyDetected: boolean;
  zone: string;
}

export interface FloodRiskZone {
  id: string;
  zoneName: string;
  watershed: string;
  populationAtRisk: number;
  criticalInfrastructures: string[];
  currentStageFt: number;
  floodStageFt: number;
  majorFloodStageFt: number;
  projectedPeakHours: number;
  evacuationReadiness: 'Nominal' | 'Advisory Watch' | 'Evacuation Preparedness' | 'Mandatory Evacuation Triggered';
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  precipForecast72hMm: number;
}
