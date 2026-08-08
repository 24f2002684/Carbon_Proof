'use client';

import React, { useState } from 'react';
import { MOCK_PROJECTS, MOCK_ANOMALIES } from '@/data/mockData';
import { CarbonProject, AnomalyEvent } from '@/types/carbon';
import { ShieldCheck, AlertTriangle, Activity, Filter, ArrowUpDown, Bell, Radio, CheckCircle, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface RiskIntelligenceProps {
  onSelectProject: (project: CarbonProject) => void;
}

export const RiskIntelligence: React.FC<RiskIntelligenceProps> = ({ onSelectProject }) => {
  const [sortKey, setSortKey] = useState<'riskScore' | 'areaHectares' | 'name'>('riskScore');
  const [anomalies, setAnomalies] = useState<AnomalyEvent[]>(MOCK_ANOMALIES);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Sorting projects
  const sortedProjects = [...MOCK_PROJECTS].sort((a, b) => {
    if (sortKey === 'riskScore') return b.riskScore - a.riskScore;
    if (sortKey === 'areaHectares') return b.areaHectares - a.areaHectares;
    return a.name.localeCompare(b.name);
  });

  // Chart data: Continuous AI vs Paper Audit Gap
  const chartData = [
    { month: 'Jan', continuousAI: 96, paperAuditLag: 96, canopyRisk: 1 },
    { month: 'Feb', continuousAI: 96, paperAuditLag: 96, canopyRisk: 1 },
    { month: 'Mar', continuousAI: 95, paperAuditLag: 96, canopyRisk: 2 },
    { month: 'Apr', continuousAI: 91, paperAuditLag: 96, canopyRisk: 8 }, // Anomaly occurs, AI detects immediately, paper audit misses!
    { month: 'May', continuousAI: 68, paperAuditLag: 96, canopyRisk: 22 },
    { month: 'Jun', continuousAI: 68, paperAuditLag: 96, canopyRisk: 22 },
    { month: 'Jul', continuousAI: 72, paperAuditLag: 96, canopyRisk: 18 },
    { month: 'Aug', continuousAI: 84, paperAuditLag: 96, canopyRisk: 10 },
    { month: 'Sep (Paper Audit)', continuousAI: 84, paperAuditLag: 84, canopyRisk: 10 }, // Paper audit finally discovers 6 months late!
  ];

  return (
    <section id="intelligence-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAF3EE]/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-[#E8B74F] font-mono text-xs mb-2">
            <Radio className="w-4 h-4 animate-pulse text-[#2FE8B0]" />
            <span>PORTFOLIO-WIDE RISK & ANOMALY INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-space font-bold text-[#EAF3EE]">
            Continuous Risk Analytics
          </h2>
          <p className="text-sm text-[#8FA79A] mt-1">
            Eliminating the 12-month paper audit blindspot with real-time satellite radar anomaly feeds.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 p-1.5 rounded-xl bg-[#0F1C15] border border-[#EAF3EE]/10 text-xs font-mono">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#5C7268]" />
            <span className="text-[#5C7268]">Sort by:</span>
            <button
              onClick={() => setSortKey('riskScore')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                sortKey === 'riskScore' ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/30' : 'text-[#8FA79A]'
              }`}
            >
              Risk Score
            </button>
            <button
              onClick={() => setSortKey('areaHectares')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                sortKey === 'areaHectares' ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/30' : 'text-[#8FA79A]'
              }`}
            >
              Area (Ha)
            </button>
          </div>
        </div>
      </div>

      {/* Large Data Visualization: Continuous AI vs Paper Audit Blindspot */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1C15] border border-[#EAF3EE]/12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-space font-bold text-xl text-[#EAF3EE] flex items-center space-x-2">
              <Activity className="w-5 h-5 text-[#2FE8B0]" />
              <span>Continuous AI Scan vs Traditional 1-Year Paper Audit Delay</span>
            </h3>
            <p className="text-xs text-[#8FA79A] mt-1">
              Demonstrates how CarbonProof immediately flags Rimba Raya canopy depression in April, while paper audits remain blind until September.
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="flex items-center space-x-1.5 text-[#2FE8B0]">
              <span className="w-3 h-3 rounded-full bg-[#2FE8B0]" />
              <span>CarbonProof Live AI</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[#E8894F]">
              <span className="w-3 h-3 rounded-full bg-[#E8894F]" />
              <span>Legacy Paper Audit</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <XAxis dataKey="month" stroke="#5C7268" fontSize={11} />
              <YAxis domain={[50, 100]} stroke="#5C7268" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0A120E', borderColor: '#2FE8B0', borderRadius: '8px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="continuousAI" stroke="#2FE8B0" strokeWidth={3} fillOpacity={0.15} fill="#2FE8B0" name="CarbonProof Score" />
              <Line type="stepAfter" dataKey="paperAuditLag" stroke="#E8894F" strokeWidth={2} strokeDasharray="5 5" name="Legacy Paper Audit (1yr Lag)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Project Risk Cards + Live Anomaly Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Project Risk Cards Grid (2 Cols) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sortedProjects.map((project) => {
            const isVerified = project.trustStatus === 'VERIFIED';
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="p-5 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 hover:border-[#2FE8B0]/40 transition-all cursor-pointer group space-y-4 shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#142A1F] text-[#2FE8B0] font-mono text-[10px] uppercase border border-[#2FE8B0]/20">
                      {project.id}
                    </span>
                    <h4 className="font-space font-bold text-base text-[#EAF3EE] mt-1 group-hover:text-[#2FE8B0] transition-colors">
                      {project.name}
                    </h4>
                    <p className="text-xs text-[#8FA79A] font-mono">{project.country}</p>
                  </div>

                  <div
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                      isVerified
                        ? 'bg-[#E8B74F]/15 text-[#E8B74F] border border-[#E8B74F]/30'
                        : 'bg-[#E8894F]/15 text-[#E8894F] border border-[#E8894F]/30'
                    }`}
                  >
                    {isVerified ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    <span>{project.riskScore}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EAF3EE]/08 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[#5C7268]">CANOPY DELTA</span>
                    <p className="text-[#2FE8B0] font-bold text-[11px] mt-0.5">{project.canopyChangeRate}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5C7268]">SENSORS ACTIVE</span>
                    <p className="text-[#EAF3EE] font-bold text-[11px] mt-0.5">{project.sensorMeshNodes} Nodes</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Streaming Live Anomaly Feed (1 Col) */}
        <div className="p-6 rounded-2xl bg-[#0F1C15] border border-[#EAF3EE]/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-space font-bold text-lg text-[#EAF3EE] flex items-center space-x-2">
              <Bell className="w-4 h-4 text-[#E8894F]" />
              <span>Live Anomaly Stream</span>
            </h3>
            <span className="flex items-center space-x-1.5 font-mono text-[10px] text-[#2FE8B0]">
              <span className="w-2 h-2 rounded-full bg-[#2FE8B0] animate-ping" />
              <span>REALTIME</span>
            </span>
          </div>

          <div className="space-y-3">
            {anomalies.map((ano) => (
              <div
                key={ano.id}
                className="p-3.5 rounded-xl bg-[#0A120E] border border-[#EAF3EE]/08 space-y-2 hover:border-[#2FE8B0]/30 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#E8894F] font-semibold">{ano.type}</span>
                  <span className="font-mono text-[10px] text-[#5C7268]">{ano.timestamp}</span>
                </div>
                <p className="text-xs text-[#EAF3EE] font-space font-semibold">{ano.projectName}</p>
                <p className="text-[11px] text-[#8FA79A] leading-relaxed">{ano.details}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-[#5C7268]">
                  <span>{ano.coordinates}</span>
                  <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                    ano.status === 'ACTIVE' ? 'bg-[#E8894F]/20 text-[#E8894F]' : 'bg-[#142A1F] text-[#2FE8B0]'
                  }`}>
                    {ano.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
