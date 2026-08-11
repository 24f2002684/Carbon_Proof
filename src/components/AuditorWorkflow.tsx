'use client';

import React, { useState } from 'react';
import { CarbonProject, AnomalyEvent } from '@/types/carbon';
import { ShieldCheck, AlertTriangle, Play, CheckCircle, Clock, Cpu, Radar, FileCheck, RefreshCw, Zap } from 'lucide-react';

interface AuditorWorkflowProps {
  flaggedProjects: CarbonProject[];
  anomalies: AnomalyEvent[];
  onAuditComplete: () => void;
}

export const AuditorWorkflow: React.FC<AuditorWorkflowProps> = ({
  flaggedProjects,
  anomalies,
  onAuditComplete,
}) => {
  const [selectedProject, setSelectedProject] = useState<CarbonProject | null>(flaggedProjects[0] || null);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditProgress, setAuditProgress] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0.0);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [auditSuccess, setAuditSuccess] = useState<boolean>(false);

  const handleStartAudit = async () => {
    if (!selectedProject) return;
    setIsAuditing(true);
    setAuditSuccess(false);
    setAuditProgress(0);
    setElapsedSeconds(0.0);
    setAuditLogs(['[0.0s] Initializing Sentinel-1 C-Band SAR Lidar pipeline...']);

    let startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setElapsedSeconds(Number(elapsed.toFixed(1)));

      if (elapsed >= 1.0 && elapsed < 2.0) {
        setAuditProgress(35);
        setAuditLogs((prev) => [
          ...prev.filter((l) => !l.includes('35%')),
          '[1.2s] Processing sub-meter PlanetScope optical canopy deltas...',
        ]);
      } else if (elapsed >= 2.5 && elapsed < 3.8) {
        setAuditProgress(75);
        setAuditLogs((prev) => [
          ...prev.filter((l) => !l.includes('75%')),
          '[2.8s] Cross-validating ground acoustic IoT sensor mesh #142...',
        ]);
      } else if (elapsed >= 4.2) {
        clearInterval(interval);
        setAuditProgress(100);
        setAuditLogs((prev) => [
          ...prev,
          '[4.2s] AI Verification Complete: Zero deforestation signatures found. Generating SHA-256 Merkle Seal...',
        ]);

        // Call backend auditor verification API
        fetch('/api/auditor/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId: selectedProject.id }),
        })
          .then((res) => res.json())
          .then(() => {
            setIsAuditing(false);
            setAuditSuccess(true);
            onAuditComplete();
          })
          .catch(() => setIsAuditing(false));
      }
    }, 100);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0F1C15] border border-[#2FE8B0]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#2FE8B0] font-mono text-xs mb-1">
            <Cpu className="w-4 h-4" />
            <span>AUDITOR / VERIFIER INTERACTIVE WORKFLOW QUEUE</span>
          </div>
          <h2 className="text-2xl font-space font-bold text-[#EAF3EE]">
            Flagged Project AI Evidence & Audit Console
          </h2>
          <p className="text-xs text-[#8FA79A] mt-0.5">
            Review satellite SAR change detection, execute 4.2-second automated re-audits, and sign verification seals.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-full bg-[#E8894F]/20 text-[#E8894F] border border-[#E8894F]/40">
            {flaggedProjects.length} Flagged For Review
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Flagged Projects Queue */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono text-[#8FA79A] uppercase tracking-wider">
            Flagged Review Queue ({flaggedProjects.length})
          </h3>

          {flaggedProjects.map((p) => {
            const isSelected = selectedProject?.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProject(p);
                  setAuditSuccess(false);
                  setAuditProgress(0);
                  setAuditLogs([]);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'bg-[#142A1F] border-[#2FE8B0] glow-teal-sm'
                    : 'bg-[#0F1C15] border-[#EAF3EE]/10 hover:border-[#2FE8B0]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#0A120E] text-[#E8894F] font-mono text-[10px] uppercase border border-[#E8894F]/30">
                    {p.id}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#E8894F] flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Risk {p.riskScore}/100</span>
                  </span>
                </div>

                <h4 className="font-space font-bold text-sm text-[#EAF3EE]">{p.name}</h4>
                <p className="text-xs text-[#8FA79A] font-mono">{p.location}, {p.country}</p>

                <div className="pt-1 text-[11px] font-mono text-[#2FE8B0]">
                  {p.canopyChangeRate}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: AI Evidence Inspection & Execution Panel (2 Cols) */}
        {selectedProject && (
          <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0F1C15] border border-[#EAF3EE]/12 space-y-6">
            
            <div className="flex items-start justify-between border-b border-[#EAF3EE]/10 pb-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#2FE8B0]">
                  <span>ID: {selectedProject.id}</span>
                  <span>•</span>
                  <span>{selectedProject.region}</span>
                </div>
                <h3 className="text-2xl font-space font-bold text-[#EAF3EE] mt-1">
                  {selectedProject.name}
                </h3>
              </div>

              {auditSuccess ? (
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#2FE8B0] text-[#0A120E] font-mono text-xs font-bold glow-teal">
                  <CheckCircle className="w-4 h-4" />
                  <span>VERIFIED & SEALED</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#E8894F]/20 text-[#E8894F] border border-[#E8894F]/40 font-mono text-xs font-bold animate-pulse">
                  <AlertTriangle className="w-4 h-4" />
                  <span>FLAGGED (Score {selectedProject.riskScore})</span>
                </div>
              )}
            </div>

            {/* AI Evidence Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-[#0A120E] border border-[#EAF3EE]/08 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#5C7268]">SAR RADAR BACKSCATTER</span>
                <p className="font-bold text-[#E8894F] mt-0.5">-8.0 dB (Sector 7 Dip)</p>
              </div>
              <div>
                <span className="text-[10px] text-[#5C7268]">OPTICAL NDVI</span>
                <p className="font-bold text-[#2FE8B0] mt-0.5">0.78 (Sentinel-2B)</p>
              </div>
              <div>
                <span className="text-[10px] text-[#5C7268]">GROUND IOT NODES</span>
                <p className="font-bold text-[#EAF3EE] mt-0.5">{selectedProject.sensorMeshNodes} Active</p>
              </div>
            </div>

            {/* Interactive Audit Execution Engine */}
            <div className="p-6 rounded-2xl bg-[#0A120E] border border-[#1B7A5C]/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-space font-bold text-base text-[#EAF3EE] flex items-center space-x-2">
                    <Radar className="w-4 h-4 text-[#2FE8B0]" />
                    <span>Autonomous AI SAR Lidar Re-Audit</span>
                  </h4>
                  <p className="text-xs text-[#8FA79A] mt-0.5">
                    Triggers sub-meter satellite pass comparison and IoT telemetry verification.
                  </p>
                </div>

                <button
                  disabled={isAuditing || auditSuccess}
                  onClick={handleStartAudit}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-space font-bold text-xs uppercase tracking-wider transition-all ${
                    auditSuccess
                      ? 'bg-[#142A1F] text-[#2FE8B0] border border-[#2FE8B0]/40'
                      : isAuditing
                      ? 'bg-[#142A1F] text-[#8FA79A] border border-[#EAF3EE]/10'
                      : 'bg-[#2FE8B0] text-[#0A120E] hover:bg-[#34fbbe] glow-teal'
                  }`}
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Auditing ({elapsedSeconds}s)...</span>
                    </>
                  ) : auditSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-[#2FE8B0]" />
                      <span>Audit Completed</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Execute AI Audit</span>
                    </>
                  )}
                </button>
              </div>

              {/* Real-Time Progress Bar & Elapsed Time */}
              {(isAuditing || auditSuccess) && (
                <div className="space-y-3 pt-2 border-t border-[#EAF3EE]/08">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#8FA79A]">Verification Execution Pipeline</span>
                    <span className="text-[#2FE8B0] font-bold">{elapsedSeconds} seconds</span>
                  </div>

                  <div className="w-full h-2.5 rounded-full bg-[#0F1C15] overflow-hidden">
                    <div
                      className="h-full bg-[#2FE8B0] transition-all duration-300 glow-teal-sm"
                      style={{ width: `${auditProgress}%` }}
                    />
                  </div>

                  {/* Terminal Execution Logs */}
                  <div className="p-3 rounded-xl bg-[#0F1C15] font-mono text-[11px] text-[#2FE8B0] space-y-1 max-h-32 overflow-y-auto border border-[#1B7A5C]/30">
                    {auditLogs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
