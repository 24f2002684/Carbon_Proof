'use client';

import React, { useState } from 'react';
import { CarbonCredit, CarbonProject } from '@/types/carbon';
import { FEATURED_CREDIT } from '@/data/mockData';
import { ShieldCheck, Award, Satellite, ChevronDown, ChevronUp, MapPin, Hash, Sparkles, Clock, ArrowRight, Activity, Cpu } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface CreditPassportProps {
  credit?: CarbonCredit;
  projectOverride?: CarbonProject | null;
  onBackToMap?: () => void;
}

export const CreditPassport: React.FC<CreditPassportProps> = ({
  credit = FEATURED_CREDIT,
  projectOverride,
  onBackToMap,
}) => {
  const activeProject = projectOverride || credit.project;
  const [expandedStep, setExpandedStep] = useState<string | null>('LED-001');
  const [activeSnapshot, setActiveSnapshot] = useState<number>(activeProject.satelliteSnapshots.length - 1);

  const score = activeProject.riskScore;
  const isVerified = activeProject.trustStatus === 'VERIFIED';
  
  // Calculate SVG circular score progress
  const strokeDashoffset = 314 - (314 * score) / 100;

  return (
    <section id="passport-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Passport Header Banner / Certificate Shell */}
      <div className="relative rounded-3xl bg-[#0F1C15] border border-[#EAF3EE]/15 p-6 sm:p-10 overflow-hidden shadow-2xl">
        
        {/* Subtle Radial Glow in background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2FE8B0]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#E8B74F]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Credit ID & Project Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-md bg-[#142A1F] text-[#2FE8B0] font-mono text-xs font-semibold tracking-wider border border-[#2FE8B0]/30 glow-teal-sm">
                DIGITAL CREDIT PASSPORT
              </span>
              <span className="text-xs font-mono text-[#8FA79A]">VINTAGE {credit.vintageYear}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-space font-extrabold text-[#EAF3EE] tracking-tight">
                {credit.id}
              </h1>
              <p className="text-sm font-mono text-[#8FA79A] mt-1 flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#2FE8B0]" />
                <span>{activeProject.name} — {activeProject.location}, {activeProject.country}</span>
              </p>
            </div>

            {/* Cryptographic Hashes Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#5C7268] pt-2">
              <div className="flex items-center space-x-1.5">
                <Hash className="w-3.5 h-3.5 text-[#E8B74F]" />
                <span>Serial: <strong className="text-[#EAF3EE]">{credit.serialNumber}</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2FE8B0]" />
                <span>Merkle Hash: <strong className="text-[#2FE8B0]">{credit.merkleRootHash.slice(0, 16)}...</strong></span>
              </div>
            </div>
          </div>

          {/* Animated Circular Score Gauge & Seal */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0A120E]/80 border border-[#EAF3EE]/10 space-y-3 min-w-[200px]">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {/* Background Ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#142A1F"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Animated Progress Ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={isVerified ? '#E8B74F' : '#E8894F'}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="314"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Gauge Inner Score */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-mono font-extrabold text-[#EAF3EE]">
                  {score}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#8FA79A]">
                  TRUST SCORE
                </span>
              </div>
            </div>

            {/* Gold Verified Seal */}
            <div
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${
                isVerified
                  ? 'bg-[#E8B74F]/20 text-[#E8B74F] border border-[#E8B74F]/50 glow-gold'
                  : 'bg-[#E8894F]/20 text-[#E8894F] border border-[#E8894F]/50 glow-amber'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{isVerified ? 'VERIFIED & AUDITED' : 'ELEVATED RISK'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: GPS Mini Map + Live Sensor Telemetry Sparklines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* GPS Boundary Mini-Map Card */}
        <div className="p-6 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-space font-bold text-lg text-[#EAF3EE] flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#2FE8B0]" />
              <span>GPS Boundary Polygon & Sentinel Pass</span>
            </h3>
            <span className="text-xs font-mono text-[#8FA79A]">{activeProject.areaHectares.toLocaleString('en-US')} Hectares</span>
          </div>

          <div className="relative h-56 rounded-xl bg-[#0A120E] border border-[#1B7A5C]/40 overflow-hidden flex items-center justify-center">
            {/* SVG Polygon GPS boundary overlay */}
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <polygon
                points="80,40 280,30 360,140 160,180 50,120"
                fill="rgba(47, 232, 176, 0.12)"
                stroke="#2FE8B0"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <circle cx="280" cy="30" r="4" fill="#E8B74F" />
              <circle cx="160" cy="180" r="4" fill="#2FE8B0" />
              <text x="90" y="70" fill="#2FE8B0" fontSize="11" fontFamily="monospace">CANOPY SECTOR 4B (NDVI 0.88)</text>
              <text x="170" y="140" fill="#E8B74F" fontSize="10" fontFamily="monospace">IOT NODE MESH #142</text>
            </svg>
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-[#0A120E]/90 border border-[#EAF3EE]/10 font-mono text-[10px] text-[#8FA79A]">
              BOUNDS: Lat {activeProject.coordinates[0]}° | Lng {activeProject.coordinates[1]}°
            </div>
          </div>
        </div>

        {/* Live Sensor Telemetry Chart Card */}
        <div className="p-6 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-space font-bold text-lg text-[#EAF3EE] flex items-center space-x-2">
              <Activity className="w-4 h-4 text-[#2FE8B0]" />
              <span>Multispectral NDVI & Biomass History</span>
            </h3>
            <span className="text-xs font-mono text-[#2FE8B0]">LIVE STREAMING</span>
          </div>

          <div className="h-56 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeProject.telemetryHistory}>
                <defs>
                  <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2FE8B0" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2FE8B0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#5C7268" fontSize={10} tickLine={false} />
                <YAxis domain={[0.6, 1.0]} stroke="#5C7268" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A120E', borderColor: '#2FE8B0', borderRadius: '8px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="ndvi" stroke="#2FE8B0" strokeWidth={2} fillOpacity={1} fill="url(#ndviGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Satellite Imagery Timeline (Horizontal Slider) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-space font-bold text-xl text-[#EAF3EE] flex items-center space-x-2">
              <Satellite className="w-5 h-5 text-[#2FE8B0]" />
              <span>Satellite Historical Verification Timeline</span>
            </h3>
            <p className="text-xs text-[#8FA79A] mt-0.5">
              Compare baseline multi-spectral orbital imagery against current Sentinel-2B scans.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-[#2FE8B0]">
            <span>Active Pass:</span>
            <strong className="px-2 py-1 bg-[#142A1F] rounded border border-[#2FE8B0]/30">
              {activeProject.satelliteSnapshots[activeSnapshot]?.satellite}
            </strong>
          </div>
        </div>

        {/* Satellite Thumbnails Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {activeProject.satelliteSnapshots.map((snap, idx) => (
            <div
              key={snap.id}
              onClick={() => setActiveSnapshot(idx)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                activeSnapshot === idx
                  ? 'bg-[#142A1F] border-[#2FE8B0] glow-teal-sm'
                  : 'bg-[#0A120E] border-[#EAF3EE]/10 hover:border-[#2FE8B0]/40'
              }`}
            >
              <div className="relative h-32 rounded-lg overflow-hidden mb-3 bg-[#0A120E]">
                {/* Fallback SVG visual underneath img */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#142A1F] to-[#0A120E] p-2 text-center">
                  <svg className="w-full h-full absolute inset-0 opacity-40" viewBox="0 0 200 100">
                    <rect width="200" height="100" fill="#0F1C15" />
                    <line x1="0" y1="50" x2="200" y2="50" stroke="#2FE8B0" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
                    <line x1="100" y1="0" x2="100" y2="100" stroke="#2FE8B0" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
                    <circle cx="100" cy="50" r="30" fill="rgba(47, 232, 176, 0.2)" />
                    <circle cx="130" cy="40" r="18" fill="rgba(232, 183, 79, 0.2)" />
                  </svg>
                  <Satellite className="w-6 h-6 text-[#2FE8B0] mb-1 z-10 animate-pulse" />
                  <span className="text-[10px] font-mono text-[#2FE8B0] z-10 uppercase tracking-widest">{snap.satellite}</span>
                </div>

                <img
                  src={snap.imageUrl}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  className="relative z-10 w-full h-full object-cover"
                />

                {snap.isBaseline && (
                  <span className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded bg-[#0A120E]/90 text-[#E8B74F] font-mono text-[9px] font-bold border border-[#E8B74F]/40">
                    BASELINE
                  </span>
                )}
                <span className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded bg-[#0A120E]/90 text-[#2FE8B0] font-mono text-[9px]">
                  NDVI {snap.ndviValue}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-[#EAF3EE]">
                  <span>{snap.date}</span>
                  <span className="text-[#2FE8B0] text-[10px]">{snap.canopyDelta}</span>
                </div>
                <p className="text-[11px] font-mono text-[#8FA79A]">{snap.resolution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sequential Ledger Verification Timeline */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-6">
        <h3 className="font-space font-bold text-xl text-[#EAF3EE] flex items-center space-x-2">
          <Clock className="w-5 h-5 text-[#E8B74F]" />
          <span>Cryptographic Audit Ledger & Verification Steps</span>
        </h3>

        <div className="relative border-l-2 border-[#1B7A5C] ml-4 pl-6 space-y-8">
          {activeProject.verificationLedger.map((step) => {
            const isExpanded = expandedStep === step.id;
            return (
              <div key={step.id} className="relative group">
                {/* Glowing Node Dot on Timeline */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0F1C15] border-2 border-[#2FE8B0] glow-teal-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FE8B0]" />
                </div>

                <div className="p-4 rounded-xl bg-[#0A120E] border border-[#EAF3EE]/10 space-y-2">
                  <div
                    onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono text-[#2FE8B0]">
                        <span>{step.source}</span>
                        <span className="text-[#5C7268]">•</span>
                        <span className="text-[#8FA79A]">{step.timestamp.slice(11, 16)} UTC</span>
                      </div>
                      <h4 className="font-space font-bold text-base text-[#EAF3EE] mt-0.5">
                        {step.title}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="px-2.5 py-0.5 rounded bg-[#142A1F] text-[#2FE8B0] font-mono text-[10px] border border-[#2FE8B0]/20">
                        {step.status}
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-[#8FA79A]" /> : <ChevronDown className="w-4 h-4 text-[#8FA79A]" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="pt-3 border-t border-[#EAF3EE]/08 space-y-2 text-xs text-[#8FA79A]">
                      <p className="leading-relaxed">{step.description}</p>
                      <div className="p-2 rounded bg-[#0F1C15] font-mono text-[11px] text-[#2FE8B0] break-all border border-[#1B7A5C]/30">
                        PROOF HASH: {step.hash}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
