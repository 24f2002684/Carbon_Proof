'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, Zap, ArrowRight, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';

export const CostCalculator: React.FC = () => {
  const [projectType, setProjectType] = useState<string>('Avoided Deforestation');
  const [hectares, setHectares] = useState<number>(180000);
  const [region, setRegion] = useState<string>('S. America');

  // Type Multipliers
  const typeMultipliers: Record<string, number> = {
    'Avoided Deforestation': 1.0,
    'Mangrove Restoration': 1.25,
    'Reforestation': 1.1,
    'Peatland Conservation': 1.35,
  };

  const multiplier = typeMultipliers[projectType] || 1.0;

  // Traditional Audit Calculation
  const traditionalCost = Math.round((30000 + hectares * 0.18) * multiplier);
  const traditionalDays = Math.min(240, Math.round(120 + hectares * 0.00025));

  // CarbonProof AI Continuous Calculation
  const carbonProofCost = Math.round((1400 + hectares * 0.007) * (multiplier * 0.85));
  const carbonProofSeconds = 4.2;

  // Savings
  const costSavingsPercent = (((traditionalCost - carbonProofCost) / traditionalCost) * 100).toFixed(1);
  const timeSavingsPercent = '99.99';

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1C15] border border-[#EAF3EE]/12 shadow-2xl space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAF3EE]/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[#2FE8B0] font-mono text-xs mb-2">
            <Calculator className="w-4 h-4" />
            <span>INTERACTIVE VERIFICATION COST & SPEED CALCULATOR</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-space font-bold text-[#EAF3EE]">
            Traditional Audit vs. CarbonProof AI
          </h3>
          <p className="text-xs text-[#8FA79A] mt-1">
            Quantifying the financial and operational advantage of continuous multi-spectral verification.
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#142A1F] border border-[#2FE8B0]/30 text-[#2FE8B0] font-mono text-xs">
          <Zap className="w-3.5 h-3.5" />
          <span>AVERAGE SAVINGS: 94.8% CHEAPER // 99.99% FASTER</span>
        </div>
      </div>

      {/* Input Parameters Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project Type */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[#8FA79A]">Project Ecosystem Type</label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0A120E] border border-[#EAF3EE]/15 text-[#EAF3EE] font-space text-sm focus:border-[#2FE8B0] outline-none"
          >
            <option value="Avoided Deforestation">Avoided Deforestation (Tropical Rainforest)</option>
            <option value="Mangrove Restoration">Mangrove Restoration (Coastal Tidal)</option>
            <option value="Reforestation">Reforestation & Agroforestry</option>
            <option value="Peatland Conservation">Peatland & Swamp Conservation</option>
          </select>
        </div>

        {/* Hectares Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#8FA79A]">Project Size (Hectares)</span>
            <span className="text-[#2FE8B0] font-bold">{hectares.toLocaleString('en-US')} Ha</span>
          </div>
          <input
            type="range"
            min="10000"
            max="1500000"
            step="10000"
            value={hectares}
            onChange={(e) => setHectares(Number(e.target.value))}
            className="w-full accent-[#2FE8B0] h-2 rounded-lg bg-[#0A120E] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-[#5C7268]">
            <span>10k Ha</span>
            <span>750k Ha</span>
            <span>1.5M Ha</span>
          </div>
        </div>

        {/* Region Select */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-[#8FA79A]">Geographic Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0A120E] border border-[#EAF3EE]/15 text-[#EAF3EE] font-space text-sm focus:border-[#2FE8B0] outline-none"
          >
            <option value="S. America">South America (Amazon Basin)</option>
            <option value="Africa">Africa (Congo / East Africa)</option>
            <option value="SE Asia">Southeast Asia (Indo-Malay)</option>
          </select>
        </div>
      </div>

      {/* Comparison Outcome Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        
        {/* Legacy Manual Audit Box */}
        <div className="p-6 rounded-2xl bg-[#0A120E] border border-[#E8894F]/30 space-y-4 relative">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-md bg-[#E8894F]/15 text-[#E8894F] font-mono text-xs font-bold border border-[#E8894F]/30">
              TRADITIONAL MANUAL AUDIT
            </span>
            <AlertCircle className="w-4 h-4 text-[#E8894F]" />
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <span className="text-[11px] font-mono text-[#5C7268]">TOTAL ESTIMATED COST</span>
              <p className="text-3xl font-space font-extrabold text-[#E8894F]">
                ${traditionalCost.toLocaleString('en-US')}
              </p>
              <p className="text-xs text-[#8FA79A] mt-0.5 font-mono">Manual field team, flights, PDF verifier fees</p>
            </div>

            <div className="pt-2 border-t border-[#EAF3EE]/08 grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-[#5C7268]">AUDIT TIMELINE</span>
                <p className="text-[#EAF3EE] font-bold mt-0.5">{traditionalDays} Days ({Math.round(traditionalDays / 30)} Months)</p>
              </div>
              <div>
                <span className="text-[10px] text-[#5C7268]">AUDIT FREQUENCY</span>
                <p className="text-[#E8894F] font-bold mt-0.5">1x Per Year (365d Lag)</p>
              </div>
            </div>
          </div>
        </div>

        {/* CarbonProof AI Continuous Box */}
        <div className="p-6 rounded-2xl bg-[#142A1F] border border-[#2FE8B0]/50 space-y-4 relative glow-teal-sm">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-md bg-[#2FE8B0] text-[#0A120E] font-mono text-xs font-bold uppercase tracking-wider">
              CARBONPROOF CONTINUOUS AI
            </span>
            <ShieldCheck className="w-5 h-5 text-[#2FE8B0]" />
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <span className="text-[11px] font-mono text-[#8FA79A]">TOTAL CONTINUOUS COST</span>
              <p className="text-3xl font-space font-extrabold text-[#2FE8B0]">
                ${carbonProofCost.toLocaleString('en-US')}
              </p>
              <p className="text-xs text-[#2FE8B0] mt-0.5 font-mono">
                {costSavingsPercent}% Cost Reduction (${(traditionalCost - carbonProofCost).toLocaleString('en-US')} saved)
              </p>
            </div>

            <div className="pt-2 border-t border-[#2FE8B0]/20 grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-[#8FA79A]">VERIFICATION SPEED</span>
                <p className="text-[#2FE8B0] font-bold mt-0.5">&lt; {carbonProofSeconds} Seconds</p>
              </div>
              <div>
                <span className="text-[10px] text-[#8FA79A]">SCAN FREQUENCY</span>
                <p className="text-[#2FE8B0] font-bold mt-0.5">Continuous 24/7/365</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
