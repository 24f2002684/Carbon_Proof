'use client';

import React, { useState } from 'react';
import { SatelliteCanvas } from '@/components/SatelliteCanvas';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { LiveMapSection } from '@/components/LiveMapSection';
import { CreditPassport } from '@/components/CreditPassport';
import { RiskIntelligence } from '@/components/RiskIntelligence';
import { CostCalculator } from '@/components/CostCalculator';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';
import { MOCK_PROJECTS, FEATURED_CREDIT } from '@/data/mockData';
import { CarbonProject, CarbonCredit } from '@/types/carbon';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedProject, setSelectedProject] = useState<CarbonProject | null>(MOCK_PROJECTS[0]);

  const handleSelectProjectForPassport = (project: CarbonProject) => {
    setSelectedProject(project);
    setActiveTab('passport');
    const el = document.getElementById('passport-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeCredit: CarbonCredit = {
    ...FEATURED_CREDIT,
    project: selectedProject || MOCK_PROJECTS[0],
    projectName: selectedProject?.name || FEATURED_CREDIT.projectName,
    projectId: selectedProject?.id || FEATURED_CREDIT.projectId,
    verificationScore: selectedProject?.riskScore || FEATURED_CREDIT.verificationScore,
  };

  return (
    <div className="relative min-h-screen bg-[#0A120E] text-[#EAF3EE] overflow-hidden">
      {/* Background Satellite Contour & Radar Canvas */}
      <SatelliteCanvas />

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          const sectionMap: Record<string, string> = {
            overview: 'hero-section',
            map: 'map-section',
            passport: 'passport-section',
            intelligence: 'intelligence-section',
          };
          const targetId = sectionMap[tab];
          if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        onInspectCredit={() => handleSelectProjectForPassport(MOCK_PROJECTS[0])}
      />

      {/* Main Page Flow */}
      <main className="relative z-10 space-y-12">
        <div id="hero-section">
          <HeroSection
            onExploreMap={() => {
              setActiveTab('map');
              document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onViewPassport={() => {
              setActiveTab('passport');
              document.getElementById('passport-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>

        <LiveMapSection onSelectProjectForPassport={handleSelectProjectForPassport} />

        <CreditPassport credit={activeCredit} projectOverride={selectedProject} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CostCalculator />
        </div>

        <RiskIntelligence onSelectProject={handleSelectProjectForPassport} />

        <HowItWorks />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
