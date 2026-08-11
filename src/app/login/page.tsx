'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SatelliteCanvas } from '@/components/SatelliteCanvas';
import { ShieldCheck, UserCheck, Search, Cpu, BarChart3, ArrowRight, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDemoLogin = async (email: string, role: string) => {
    setLoadingRole(role);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      router.push('/dashboard');
    } catch (err) {
      setError('Failed to authenticate demo account.');
      setLoadingRole(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A120E] text-[#EAF3EE] flex flex-col justify-between p-4 sm:p-8 overflow-hidden">
      <SatelliteCanvas />

      {/* Header Logo */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div 
          onClick={() => router.push('/')}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0F1C15] border border-[#2FE8B0]/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#2FE8B0]" />
          </div>
          <div>
            <span className="font-space font-bold text-xl text-[#EAF3EE]">
              Carbon<span className="text-[#2FE8B0]">Proof</span>
            </span>
            <p className="text-[11px] font-mono text-[#8FA79A]">CONTINUOUS AI CREDIT VERIFICATION</p>
          </div>
        </div>

        <button
          onClick={() => router.push('/')}
          className="text-xs font-mono text-[#8FA79A] hover:text-[#2FE8B0] transition-colors"
        >
          Return to Public Landing
        </button>
      </div>

      {/* Main Login Role Cards */}
      <div className="relative z-10 max-w-4xl mx-auto w-full py-12 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#142A1F] border border-[#2FE8B0]/30 text-[#2FE8B0] font-mono text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>ROLE-BASED DEMO PORTAL — SELECT ACCOUNT TO PITCH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-space font-bold text-[#EAF3EE]">
            Access CarbonProof Console
          </h1>
          <p className="text-sm text-[#8FA79A] max-w-xl mx-auto">
            Choose a role below to log in instantly and demonstrate customized workflows during the live pitch.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-[#E85B4F]/20 border border-[#E85B4F]/40 text-center font-mono text-xs text-[#E85B4F]">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* BUYER ROLE CARD */}
          <div className="p-6 rounded-3xl bg-[#0F1C15] border border-[#EAF3EE]/12 hover:border-[#2FE8B0]/50 transition-all space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A120E] border border-[#2FE8B0]/30 flex items-center justify-center text-[#2FE8B0]">
                <Search className="w-6 h-6" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded bg-[#142A1F] text-[#2FE8B0] font-mono text-[10px] uppercase font-bold border border-[#2FE8B0]/20">
                  BUYER ROLE
                </span>
                <h3 className="font-space font-bold text-xl text-[#EAF3EE] mt-2">
                  Carbon Credit Buyer
                </h3>
                <p className="text-xs text-[#8FA79A] mt-1 leading-relaxed">
                  Search credit passports, audit live satellite history, and compute cost/speed verification savings.
                </p>
              </div>
            </div>

            <button
              disabled={loadingRole !== null}
              onClick={() => handleDemoLogin('buyer@carbonproof.io', 'BUYER')}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#2FE8B0] text-[#0A120E] font-space font-bold text-xs uppercase tracking-wider hover:bg-[#34fbbe] transition-all glow-teal-sm"
            >
              <span>{loadingRole === 'BUYER' ? 'Signing in...' : 'Log In as Buyer'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* AUDITOR ROLE CARD */}
          <div className="p-6 rounded-3xl bg-[#0F1C15] border border-[#E8894F]/40 hover:border-[#E8894F] transition-all space-y-6 flex flex-col justify-between group glow-amber">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A120E] border border-[#E8894F]/40 flex items-center justify-center text-[#E8894F]">
                <Cpu className="w-6 h-6" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded bg-[#E8894F]/20 text-[#E8894F] font-mono text-[10px] uppercase font-bold border border-[#E8894F]/40">
                  AUDITOR / VERIFIER ROLE
                </span>
                <h3 className="font-space font-bold text-xl text-[#EAF3EE] mt-2">
                  Chief Auditor
                </h3>
                <p className="text-xs text-[#8FA79A] mt-1 leading-relaxed">
                  Review flagged anomaly queue, inspect AI SAR radar evidence, and execute 4.2s live verification audits.
                </p>
              </div>
            </div>

            <button
              disabled={loadingRole !== null}
              onClick={() => handleDemoLogin('auditor@carbonproof.io', 'AUDITOR')}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#E8894F] text-[#0A120E] font-space font-bold text-xs uppercase tracking-wider hover:bg-[#f3955b] transition-all"
            >
              <span>{loadingRole === 'AUDITOR' ? 'Signing in...' : 'Log In as Auditor'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* REGISTRY ROLE CARD */}
          <div className="p-6 rounded-3xl bg-[#0F1C15] border border-[#EAF3EE]/12 hover:border-[#E8B74F]/50 transition-all space-y-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A120E] border border-[#E8B74F]/30 flex items-center justify-center text-[#E8B74F]">
                <BarChart3 className="w-6 h-6" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded bg-[#E8B74F]/20 text-[#E8B74F] font-mono text-[10px] uppercase font-bold border border-[#E8B74F]/30">
                  REGISTRY ROLE
                </span>
                <h3 className="font-space font-bold text-xl text-[#EAF3EE] mt-2">
                  Market Registry
                </h3>
                <p className="text-xs text-[#8FA79A] mt-1 leading-relaxed">
                  Portfolio-wide oversight, market risk distribution, regional aggregate reports, and Verra sync.
                </p>
              </div>
            </div>

            <button
              disabled={loadingRole !== null}
              onClick={() => handleDemoLogin('registry@carbonproof.io', 'REGISTRY')}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#E8B74F] text-[#0A120E] font-space font-bold text-xs uppercase tracking-wider hover:bg-[#f0c360] transition-all glow-gold"
            >
              <span>{loadingRole === 'REGISTRY' ? 'Signing in...' : 'Log In as Registry'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      <div className="relative z-10 text-center font-mono text-xs text-[#5C7268]">
        Pre-seeded demo credentials ready for instant pitch presentation.
      </div>
    </div>
  );
}
