'use client';

import React, { useState } from 'react';
import { ShieldCheck, Activity, MapPin, FileCheck, BarChart3, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onInspectCredit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onInspectCredit }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'map', label: 'Live Mission Map', icon: MapPin },
    { id: 'passport', label: 'Digital Passport', icon: FileCheck },
    { id: 'intelligence', label: 'Risk Intelligence', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A120E]/85 border-b border-[#EAF3EE]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F1C15] border border-[#2FE8B0]/30 group-hover:border-[#2FE8B0] transition-colors">
            <ShieldCheck className="w-5 h-5 text-[#2FE8B0]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#2FE8B0] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#2FE8B0]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-space font-bold text-xl tracking-tight text-[#EAF3EE]">
                Carbon<span className="text-[#2FE8B0]">Proof</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider bg-[#142A1F] text-[#2FE8B0] rounded-full border border-[#2FE8B0]/20">
                PROD v2.4
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#8FA79A]">CONTINUOUS AI CREDIT VERIFICATION</p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-1 bg-[#0F1C15]/80 p-1.5 rounded-full border border-[#EAF3EE]/08">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/30 glow-teal-sm'
                    : 'text-[#8FA79A] hover:text-[#EAF3EE] hover:bg-[#142A1F]/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2FE8B0]' : 'text-[#8FA79A]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Live System Indicator & Primary CTAs */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#0F1C15] border border-[#EAF3EE]/08 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#2FE8B0] animate-pulse" />
            <span className="text-[#8FA79A]">12,480 HA MONITORED</span>
          </div>

          <a
            href="/login"
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/40 font-space font-semibold text-xs tracking-wide hover:bg-[#1B7A5C] transition-all glow-teal-sm"
          >
            <span>CONSOLE LOGIN</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            onClick={onInspectCredit}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#2FE8B0] text-[#0A120E] font-space font-semibold text-xs tracking-wide hover:bg-[#34fbbe] transition-all transform active:scale-95 glow-teal"
          >
            <span>INSPECT CP-09412</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#0F1C15] text-[#8FA79A] hover:text-[#EAF3EE]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F1C15] border-b border-[#EAF3EE]/10 px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/30' : 'text-[#8FA79A]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                onInspectCredit();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#2FE8B0] text-[#0A120E] font-space font-semibold text-xs"
            >
              <span>INSPECT CREDIT CP-09412</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
