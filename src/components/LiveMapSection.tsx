'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_PROJECTS } from '@/data/mockData';
import { CarbonProject } from '@/types/carbon';
import { ShieldCheck, AlertTriangle, Radar, Eye, Layers, Compass, ExternalLink } from 'lucide-react';

interface LiveMapSectionProps {
  onSelectProjectForPassport: (project: CarbonProject) => void;
}

export const LiveMapSection: React.FC<LiveMapSectionProps> = ({ onSelectProjectForPassport }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<CarbonProject>(MOCK_PROJECTS[0]);
  const [hoveredProject, setHoveredProject] = useState<CarbonProject | null>(null);
  const [isSweeping, setIsSweeping] = useState<boolean>(true);
  const [sweepAngle, setSweepAngle] = useState<number>(0);

  // Rotate satellite sweep radar
  useEffect(() => {
    if (!isSweeping) return;
    const interval = setInterval(() => {
      setSweepAngle((prev) => (prev + 1.5) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isSweeping]);

  const filteredProjects = MOCK_PROJECTS.filter((p) => {
    if (selectedRegion !== 'All' && p.region !== selectedRegion) return false;
    if (selectedRisk === 'High Trust' && p.trustStatus !== 'VERIFIED') return false;
    if (selectedRisk === 'Flagged' && p.trustStatus === 'VERIFIED') return false;
    return true;
  });

  // Convert lat/lng to percentage coordinates on world SVG grid
  const getCoordinates = (project: CarbonProject): { x: number; y: number } => {
    const lat = project.coordinates?.[0] ?? project.latitude ?? 0;
    const lng = project.coordinates?.[1] ?? project.longitude ?? 0;
    // Map lng (-180 to 180) -> (0 to 100)
    const x = ((lng + 180) / 360) * 100;
    // Map lat (-90 to 90) -> (100 to 0)
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <section id="map-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Section Title & Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAF3EE]/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[#2FE8B0] font-mono text-xs mb-2">
            <Radar className="w-4 h-4 animate-spin-slow" />
            <span>GLOBAL CONTINUOUS SATELLITE MONITORING GRID</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-[#EAF3EE]">
            Live Mission Control Map
          </h2>
          <p className="text-sm text-[#8FA79A] mt-1">
            Real-time multispectral satellite nodes, radar sweeps, and autonomous canopy risk telemetry.
          </p>
        </div>

        {/* Filter Pill Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Region Filters */}
          <div className="flex items-center p-1 rounded-xl bg-[#0F1C15] border border-[#EAF3EE]/10 text-xs">
            <span className="px-2 text-[#5C7268] font-mono">Region:</span>
            {['All', 'S. America', 'Africa', 'SE Asia'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedRegion === region
                    ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/30 glow-teal-sm'
                    : 'text-[#8FA79A] hover:text-[#EAF3EE]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Risk Filters */}
          <div className="flex items-center p-1 rounded-xl bg-[#0F1C15] border border-[#EAF3EE]/10 text-xs">
            <span className="px-2 text-[#5C7268] font-mono">Status:</span>
            {['All', 'High Trust', 'Flagged'].map((risk) => (
              <button
                key={risk}
                onClick={() => setSelectedRisk(risk)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedRisk === risk
                    ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/30 glow-teal-sm'
                    : 'text-[#8FA79A] hover:text-[#EAF3EE]'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>

          {/* Sweep Toggle */}
          <button
            onClick={() => setIsSweeping(!isSweeping)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-mono border ${
              isSweeping
                ? 'bg-[#142A1F] text-[#2FE8B0] border-[#2FE8B0]/40'
                : 'bg-[#0F1C15] text-[#5C7268] border-[#EAF3EE]/10'
            }`}
          >
            <Compass className={`w-3.5 h-3.5 ${isSweeping ? 'animate-spin' : ''}`} />
            <span>{isSweeping ? 'SWEEP ACTIVE' : 'SWEEP PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative w-full h-[520px] rounded-3xl bg-[#0F1C15] border border-[#EAF3EE]/12 overflow-hidden shadow-2xl">
        
        {/* World Map SVG Background Overlay */}
        <div className="absolute inset-0 opacity-25">
          <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none">
            {/* Latitude Grid lines */}
            {[100, 200, 300, 400].map((y) => (
              <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#1B7A5C" strokeDasharray="4 4" strokeWidth="0.5" />
            ))}
            {/* Longitude Grid lines */}
            {[200, 400, 600, 800].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="#1B7A5C" strokeDasharray="4 4" strokeWidth="0.5" />
            ))}
            {/* Continents Outline Path (Stylized Dark Vectors) */}
            <path
              d="M150 120 Q 220 80, 280 140 T 350 250 T 250 380 T 150 300 Z M 480 180 Q 550 140, 620 220 T 600 380 T 450 300 Z M 720 180 Q 820 140, 900 240 T 820 400 T 700 320 Z"
              fill="#142A1F"
              stroke="#2FE8B0"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
          </svg>
        </div>

        {/* Rotating Radar Sweep Cone */}
        {isSweeping && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `conic-gradient(from ${sweepAngle}deg at 50% 50%, rgba(47, 232, 176, 0.12) 0deg, rgba(47, 232, 176, 0.02) 20deg, transparent 40deg)`,
            }}
          />
        )}

        {/* Project Glowing Nodes */}
        {filteredProjects.map((project) => {
          const { x, y } = getCoordinates(project);
          const isSelected = selectedProject.id === project.id;
          const isFlagged = project.trustStatus !== 'VERIFIED';

          return (
            <div
              key={project.id}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Outer Pulsing Beacon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-125 ${
                  isFlagged
                    ? 'bg-[#E8894F]/20 border border-[#E8894F]/50 animate-ping'
                    : 'bg-[#2FE8B0]/20 border border-[#2FE8B0]/50 animate-pulse'
                }`}
              />

              {/* Inner Node Dot */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center ${
                  isFlagged
                    ? 'bg-[#E8894F] glow-amber'
                    : isSelected
                    ? 'bg-[#2FE8B0] glow-teal ring-4 ring-[#2FE8B0]/30'
                    : 'bg-[#2FE8B0] glow-teal-sm'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0A120E]" />
              </div>

              {/* Project Label Tag */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="px-2 py-0.5 rounded bg-[#0A120E]/90 border border-[#EAF3EE]/15 text-[10px] font-mono text-[#EAF3EE]">
                  {project.name.split(' ')[0]} ({project.riskScore})
                </span>
              </div>
            </div>
          );
        })}

        {/* Selected Project Inspector Card Overlay */}
        {selectedProject && (
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-6 rounded-2xl bg-[#0F1C15]/95 border border-[#2FE8B0]/30 backdrop-blur-md z-30 shadow-2xl space-y-4">
            
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-[#142A1F] text-[#2FE8B0] font-mono text-[10px] uppercase tracking-wider border border-[#2FE8B0]/20">
                    ID: {selectedProject.id}
                  </span>
                  <span className="text-xs font-mono text-[#8FA79A]">{selectedProject.country}</span>
                </div>
                <h3 className="text-lg font-space font-bold text-[#EAF3EE] mt-1">
                  {selectedProject.name}
                </h3>
              </div>

              {/* Trust Status Badge */}
              <div
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                  selectedProject.trustStatus === 'VERIFIED'
                    ? 'bg-[#E8B74F]/15 text-[#E8B74F] border border-[#E8B74F]/40'
                    : 'bg-[#E8894F]/15 text-[#E8894F] border border-[#E8894F]/40 animate-pulse'
                }`}
              >
                {selectedProject.trustStatus === 'VERIFIED' ? (
                  <ShieldCheck className="w-3.5 h-3.5" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" />
                )}
                <span>{selectedProject.riskScore}/100</span>
              </div>
            </div>

            {/* Project Metrics Summary Grid */}
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#EAF3EE]/08 font-mono text-xs">
              <div>
                <p className="text-[10px] text-[#5C7268]">CANOPY DELTA</p>
                <p className="font-bold text-[#2FE8B0] mt-0.5">{selectedProject.canopyChangeRate}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#5C7268]">LAST SCAN</p>
                <p className="text-[#EAF3EE] mt-0.5 text-[11px] truncate">{selectedProject.lastScanDate}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#5C7268]">AREA</p>
                <p className="text-[#EAF3EE] mt-0.5">{selectedProject.areaHectares.toLocaleString('en-US')} Ha</p>
              </div>
            </div>

            <p className="text-xs text-[#8FA79A] leading-relaxed line-clamp-2">
              {selectedProject.description}
            </p>

            {/* Action CTA */}
            <button
              onClick={() => onSelectProjectForPassport(selectedProject)}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#2FE8B0] text-[#0A120E] font-space font-bold text-xs uppercase tracking-wider hover:bg-[#34fbbe] transition-colors glow-teal-sm"
            >
              <span>Inspect Credit Passport</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Map Legend */}
        <div className="absolute top-6 right-6 hidden sm:flex items-center space-x-4 p-3 rounded-xl bg-[#0A120E]/80 border border-[#EAF3EE]/10 backdrop-blur-sm text-xs font-mono text-[#8FA79A]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2FE8B0]" />
            <span>High Trust (&gt;90)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E8894F]" />
            <span>Flagged Anomaly</span>
          </div>
        </div>
      </div>
    </section>
  );
};
