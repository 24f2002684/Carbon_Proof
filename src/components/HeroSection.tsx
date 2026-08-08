'use client';

import React from 'react';
import { StatCounter } from './StatCounter';
import { Satellite, ShieldAlert, Cpu, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreMap: () => void;
  onViewPassport: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMap, onViewPassport }) => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-12 pb-8 overflow-hidden">
      
      {/* Top Tag / Pill */}
      <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0F1C15] border border-[#2FE8B0]/25 mb-8 animate-fade-in">
        <Sparkles className="w-3.5 h-3.5 text-[#2FE8B0]" />
        <span className="text-xs font-mono text-[#2FE8B0] tracking-wide uppercase">
          Continuous AI Satellite & Sensor Audit Engine
        </span>
      </div>

      {/* Main Hero Headline */}
      <div className="max-w-4xl text-center space-y-6 z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-space font-extrabold tracking-tight text-[#EAF3EE] leading-[1.1]">
          Carbon credits, verified{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#2FE8B0] via-[#81F5D2] to-[#2FE8B0]">
            continuously
          </span>
          <br className="hidden sm:inline" /> — not once a year.
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8FA79A] leading-relaxed font-sans">
          CarbonProof fuses high-revisit satellite constellations, autonomous drone SAR Lidar, and canopy IoT sensor meshes into a live, tamper-evident digital passport for every credit.
        </p>

        {/* Hero CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreMap}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-[#2FE8B0] text-[#0A120E] font-space font-bold text-sm tracking-wider uppercase hover:bg-[#3bf5be] transition-all transform hover:-translate-y-0.5 glow-teal"
          >
            <span>Explore Mission Control Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewPassport}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-[#0F1C15] text-[#EAF3EE] font-space font-semibold text-sm tracking-wider uppercase border border-[#EAF3EE]/15 hover:border-[#2FE8B0]/50 hover:bg-[#142A1F] transition-all"
          >
            <span>View Digital Passport</span>
            <Satellite className="w-4 h-4 text-[#2FE8B0]" />
          </button>
        </div>
      </div>

      {/* Live Stat Strip */}
      <div className="w-full max-w-6xl mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 z-10">
        <div className="p-5 rounded-2xl bg-[#0F1C15]/80 border border-[#EAF3EE]/08 backdrop-blur-sm group hover:border-[#2FE8B0]/30 transition-all">
          <div className="flex items-center justify-between text-[#5C7268] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Active Monitoring</span>
            <Satellite className="w-4 h-4 text-[#2FE8B0]" />
          </div>
          <div className="text-2xl sm:text-3xl text-[#2FE8B0]">
            <StatCounter end={12480} />
          </div>
          <p className="text-xs text-[#8FA79A] mt-1 font-mono">Hectares Under Scan</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F1C15]/80 border border-[#EAF3EE]/08 backdrop-blur-sm group hover:border-[#2FE8B0]/30 transition-all">
          <div className="flex items-center justify-between text-[#5C7268] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Verification Confidence</span>
            <Cpu className="w-4 h-4 text-[#E8B74F]" />
          </div>
          <div className="text-2xl sm:text-3xl text-[#E8B74F]">
            <StatCounter end={94.2} decimals={1} suffix="%" />
          </div>
          <p className="text-xs text-[#8FA79A] mt-1 font-mono">AI Model Stability</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F1C15]/80 border border-[#EAF3EE]/08 backdrop-blur-sm group hover:border-[#2FE8B0]/30 transition-all">
          <div className="flex items-center justify-between text-[#5C7268] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Anomalies Flagged</span>
            <ShieldAlert className="w-4 h-4 text-[#E8894F]" />
          </div>
          <div className="text-2xl sm:text-3xl text-[#E8894F]">
            <StatCounter end={37} suffix=" Events" />
          </div>
          <p className="text-xs text-[#8FA79A] mt-1 font-mono">Resolved in &lt; 2 hrs</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F1C15]/80 border border-[#EAF3EE]/08 backdrop-blur-sm group hover:border-[#2FE8B0]/30 transition-all">
          <div className="flex items-center justify-between text-[#5C7268] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">Verifiable Value</span>
            <Sparkles className="w-4 h-4 text-[#2FE8B0]" />
          </div>
          <div className="text-2xl sm:text-3xl text-[#EAF3EE]">
            <StatCounter end={48.2} decimals={1} prefix="$" suffix="M" />
          </div>
          <p className="text-xs text-[#8FA79A] mt-1 font-mono">Secured Credit Assets</p>
        </div>
      </div>

      {/* Minimal Slow-Fade Scroll Indicator */}
      <div className="mt-8 flex flex-col items-center space-y-2 text-[#5C7268] animate-pulse">
        <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO INSPECT LIVE NETWORK</span>
        <ChevronDown className="w-4 h-4 text-[#2FE8B0]" />
      </div>
    </section>
  );
};
