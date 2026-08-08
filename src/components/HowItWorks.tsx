'use client';

import React from 'react';
import { Satellite, Cpu, ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Multimodal Perception',
      icon: Satellite,
      accent: '#2FE8B0',
      description: 'Continuous fusion of Sentinel-2 multispectral optical passes, Sentinel-1 radar backscatter, autonomous drone Lidar sweeps, and canopy acoustic IoT mesh streams.'
    },
    {
      num: '02',
      title: 'AI Biomass Analysis',
      icon: Cpu,
      accent: '#E8B74F',
      description: 'Deep neural networks continuously compute micro-scale vegetation index (NDVI), canopy density, carbon flux rate, and immediate illegal logging anomalies.'
    },
    {
      num: '03',
      title: 'Cryptographic Merkle Proof',
      icon: ShieldCheck,
      accent: '#2FE8B0',
      description: 'Raw satellite tiles, drone point clouds, and IoT sensor signatures are hashed into cryptographic Merkle trees for tamper-evident verifiability.'
    },
    {
      num: '04',
      title: 'Live Digital Passport',
      icon: FileCheck,
      accent: '#E8B74F',
      description: 'Every carbon credit asset is bound to a live digital passport displaying real-time trust scores, satellite history, and instant registry sync.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#142A1F] border border-[#2FE8B0]/30 text-[#2FE8B0] font-mono text-xs">
          <span>THE CARBONPROOF AUDIT ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-space font-bold text-[#EAF3EE]">
          From Satellite Orbit to Verifiable Passport
        </h2>
        <p className="text-base text-[#8FA79A]">
          Replacing once-a-year paper PDF audits with non-stop autonomous verification.
        </p>
      </div>

      {/* 4-Step Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 hover:border-[#2FE8B0]/40 transition-all space-y-4 relative group"
            >
              {/* Step Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold text-[#5C7268] group-hover:text-[#2FE8B0] transition-colors">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#0A120E] border border-[#EAF3EE]/10 flex items-center justify-center text-[#2FE8B0] group-hover:border-[#2FE8B0] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-space font-bold text-lg text-[#EAF3EE]">
                {step.title}
              </h3>

              <p className="text-xs text-[#8FA79A] leading-relaxed">
                {step.description}
              </p>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#5C7268]">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
