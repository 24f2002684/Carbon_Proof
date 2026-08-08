'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SatelliteCanvas } from '@/components/SatelliteCanvas';
import { Navbar } from '@/components/Navbar';
import { CreditPassport } from '@/components/CreditPassport';
import { Footer } from '@/components/Footer';
import { MOCK_PROJECTS, FEATURED_CREDIT } from '@/data/mockData';
import { ArrowLeft } from 'lucide-react';

export default function PassportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'CP-2026-AMZ-09412';

  const project = MOCK_PROJECTS.find((p) => p.id === id) || MOCK_PROJECTS[0];

  const credit = {
    ...FEATURED_CREDIT,
    id: `CP-2026-${project.id.split('-')[1]}-09412`,
    project: project,
    projectName: project.name,
    projectId: project.id,
    verificationScore: project.riskScore,
  };

  return (
    <div className="relative min-h-screen bg-[#0A120E] text-[#EAF3EE]">
      <SatelliteCanvas />
      
      <Navbar
        activeTab="passport"
        setActiveTab={() => router.push('/')}
        onInspectCredit={() => {}}
      />

      <main className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0F1C15] text-[#2FE8B0] border border-[#2FE8B0]/30 font-mono text-xs mb-8 hover:bg-[#142A1F] transition-all glow-teal-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Mission Control</span>
        </button>

        <CreditPassport credit={credit} projectOverride={project} />
      </main>

      <Footer />
    </div>
  );
}
