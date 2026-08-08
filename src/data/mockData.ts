import { CarbonProject, CarbonCredit, AnomalyEvent } from '@/types/carbon';

export const MOCK_PROJECTS: CarbonProject[] = [
  {
    id: 'CP-AMZ-8841',
    name: 'Alto Mayo Rainforest Reserve',
    location: 'San Martín Region',
    country: 'Peru',
    coordinates: [-6.052, -77.165],
    region: 'S. America',
    type: 'Avoided Deforestation',
    areaHectares: 182400,
    riskScore: 96,
    trustStatus: 'VERIFIED',
    lastScanDate: '14 mins ago (Sentinel-2B)',
    canopyChangeRate: '+1.4% Biomass Density',
    carbonCreditsIssued: 450000,
    vintage: 2025,
    description: 'High-density tropical cloud forest ecosystem under continuous satellite SAR, multispectral monitoring, and canopy IoT sensor protection.',
    sensorMeshNodes: 142,
    droneSurveysCompleted: 38,
    telemetryHistory: [
      { date: 'Jan 2025', ndvi: 0.81, canopyDensity: 91.2, biomass: 240, radarBackscatter: -8.4, soilMoisture: 68, carbonFlux: 4.2 },
      { date: 'Feb 2025', ndvi: 0.82, canopyDensity: 91.5, biomass: 242, radarBackscatter: -8.3, soilMoisture: 71, carbonFlux: 4.3 },
      { date: 'Mar 2025', ndvi: 0.84, canopyDensity: 92.1, biomass: 244, radarBackscatter: -8.1, soilMoisture: 74, carbonFlux: 4.5 },
      { date: 'Apr 2025', ndvi: 0.85, canopyDensity: 92.4, biomass: 246, radarBackscatter: -8.0, soilMoisture: 72, carbonFlux: 4.6 },
      { date: 'May 2025', ndvi: 0.86, canopyDensity: 93.0, biomass: 248, radarBackscatter: -7.8, soilMoisture: 70, carbonFlux: 4.7 },
      { date: 'Jun 2025', ndvi: 0.87, canopyDensity: 93.4, biomass: 251, radarBackscatter: -7.7, soilMoisture: 69, carbonFlux: 4.8 },
      { date: 'Jul 2025', ndvi: 0.88, canopyDensity: 94.2, biomass: 254, radarBackscatter: -7.5, soilMoisture: 67, carbonFlux: 5.0 },
    ],
    satelliteSnapshots: [
      {
        id: 'SAT-AMZ-01',
        date: '2024-08-15 (Baseline)',
        satellite: 'Sentinel-2A',
        resolution: '10m Multispectral',
        canopyDelta: 'Baseline Zero',
        imageUrl: 'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.81,
        isBaseline: true
      },
      {
        id: 'SAT-AMZ-02',
        date: '2025-02-10',
        satellite: 'Sentinel-2B',
        resolution: '10m Multispectral',
        canopyDelta: '+0.6% Growth',
        imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.84
      },
      {
        id: 'SAT-AMZ-03',
        date: '2025-08-01 (Current)',
        satellite: 'Sentinel-2B + PlanetScope',
        resolution: '3m Sub-meter',
        canopyDelta: '+1.4% Biomass Index',
        imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.88
      }
    ],
    verificationLedger: [
      {
        id: 'LED-001',
        timestamp: '2026-08-08T14:22:00Z',
        title: 'Real-Time Sentinel-2B Optical Pass',
        source: 'Sentinel-2B Satellite',
        status: 'VERIFIED',
        hash: '0x8f3c...91b4',
        description: 'Multispectral canopy index NDVI 0.88 verified across 182,400 hectares. Zero deforestation signatures.'
      },
      {
        id: 'LED-002',
        timestamp: '2026-08-08T09:15:00Z',
        title: 'Drone Autonomous SAR Lidar Sweep',
        source: 'Drone SAR LIDAR',
        status: 'VERIFIED',
        hash: '0x3a7e...44d9',
        description: 'Autonomous Lidar quadcopter scanned Sector 4B. 3D tree height model confirms understory growth.'
      },
      {
        id: 'LED-003',
        timestamp: '2026-08-07T18:40:00Z',
        title: 'Canopy Mesh Acoustic & Thermal Telemetry',
        source: 'Canopy Mesh IoT',
        status: 'VERIFIED',
        hash: '0x12c9...e8fa',
        description: '142 mesh solar nodes transmitted microclimate metrics. Ambient humidity 74%, zero thermal anomalies.'
      },
      {
        id: 'LED-004',
        timestamp: '2026-08-05T11:00:00Z',
        title: 'Verra Registry Cryptographic State Sync',
        source: 'Verra Registry Sync',
        status: 'VERIFIED',
        hash: '0x992b...11c2',
        description: 'Merkle root hash synchronized with Verra credit registry. Immutable state seal generated.'
      }
    ]
  },
  {
    id: 'CP-MNG-9912',
    name: 'Delta Blue Carbon Mangrove Belt',
    location: 'Indus River Delta',
    country: 'Pakistan',
    coordinates: [24.128, 67.452],
    region: 'SE Asia',
    type: 'Mangrove Restoration',
    areaHectares: 95000,
    riskScore: 94,
    trustStatus: 'VERIFIED',
    lastScanDate: '32 mins ago (Landsat 9)',
    canopyChangeRate: '+2.8% Blue Carbon Sequestration',
    carbonCreditsIssued: 310000,
    vintage: 2025,
    description: 'Coastal tidal wetland sequestration engine monitored via synthetic aperture radar (SAR) to penetrate cloud cover and track saline mudflat mangrove expansion.',
    sensorMeshNodes: 98,
    droneSurveysCompleted: 24,
    telemetryHistory: [
      { date: 'Jan 2025', ndvi: 0.68, canopyDensity: 74.0, biomass: 180, radarBackscatter: -12.1, soilMoisture: 92, carbonFlux: 6.1 },
      { date: 'Feb 2025', ndvi: 0.70, canopyDensity: 76.5, biomass: 185, radarBackscatter: -11.8, soilMoisture: 94, carbonFlux: 6.4 },
      { date: 'Mar 2025', ndvi: 0.72, canopyDensity: 78.0, biomass: 191, radarBackscatter: -11.5, soilMoisture: 91, carbonFlux: 6.8 },
      { date: 'Apr 2025', ndvi: 0.74, canopyDensity: 80.2, biomass: 198, radarBackscatter: -11.1, soilMoisture: 95, carbonFlux: 7.2 },
      { date: 'May 2025', ndvi: 0.76, canopyDensity: 82.5, biomass: 204, radarBackscatter: -10.8, soilMoisture: 93, carbonFlux: 7.5 },
      { date: 'Jun 2025', ndvi: 0.78, canopyDensity: 84.0, biomass: 210, radarBackscatter: -10.5, soilMoisture: 96, carbonFlux: 7.9 },
      { date: 'Jul 2025', ndvi: 0.80, canopyDensity: 86.8, biomass: 218, radarBackscatter: -10.2, soilMoisture: 95, carbonFlux: 8.3 },
    ],
    satelliteSnapshots: [
      {
        id: 'SAT-MNG-01',
        date: '2024-09-01 (Baseline)',
        satellite: 'Sentinel-1 SAR',
        resolution: '10m Radar',
        canopyDelta: 'Baseline',
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.68,
        isBaseline: true
      },
      {
        id: 'SAT-MNG-02',
        date: '2025-08-02 (Current)',
        satellite: 'Sentinel-1 SAR + PlanetScope',
        resolution: '3m Optical/Radar',
        canopyDelta: '+2.8% Sequestration',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.80
      }
    ],
    verificationLedger: [
      {
        id: 'LED-M01',
        timestamp: '2026-08-08T13:10:00Z',
        title: 'Synthetic Aperture Radar Tidal Penetration',
        source: 'Sentinel-2B Satellite',
        status: 'VERIFIED',
        hash: '0x4d21...77a8',
        description: 'Radar backscatter -10.2 dB confirms dense stilt root network growth in Sector 3 East.'
      }
    ]
  },
  {
    id: 'CP-KSG-4412',
    name: 'Kasigau Wildlife Corridor Protection',
    location: 'Taita-Taveta County',
    country: 'Kenya',
    coordinates: [-3.633, 38.65],
    region: 'Africa',
    type: 'Avoided Deforestation',
    areaHectares: 200000,
    riskScore: 89,
    trustStatus: 'VERIFIED',
    lastScanDate: '1 hour ago (PlanetScope)',
    canopyChangeRate: '-0.1% Natural Seasonal Dry',
    carbonCreditsIssued: 620000,
    vintage: 2024,
    description: 'Dryland acacia-commiphora forest sanctuary buffering biodiversity corridors between Tsavo East and West National Parks.',
    sensorMeshNodes: 110,
    droneSurveysCompleted: 45,
    telemetryHistory: [
      { date: 'Jan 2025', ndvi: 0.62, canopyDensity: 65.0, biomass: 110, radarBackscatter: -14.2, soilMoisture: 35, carbonFlux: 2.1 },
      { date: 'Feb 2025', ndvi: 0.60, canopyDensity: 64.2, biomass: 109, radarBackscatter: -14.5, soilMoisture: 32, carbonFlux: 2.0 },
      { date: 'Mar 2025', ndvi: 0.65, canopyDensity: 66.8, biomass: 112, radarBackscatter: -13.8, soilMoisture: 48, carbonFlux: 2.5 },
      { date: 'Apr 2025', ndvi: 0.71, canopyDensity: 70.1, biomass: 118, radarBackscatter: -13.0, soilMoisture: 58, carbonFlux: 3.2 },
      { date: 'May 2025', ndvi: 0.68, canopyDensity: 68.5, biomass: 116, radarBackscatter: -13.4, soilMoisture: 44, carbonFlux: 2.8 },
      { date: 'Jun 2025', ndvi: 0.64, canopyDensity: 65.9, biomass: 113, radarBackscatter: -14.0, soilMoisture: 38, carbonFlux: 2.3 },
      { date: 'Jul 2025', ndvi: 0.63, canopyDensity: 65.1, biomass: 112, radarBackscatter: -14.1, soilMoisture: 34, carbonFlux: 2.2 },
    ],
    satelliteSnapshots: [
      {
        id: 'SAT-KSG-01',
        date: '2024-07-20 (Baseline)',
        satellite: 'PlanetScope',
        resolution: '3m Optical',
        canopyDelta: 'Baseline',
        imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.62,
        isBaseline: true
      },
      {
        id: 'SAT-KSG-02',
        date: '2025-07-28 (Current)',
        satellite: 'PlanetScope Sub-meter',
        resolution: '3m Optical',
        canopyDelta: 'Stable (-0.1% Dry)',
        imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.63
      }
    ],
    verificationLedger: [
      {
        id: 'LED-K01',
        timestamp: '2026-08-08T11:45:00Z',
        title: 'Thermal Charcoal Detection Sweep',
        source: 'AI Risk Engine',
        status: 'VERIFIED',
        hash: '0x71e0...33b9',
        description: 'Zero thermal kiln anomalies detected across 200,000 ha corridor boundary.'
      }
    ]
  },
  {
    id: 'CP-RMB-3011',
    name: 'Rimba Raya Peatland Sanctuary',
    location: 'Central Kalimantan',
    country: 'Indonesia',
    coordinates: [-2.852, 112.35],
    region: 'SE Asia',
    type: 'Peatland Conservation',
    areaHectares: 64000,
    riskScore: 68,
    trustStatus: 'ELEVATED RISK',
    lastScanDate: '42 mins ago (MODIS Fire Stream)',
    canopyChangeRate: '-1.8% Sector 7 Small Clearing',
    carbonCreditsIssued: 520000,
    vintage: 2024,
    description: 'Critical tropical peat swamp forest habitat protecting wild orangutan populations. Currently flagged due to localized peripheral agricultural clearing.',
    sensorMeshNodes: 76,
    droneSurveysCompleted: 19,
    telemetryHistory: [
      { date: 'Jan 2025', ndvi: 0.85, canopyDensity: 88.0, biomass: 320, radarBackscatter: -6.5, soilMoisture: 88, carbonFlux: 5.2 },
      { date: 'Feb 2025', ndvi: 0.85, canopyDensity: 88.1, biomass: 321, radarBackscatter: -6.4, soilMoisture: 87, carbonFlux: 5.2 },
      { date: 'Mar 2025', ndvi: 0.84, canopyDensity: 87.5, biomass: 319, radarBackscatter: -6.6, soilMoisture: 85, carbonFlux: 5.0 },
      { date: 'Apr 2025', ndvi: 0.82, canopyDensity: 85.0, biomass: 312, radarBackscatter: -7.1, soilMoisture: 79, carbonFlux: 4.4 },
      { date: 'May 2025', ndvi: 0.80, canopyDensity: 83.2, biomass: 306, radarBackscatter: -7.5, soilMoisture: 74, carbonFlux: 3.9 },
      { date: 'Jun 2025', ndvi: 0.79, canopyDensity: 82.0, biomass: 301, radarBackscatter: -7.8, soilMoisture: 71, carbonFlux: 3.6 },
      { date: 'Jul 2025', ndvi: 0.78, canopyDensity: 81.1, biomass: 298, radarBackscatter: -8.0, soilMoisture: 69, carbonFlux: 3.4 },
    ],
    satelliteSnapshots: [
      {
        id: 'SAT-RMB-01',
        date: '2024-06-10 (Baseline)',
        satellite: 'Sentinel-2A',
        resolution: '10m Multispectral',
        canopyDelta: 'Baseline',
        imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.85,
        isBaseline: true
      },
      {
        id: 'SAT-RMB-02',
        date: '2025-08-07 (Current Flagged)',
        satellite: 'PlanetScope High-Res',
        resolution: '3m Resolution',
        canopyDelta: '-1.8% Sector 7 Clearing',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.78
      }
    ],
    verificationLedger: [
      {
        id: 'LED-R01',
        timestamp: '2026-08-08T08:20:00Z',
        title: 'Thermal Spike & Edge Degradation Flagged',
        source: 'AI Risk Engine',
        status: 'WARNING',
        hash: '0xe41b...8820',
        description: 'Sector 7 NW boundary registered a 3.4 hectare canopy loss signature. Risk engine lowered trust score to 68/100.'
      }
    ]
  },
  {
    id: 'CP-CDA-1102',
    name: 'Cordillera Azul National Park',
    location: 'Loreto & San Martín',
    country: 'Peru',
    coordinates: [-7.521, -75.984],
    region: 'S. America',
    type: 'Avoided Deforestation',
    areaHectares: 1350000,
    riskScore: 98,
    trustStatus: 'VERIFIED',
    lastScanDate: '5 mins ago (Sentinel-2B)',
    canopyChangeRate: '+0.4% Canopy Intactness',
    carbonCreditsIssued: 1200000,
    vintage: 2025,
    description: 'Massive mega-biodiversity mountain ridge rainforest barrier preventing illegal road access into pristine Amazon headwaters.',
    sensorMeshNodes: 210,
    droneSurveysCompleted: 64,
    telemetryHistory: [
      { date: 'Jan 2025', ndvi: 0.89, canopyDensity: 96.0, biomass: 340, radarBackscatter: -6.0, soilMoisture: 82, carbonFlux: 5.8 },
      { date: 'Feb 2025', ndvi: 0.89, canopyDensity: 96.1, biomass: 341, radarBackscatter: -5.9, soilMoisture: 84, carbonFlux: 5.9 },
      { date: 'Mar 2025', ndvi: 0.90, canopyDensity: 96.5, biomass: 343, radarBackscatter: -5.8, soilMoisture: 86, carbonFlux: 6.0 },
      { date: 'Apr 2025', ndvi: 0.91, canopyDensity: 97.0, biomass: 345, radarBackscatter: -5.7, soilMoisture: 85, carbonFlux: 6.1 },
      { date: 'May 2025', ndvi: 0.91, canopyDensity: 97.2, biomass: 346, radarBackscatter: -5.6, soilMoisture: 83, carbonFlux: 6.2 },
      { date: 'Jun 2025', ndvi: 0.92, canopyDensity: 97.5, biomass: 349, radarBackscatter: -5.5, soilMoisture: 81, carbonFlux: 6.3 },
      { date: 'Jul 2025', ndvi: 0.93, canopyDensity: 97.9, biomass: 352, radarBackscatter: -5.4, soilMoisture: 80, carbonFlux: 6.5 },
    ],
    satelliteSnapshots: [
      {
        id: 'SAT-CDA-01',
        date: '2024-08-01 (Baseline)',
        satellite: 'Sentinel-2A',
        resolution: '10m Optical',
        canopyDelta: 'Baseline Zero',
        imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.89,
        isBaseline: true
      },
      {
        id: 'SAT-CDA-02',
        date: '2025-08-08 (Current)',
        satellite: 'Sentinel-2B Ultra',
        resolution: '3m Resolution',
        canopyDelta: '+0.4% Density',
        imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.93
      }
    ],
    verificationLedger: [
      {
        id: 'LED-CD01',
        timestamp: '2026-08-08T15:30:00Z',
        title: 'Continuous High-Resolution Satellite Integrity Audit',
        source: 'Sentinel-2B Satellite',
        status: 'VERIFIED',
        hash: '0x99a1...bb44',
        description: '1.35 million hectares verified intact. Highest stability score in South American portfolio.'
      }
    ]
  },
  {
    id: 'CP-MND-7701',
    name: 'Mai Ndombe REDD+ Forest',
    location: 'Mai-Ndombe Province',
    country: 'DR Congo',
    coordinates: [-1.912, 18.283],
    region: 'Africa',
    type: 'Avoided Deforestation',
    areaHectares: 248000,
    riskScore: 92,
    trustStatus: 'VERIFIED',
    lastScanDate: '18 mins ago (Sentinel-1 SAR)',
    canopyChangeRate: '+0.9% Canopy Density',
    carbonCreditsIssued: 780000,
    vintage: 2025,
    description: 'Congo Basin primary rainforest protection protecting forest elephant habitat and dense peatland carbon stores.',
    sensorMeshNodes: 130,
    droneSurveysCompleted: 31,
    telemetryHistory: [
      { date: 'Jan 2025', ndvi: 0.84, canopyDensity: 90.1, biomass: 290, radarBackscatter: -7.2, soilMoisture: 78, carbonFlux: 4.8 },
      { date: 'Feb 2025', ndvi: 0.84, canopyDensity: 90.2, biomass: 291, radarBackscatter: -7.1, soilMoisture: 79, carbonFlux: 4.8 },
      { date: 'Mar 2025', ndvi: 0.85, canopyDensity: 90.8, biomass: 293, radarBackscatter: -7.0, soilMoisture: 81, carbonFlux: 5.0 },
      { date: 'Apr 2025', ndvi: 0.86, canopyDensity: 91.4, biomass: 296, radarBackscatter: -6.8, soilMoisture: 82, carbonFlux: 5.2 },
      { date: 'May 2025', ndvi: 0.87, canopyDensity: 92.0, biomass: 299, radarBackscatter: -6.7, soilMoisture: 80, carbonFlux: 5.4 },
      { date: 'Jun 2025', ndvi: 0.88, canopyDensity: 92.5, biomass: 302, radarBackscatter: -6.5, soilMoisture: 79, carbonFlux: 5.6 },
      { date: 'Jul 2025', ndvi: 0.89, canopyDensity: 93.1, biomass: 306, radarBackscatter: -6.4, soilMoisture: 77, carbonFlux: 5.8 },
    ],
    satelliteSnapshots: [
      {
        id: 'SAT-MND-01',
        date: '2024-08-10 (Baseline)',
        satellite: 'Sentinel-1 SAR',
        resolution: '10m Radar',
        canopyDelta: 'Baseline',
        imageUrl: 'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.84,
        isBaseline: true
      },
      {
        id: 'SAT-MND-02',
        date: '2025-08-05 (Current)',
        satellite: 'Sentinel-1 SAR + PlanetScope',
        resolution: '3m Radar',
        canopyDelta: '+0.9% Biomass',
        imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
        ndviValue: 0.89
      }
    ],
    verificationLedger: [
      {
        id: 'LED-MND1',
        timestamp: '2026-08-08T12:00:00Z',
        title: 'Congo Basin SAR Cloud Penetration Audit',
        source: 'Sentinel-2B Satellite',
        status: 'VERIFIED',
        hash: '0x88c2...11d0',
        description: 'Persistent cloud cover bypassed using C-band synthetic aperture radar. 248,000 ha intact.'
      }
    ]
  }
];

export const FEATURED_CREDIT: CarbonCredit = {
  id: 'CP-2026-AMZ-09412',
  projectId: 'CP-AMZ-8841',
  projectName: 'Alto Mayo Rainforest Reserve',
  vintageYear: 2025,
  quantityTons: 10000,
  serialNumber: 'VCS-994-2025-AMZ-009412-019412',
  merkleRootHash: '0x8f3c71a92e4b017f8d55c91b4028312c98a5e1104728abf942716492003c411b',
  verificationScore: 96,
  status: 'VERIFIED & AUDITED',
  issueDate: 'October 14, 2025',
  owner: 'NatureCorp ESG Global Fund',
  project: MOCK_PROJECTS[0]
};

export const MOCK_ANOMALIES: AnomalyEvent[] = [
  {
    id: 'ANO-8849',
    timestamp: '12 mins ago',
    projectId: 'CP-RMB-3011',
    projectName: 'Rimba Raya Peatland Sanctuary',
    type: 'Canopy Loss',
    severity: 'high',
    status: 'ACTIVE',
    details: 'Localized 3.4 hectare canopy depression detected in NW Sector 7 via PlanetScope 3m optical feed.',
    coordinates: '2°51\'07"S 112°21\'00"E'
  },
  {
    id: 'ANO-8848',
    timestamp: '45 mins ago',
    projectId: 'CP-KSG-4412',
    projectName: 'Kasigau Wildlife Corridor Protection',
    type: 'Thermal Spike',
    severity: 'medium',
    status: 'AUTO-CLEARED',
    details: 'MODIS thermal anomaly flagged near eastern boundary; auto-resolved as agricultural cloud shadow artifact.',
    coordinates: '3°37\'58"S 38°39\'00"E'
  },
  {
    id: 'ANO-8847',
    timestamp: '2 hours ago',
    projectId: 'CP-AMZ-8841',
    projectName: 'Alto Mayo Rainforest Reserve',
    type: 'Radar Backscatter Shift',
    severity: 'low',
    status: 'RESOLVED',
    details: 'Minor SAR signal dip due to heavy localized precipitation; cross-validated against ground station humidity mesh.',
    coordinates: '6°03\'07"S 77°09\'54"W'
  },
  {
    id: 'ANO-8846',
    timestamp: '4 hours ago',
    projectId: 'CP-MNG-9912',
    projectName: 'Delta Blue Carbon Mangrove Belt',
    type: 'IoT Mesh Disconnection',
    severity: 'low',
    status: 'RESOLVED',
    details: 'Node #42 re-established solar power link following tidal surge high-water event.',
    coordinates: '24°07\'40"N 67°27\'07"E'
  },
  {
    id: 'ANO-8845',
    timestamp: '7 hours ago',
    projectId: 'CP-MND-7701',
    projectName: 'Mai Ndombe REDD+ Forest',
    type: 'Unregistered Clearing',
    severity: 'medium',
    status: 'AUTO-CLEARED',
    details: 'Transient canopy gap resolved as seasonal deciduous leaf drop in riverine transition zone.',
    coordinates: '1°54\'43"S 18°16\'58"E'
  }
];
