'use client';

import React, { useState } from 'react';
import { CarbonCredit, CarbonProject } from '@/types/carbon';
import { FEATURED_CREDIT } from '@/data/mockData';
import { CreditSearch } from '@/components/CreditSearch';
import { SatelliteSlider } from '@/components/SatelliteSlider';
import { AgentPipelinePanel } from '@/components/AgentPipelinePanel';
import { PdfReportButton } from '@/components/PdfReportButton';
import { ShieldCheck, Award, Satellite, ChevronDown, ChevronUp, MapPin, Hash, Sparkles, Clock, Activity, Cpu, Camera, Radio, Landmark } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface CreditPassportProps {
  credit?: CarbonCredit;
  projectOverride?: CarbonProject | null;
  onBackToMap?: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const CreditPassport: React.FC<CreditPassportProps> = ({
  credit = FEATURED_CREDIT,
  projectOverride,
  onSelectProject,
}) => {
  const activeProject = projectOverride || credit.project;
  const [expandedStep, setExpandedStep] = useState<string | null>('LED-001');
  const [pipelineData, setPipelineData] = useState<any>(null);

  const score = activeProject.riskScore;
  const isVerified = activeProject.trustStatus === 'VERIFIED';
  
  // Calculate SVG circular score progress
  const strokeDashoffset = 314 - (314 * score) / 100;

  return (
    <section id="passport-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* 1. Credit Search Bar with Schema Tooltip */}
      {onSelectProject && (
        <div className="pb-4">
          <CreditSearch onSelectProject={onSelectProject} />
        </div>
      )}

      {/* 2. Passport Header Banner / Certificate Shell */}
      <div className="relative rounded-3xl bg-[#0F1C15] border border-[#EAF3EE]/15 p-6 sm:p-10 overflow-hidden shadow-2xl space-y-6">
        
        {/* Radial Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2FE8B0]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#E8B74F]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Credit ID & Project Identity */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
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

            {/* Official Registry Cross-Reference Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono pt-1">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#0A120E] border border-[#E8B74F]/40 text-[#E8B74F]">
                <Landmark className="w-3.5 h-3.5" />
                <span>VERRA VCS: <strong>{activeProject.verraRegistryId || 'VCS-1482'}</strong></span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#0A120E] border border-[#2FE8B0]/40 text-[#2FE8B0]">
                <Landmark className="w-3.5 h-3.5" />
                <span>GOLD STANDARD: <strong>{activeProject.goldStandardId || 'GS-3941'}</strong></span>
              </div>
            </div>

            {/* Cryptographic Hashes Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#5C7268] pt-1">
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
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0A120E]/80 border border-[#EAF3EE]/10 space-y-4 min-w-[200px]">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" stroke="#142A1F" strokeWidth="8" fill="transparent" />
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
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-mono font-extrabold text-[#EAF3EE]">{score}</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#8FA79A]">TRUST SCORE</span>
              </div>
            </div>

            <div className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${
              isVerified
                ? 'bg-[#E8B74F]/20 text-[#E8B74F] border border-[#E8B74F]/50 glow-gold'
                : 'bg-[#E8894F]/20 text-[#E8894F] border border-[#E8894F]/50 glow-amber'
            }`}>
              <Award className="w-4 h-4" />
              <span>{isVerified ? 'VERIFIED & AUDITED' : 'ELEVATED RISK'}</span>
            </div>

            {/* Download PDF Report Action Button */}
            <PdfReportButton
              credit={credit}
              agentReportText={pipelineData?.steps?.report?.data?.fullReportText}
              verdict={pipelineData?.steps?.crossCheck?.data?.verdict}
            />
          </div>
        </div>
      </div>

      {/* 3. Live AI Multi-Agent Pipeline Panel */}
      <AgentPipelinePanel
        projectId={activeProject.id}
        onPipelineRun={(data) => setPipelineData(data)}
      />

      {/* 4. Interactive Before/After Satellite Comparison Slider */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1C15] border border-[#EAF3EE]/12 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-space font-bold text-xl text-[#EAF3EE] flex items-center space-x-2">
              <Satellite className="w-5 h-5 text-[#2FE8B0]" />
              <span>Before & After Satellite Evidence Comparison</span>
            </h3>
            <p className="text-xs text-[#8FA79A] mt-0.5">
              Interactive split-image verification slider rendering 2019 baseline vs 2024 orbital pass.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-[#2FE8B0]">
            <span>Resolution:</span>
            <strong className="px-2.5 py-1 bg-[#142A1F] rounded-lg border border-[#2FE8B0]/30">
              Sentinel-2B 10m Multispectral
            </strong>
          </div>
        </div>

        <SatelliteSlider
          baselineImage="/satellite_images/IMG1.jpg"
          currentImage="/satellite_images/IMG6_annotated.jpeg"
          baselineYear="2019 Baseline Pass"
          currentYear="2024 Current Sweep"
          baselineCanopy={94.2}
          currentCanopy={61.8}
          canopyDelta={-32.4}
        />
      </div>

      {/* 5. Mock Drone Imagery & Real-Time IoT Sensor Readings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Drone Close-Range Optical Imagery */}
        <div className="p-6 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-space font-bold text-lg text-[#EAF3EE] flex items-center space-x-2">
              <Camera className="w-4 h-4 text-[#2FE8B0]" />
              <span>High-Resolution Drone LIDAR Capture</span>
            </h3>
            <span className="text-xs font-mono text-[#2FE8B0]">0.1m ALTITUDE SCAN</span>
          </div>

          <div className="relative h-56 rounded-xl overflow-hidden border border-[#1B7A5C]/40 group">
            <img
              src="/satellite_images/IMG7_annotated.jpeg"
              alt="Drone High-Res Scan"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0A120E]/90 border border-[#2FE8B0]/40 text-[#2FE8B0] font-mono text-[10px] font-bold">
              DRONE FLEET #04 — 120M FLYOVER
            </div>
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded bg-[#0A120E]/90 border border-[#EAF3EE]/10 font-mono text-[10px] text-[#8FA79A]">
              POINT CLOUD: 4,820 POINTS/M²
            </div>
          </div>
        </div>

        {/* Real-time Time Series IoT Telemetry */}
        <div className="p-6 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-space font-bold text-lg text-[#EAF3EE] flex items-center space-x-2">
              <Radio className="w-4 h-4 text-[#2FE8B0]" />
              <span>Ground IoT Acoustic Mesh & Biomass Flux</span>
            </h3>
            <span className="text-xs font-mono text-[#2FE8B0]">142 NODES ONLINE</span>
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

      {/* 6. Cryptographic Audit Ledger & Verification Steps */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-6">
        <h3 className="font-space font-bold text-xl text-[#EAF3EE] flex items-center space-x-2">
          <Clock className="w-5 h-5 text-[#E8B74F]" />
          <span>Cryptographic Audit Ledger & Immutable Chain</span>
        </h3>

        <div className="relative border-l-2 border-[#1B7A5C] ml-4 pl-6 space-y-8">
          {activeProject.verificationLedger.map((step) => {
            const isExpanded = expandedStep === step.id;
            return (
              <div key={step.id} className="relative group">
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
