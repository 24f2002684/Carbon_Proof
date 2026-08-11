'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SatelliteCanvas } from '@/components/SatelliteCanvas';
import { Navbar } from '@/components/Navbar';
import { LiveMapSection } from '@/components/LiveMapSection';
import { CreditPassport } from '@/components/CreditPassport';
import { RiskIntelligence } from '@/components/RiskIntelligence';
import { CostCalculator } from '@/components/CostCalculator';
import { AuditorWorkflow } from '@/components/AuditorWorkflow';
import { DemoControlPanel } from '@/components/DemoControlPanel';
import { Footer } from '@/components/Footer';
import { CarbonProject, CarbonCredit, AnomalyEvent } from '@/types/carbon';
import { ShieldCheck, User, LogOut, Radar, Activity, Cpu, Calculator, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);

  // Region State Engine
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [projects, setProjects] = useState<CarbonProject[]>([]);
  const [anomalies, setAnomalies] = useState<AnomalyEvent[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // Selected Project for Passport View
  const [selectedProject, setSelectedProject] = useState<CarbonProject | null>(null);

  // Active Role View Tab
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Verify authentication on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/login');
        } else {
          setSessionUser(data.user);
          // Set default tab based on role
          if (data.user.role === 'AUDITOR') {
            setActiveTab('auditor-queue');
          } else if (data.user.role === 'BUYER') {
            setActiveTab('calculator');
          } else {
            setActiveTab('intelligence');
          }
          setLoadingAuth(false);
        }
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  // Fetch region-scoped data from SQLite API whenever region changes or trigger occurs
  const refreshData = () => {
    setLoadingData(true);
    Promise.all([
      fetch(`/api/projects?region=${selectedRegion}`).then((res) => res.json()),
      fetch(`/api/stats?region=${selectedRegion}`).then((res) => res.json()),
      fetch(`/api/anomalies?region=${selectedRegion}`).then((res) => res.json()),
    ])
      .then(([projectsRes, statsRes, anomaliesRes]) => {
        if (projectsRes.success) {
          setProjects(projectsRes.projects);
          if (!selectedProject && projectsRes.projects.length > 0) {
            setSelectedProject(projectsRes.projects[0]);
          }
        }
        if (statsRes.success) {
          setStats(statsRes.stats);
        }
        if (anomaliesRes.success) {
          setAnomalies(anomaliesRes.anomalies);
        }
        setLoadingData(false);
      })
      .catch(() => setLoadingData(false));
  };

  useEffect(() => {
    if (!loadingAuth) {
      refreshData();
    }
  }, [selectedRegion, loadingAuth]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#0A120E] text-[#EAF3EE] flex items-center justify-center font-mono text-xs text-[#2FE8B0]">
        <div className="flex items-center space-x-3">
          <Radar className="w-6 h-6 animate-spin text-[#2FE8B0]" />
          <span>Verifying CarbonProof Session Credentials...</span>
        </div>
      </div>
    );
  }

  const flaggedProjects = projects.filter((p) => p.trustStatus !== 'VERIFIED');
  const role = sessionUser?.role || 'BUYER';

  return (
    <div className="relative min-h-screen bg-[#0A120E] text-[#EAF3EE] overflow-hidden">
      <SatelliteCanvas />

      {/* Authenticated Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0A120E]/90 border-b border-[#EAF3EE]/10 px-4 sm:px-8 h-20 flex items-center justify-between">
        <div 
          onClick={() => router.push('/')}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0F1C15] border border-[#2FE8B0]/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#2FE8B0]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-space font-bold text-xl text-[#EAF3EE]">
                Carbon<span className="text-[#2FE8B0]">Proof</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#142A1F] text-[#2FE8B0] rounded-full border border-[#2FE8B0]/20">
                {role} DASHBOARD
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#8FA79A]">SQLITE BACKEND // LIVE DATA FLOW</p>
          </div>
        </div>

        {/* Role-Specific View Selector Tabs */}
        <div className="hidden md:flex items-center space-x-1 bg-[#0F1C15] p-1.5 rounded-full border border-[#EAF3EE]/10 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeTab === 'overview' ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/30' : 'text-[#8FA79A]'
            }`}
          >
            Mission Map
          </button>
          
          <button
            onClick={() => setActiveTab('passport')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeTab === 'passport' ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/30' : 'text-[#8FA79A]'
            }`}
          >
            Credit Passport
          </button>

          {role === 'AUDITOR' && (
            <button
              onClick={() => setActiveTab('auditor-queue')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeTab === 'auditor-queue' ? 'bg-[#E8894F]/20 text-[#E8894F] border border-[#E8894F]/40' : 'text-[#8FA79A]'
              }`}
            >
              Auditor Queue ({flaggedProjects.length})
            </button>
          )}

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeTab === 'calculator' ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/30' : 'text-[#8FA79A]'
            }`}
          >
            Cost & Speed Calculator
          </button>

          <button
            onClick={() => setActiveTab('intelligence')}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeTab === 'intelligence' ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/30' : 'text-[#8FA79A]'
            }`}
          >
            Risk Intelligence
          </button>
        </div>

        {/* User Session Info & Logout */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#0F1C15] border border-[#EAF3EE]/10 text-xs font-mono text-[#EAF3EE]">
            <User className="w-3.5 h-3.5 text-[#2FE8B0]" />
            <span>{sessionUser?.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-[#0F1C15] border border-[#EAF3EE]/10 text-[#8FA79A] hover:text-[#E85B4F] hover:border-[#E85B4F]/40 transition-all"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Region State Filter Control Bar (Fix #1) */}
        <div className="p-4 rounded-2xl bg-[#0F1C15] border border-[#2FE8B0]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="text-[#5C7268]">ACTIVE REGIONAL DATASET:</span>
            <span className="px-2.5 py-1 rounded bg-[#142A1F] text-[#2FE8B0] font-bold border border-[#2FE8B0]/30">
              {selectedRegion.toUpperCase()} ({stats?.projectCount || projects.length} PROJECTS)
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-[#8FA79A] mr-2">Filter Region:</span>
            {['All', 'S. America', 'Africa', 'SE Asia'].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedRegion === r
                    ? 'bg-[#2FE8B0] text-[#0A120E] font-bold glow-teal-sm'
                    : 'bg-[#0A120E] text-[#8FA79A] hover:text-[#EAF3EE] border border-[#EAF3EE]/10'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Live Region Stat Strip (Driven by SQLite query) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="p-5 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-1">
            <span className="text-[10px] text-[#5C7268] uppercase">Monitored Area</span>
            <p className="text-2xl font-bold text-[#2FE8B0]">
              {(stats?.totalHectares || 0).toLocaleString('en-US')} Ha
            </p>
            <p className="text-[11px] text-[#8FA79A]">Scoped to {selectedRegion}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-1">
            <span className="text-[10px] text-[#5C7268] uppercase">Average Confidence</span>
            <p className="text-2xl font-bold text-[#E8B74F]">
              {stats?.avgRiskScore || 0}%
            </p>
            <p className="text-[11px] text-[#8FA79A]">AI Model Integrity</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-1">
            <span className="text-[10px] text-[#5C7268] uppercase">Active Anomalies</span>
            <p className="text-2xl font-bold text-[#E8894F]">
              {stats?.anomalyCount || 0} Events
            </p>
            <p className="text-[11px] text-[#8FA79A]">Real-Time SAR Stream</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-1">
            <span className="text-[10px] text-[#5C7268] uppercase">Verifiable Value</span>
            <p className="text-2xl font-bold text-[#EAF3EE]">
              ${stats?.verifiableValue || 0}M
            </p>
            <p className="text-[11px] text-[#8FA79A]">Asset Protection</p>
          </div>
        </div>

        {/* Auditor View (Auditor Role Default) */}
        {activeTab === 'auditor-queue' && (
          <AuditorWorkflow
            flaggedProjects={flaggedProjects}
            anomalies={anomalies}
            onAuditComplete={refreshData}
          />
        )}

        {/* Cost & Speed Calculator View */}
        {activeTab === 'calculator' && <CostCalculator />}

        {/* Mission Control Map View */}
        {activeTab === 'overview' && (
          <LiveMapSection
            onSelectProjectForPassport={(p) => {
              setSelectedProject(p);
              setActiveTab('passport');
            }}
          />
        )}

        {/* Digital Passport View */}
        {activeTab === 'passport' && selectedProject && (
          <CreditPassport
            credit={{
              id: `CP-2026-${selectedProject.id.split('-')[1]}-09412`,
              projectId: selectedProject.id,
              projectName: selectedProject.name,
              vintageYear: selectedProject.vintage,
              quantityTons: 10000,
              serialNumber: `VCS-994-${selectedProject.vintage}-${selectedProject.id.split('-')[1]}-009412`,
              merkleRootHash: `0x8f3c71a92e4b017f8d55c91b4028312c98a5e1104728abf942716492003c411b`,
              verificationScore: selectedProject.riskScore,
              status: selectedProject.trustStatus === 'VERIFIED' ? 'VERIFIED & AUDITED' : 'FLAGGED FOR REVIEW',
              issueDate: 'October 14, 2025',
              owner: 'NatureCorp ESG Global Fund',
              project: selectedProject,
            }}
            projectOverride={selectedProject}
          />
        )}

        {/* Risk Intelligence View */}
        {activeTab === 'intelligence' && (
          <RiskIntelligence
            onSelectProject={(p) => {
              setSelectedProject(p);
              setActiveTab('passport');
            }}
          />
        )}
      </main>

      {/* Hidden Pitch Demo Control Panel (Ctrl+Shift+D) */}
      <DemoControlPanel onTriggerEvent={refreshData} />

      <Footer />
    </div>
  );
}
