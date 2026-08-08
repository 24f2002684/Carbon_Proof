'use client';

import React from 'react';
import { ShieldCheck, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#EAF3EE]/10 bg-[#0A120E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#0F1C15] border border-[#2FE8B0]/30 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-[#2FE8B0]" />
          </div>
          <div>
            <span className="font-space font-bold text-base text-[#EAF3EE]">
              Carbon<span className="text-[#2FE8B0]">Proof</span>
            </span>
            <p className="text-[11px] font-mono text-[#5C7268]">Continuous Carbon Credit Verification Engine</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center space-x-6 text-xs font-mono text-[#8FA79A]">
          <a href="#overview" className="hover:text-[#2FE8B0] transition-colors">Satellite Specs</a>
          <a href="#map-section" className="hover:text-[#2FE8B0] transition-colors">Mission Control</a>
          <a href="#passport-section" className="hover:text-[#2FE8B0] transition-colors">Credit Passport</a>
          <a href="#intelligence-section" className="hover:text-[#2FE8B0] transition-colors">Risk Engine</a>
          <a href="https://verra.org" target="_blank" rel="noreferrer" className="hover:text-[#2FE8B0] transition-colors">Verra Sync</a>
        </div>

        {/* Node status indicator */}
        <div className="flex items-center space-x-2 text-[11px] font-mono text-[#5C7268]">
          <Terminal className="w-3.5 h-3.5 text-[#2FE8B0]" />
          <span>LATENCY: 14ms // NODE: US-EAST-VIRGINIA</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#EAF3EE]/05 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#5C7268]">
        <p>© 2026 CarbonProof Tech Inc. All rights reserved. Cryptographically Sealed Data.</p>
        <p className="mt-2 sm:mt-0 flex items-center space-x-1">
          <span>Engineered for Climate Innovation</span>
        </p>
      </div>
    </footer>
  );
};
