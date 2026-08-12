export interface TelemetryPoint {
  date: string;
  ndvi: number; // Normalized Difference Vegetation Index (0.0 to 1.0)
  canopyDensity: number; // %
  biomass: number; // t/ha
  radarBackscatter: number; // dB
  soilMoisture: number; // %
  carbonFlux: number; // gC/m²/day
}

export interface VerificationStep {
  id: string;
  timestamp: string;
  title: string;
  source: 'Sentinel-2B Satellite' | 'Drone SAR LIDAR' | 'Canopy Mesh IoT' | 'Verra Registry Sync' | 'AI Risk Engine';
  status: 'VERIFIED' | 'WARNING' | 'PENDING';
  hash: string;
  description: string;
}

export interface SatelliteSnapshot {
  id: string;
  date: string;
  satellite: string;
  resolution: string;
  canopyDelta: string;
  imageUrl: string;
  ndviValue: number;
  isBaseline?: boolean;
}

export interface CarbonProject {
  id: string;
  name: string;
  location: string;
  country: string;
  coordinates?: [number, number]; // [lat, lng]
  latitude?: number;
  longitude?: number;
  region: 'S. America' | 'Africa' | 'SE Asia' | 'N. America';
  type: 'Reforestation' | 'Mangrove Restoration' | 'Avoided Deforestation' | 'Peatland Conservation';
  areaHectares: number;
  riskScore: number; // 0-100 (100 = cleanest/highest trust)
  trustStatus: 'VERIFIED' | 'ELEVATED RISK' | 'CRITICAL ANOMALY';
  lastScanDate: string;
  canopyChangeRate: string;
  carbonCreditsIssued: number;
  vintage: number;
  description: string;
  telemetryHistory: TelemetryPoint[];
  verificationLedger: VerificationStep[];
  satelliteSnapshots: SatelliteSnapshot[];
  sensorMeshNodes: number;
  droneSurveysCompleted: number;
  verraRegistryId?: string;
  goldStandardId?: string;
  claimStatement?: string;
}

export interface CarbonCredit {
  id: string; // e.g. CP-2026-AMZ-09412
  projectId: string;
  projectName: string;
  vintageYear: number;
  quantityTons: number;
  serialNumber: string;
  merkleRootHash: string;
  verificationScore: number;
  status: 'VERIFIED & AUDITED' | 'FLAGGED FOR REVIEW' | 'RETIRED';
  issueDate: string;
  owner: string;
  project: CarbonProject;
}

export interface AnomalyEvent {
  id: string;
  timestamp: string;
  projectId: string;
  projectName: string;
  type: 'Canopy Loss' | 'Thermal Spike' | 'Unregistered Clearing' | 'Radar Backscatter Shift' | 'IoT Mesh Disconnection';
  severity: 'low' | 'medium' | 'high';
  status: 'ACTIVE' | 'RESOLVED' | 'AUTO-CLEARED';
  details: string;
  coordinates: string;
}
