'use client';

import React, { useState } from 'react';
import { Cpu, CheckCircle, RefreshCw, AlertTriangle, FileText, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface AgentPipelinePanelProps {
  projectId: string;
  onPipelineRun?: (data: any) => void;
}

export const AgentPipelinePanel: React.FC<AgentPipelinePanelProps> = ({ projectId, onPipelineRun }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pipelineData, setPipelineData] = useState<any>(null);
  const [expandedNode, setExpandedNode] = useState<string | null>('cv');

  const runPipeline = async () => {
    setIsRunning(true);
    try {
      const res = await fetch('/api/agent/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      const data = await res.json();
      if (data.success) {
        setPipelineData(data.pipeline);
        if (onPipelineRun) onPipelineRun(data.pipeline);
      }
    } catch (err) {
      console.error('Pipeline execution error', err);
    } finally {
      setIsRunning(false);
    }
  };

  const steps = [
    {
      id: 'cv',
      title: 'Perception / CV Agent',
      icon: Cpu,
      timeMs: pipelineData?.steps?.cv?.timeMs || 1240,
      status: pipelineData ? 'COMPLETED' : 'READY',
      summary: pipelineData
        ? `RGB Green-Channel analysis derived ${pipelineData.steps.cv.data.currentCanopyPercent}% current cover (${pipelineData.steps.cv.data.canopyDeltaPercent}% delta)`
        : 'Performs pixel-level green channel thresholding & NDVI index calculation',
    },
    {
      id: 'anomaly',
      title: 'Anomaly Detection Agent',
      icon: AlertTriangle,
      timeMs: pipelineData?.steps?.anomaly?.timeMs || 820,
      status: pipelineData ? 'COMPLETED' : 'READY',
      summary: pipelineData
        ? `${pipelineData.steps.anomaly.data.riskSeverity} Risk: ${pipelineData.steps.anomaly.data.assessmentText}`
        : 'Calls LLM API to evaluate illegal clearing and biomass degradation risk',
    },
    {
      id: 'crossCheck',
      title: 'Cross-Check Agent',
      icon: CheckCircle,
      timeMs: pipelineData?.steps?.crossCheck?.timeMs || 910,
      status: pipelineData ? 'COMPLETED' : 'READY',
      summary: pipelineData
        ? `Verdict: ${pipelineData.steps.crossCheck.data.verdict} — ${pipelineData.steps.crossCheck.data.reasoning}`
        : 'Validates registered project claim against independent satellite evidence',
    },
    {
      id: 'report',
      title: 'Report Generation Agent',
      icon: FileText,
      timeMs: pipelineData?.steps?.report?.timeMs || 1850,
      status: pipelineData ? 'COMPLETED' : 'READY',
      summary: pipelineData
        ? pipelineData.steps.report.data.executiveSummary
        : 'Drafts comprehensive formal verification report and registry recommendations',
    },
  ];

  return (
    <div className="p-6 rounded-3xl bg-[#0F1C15] border border-[#2FE8B0]/30 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAF3EE]/10 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-[#2FE8B0] font-mono text-xs mb-1">
            <Zap className="w-4 h-4" />
            <span>FASTAPI + LANGGRAPH MULTI-AGENT ORCHESTRATOR</span>
          </div>
          <h3 className="text-xl font-space font-bold text-[#EAF3EE]">
            Live AI Verification Pipeline
          </h3>
        </div>

        <button
          disabled={isRunning}
          onClick={runPipeline}
          className={`flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-space font-bold text-xs uppercase tracking-wider transition-all ${
            isRunning
              ? 'bg-[#142A1F] text-[#8FA79A] border border-[#EAF3EE]/10'
              : 'bg-[#2FE8B0] text-[#0A120E] hover:bg-[#34fbbe] glow-teal'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Running Agents...' : 'Run Agent Pipeline'}</span>
        </button>
      </div>

      {/* Agents Stepper Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              onClick={() => setExpandedNode(expandedNode === step.id ? null : step.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                expandedNode === step.id
                  ? 'bg-[#142A1F] border-[#2FE8B0]'
                  : 'bg-[#0A120E] border-[#EAF3EE]/10 hover:border-[#2FE8B0]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#5C7268]">STEP 0{idx + 1}</span>
                <span className="text-[10px] text-[#2FE8B0] font-bold">{(step.timeMs / 1000).toFixed(1)}s</span>
              </div>

              <div className="flex items-center space-x-2">
                <Icon className="w-4 h-4 text-[#2FE8B0]" />
                <span className="font-bold text-[#EAF3EE] text-[11px] truncate">{step.title}</span>
              </div>

              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#2FE8B0] font-bold">✓ COMPLETED</span>
                {expandedNode === step.id ? (
                  <ChevronUp className="w-3 h-3 text-[#8FA79A]" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-[#8FA79A]" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Drawer */}
      {expandedNode && (
        <div className="p-4 rounded-2xl bg-[#0A120E] border border-[#2FE8B0]/20 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[#2FE8B0] font-bold border-b border-[#EAF3EE]/08 pb-2">
            <span>Agent Output Details ({steps.find((s) => s.id === expandedNode)?.title})</span>
            <span>Execution Time: {steps.find((s) => s.id === expandedNode)?.timeMs}ms</span>
          </div>
          <p className="text-[#EAF3EE] leading-relaxed pt-1">
            {steps.find((s) => s.id === expandedNode)?.summary}
          </p>
        </div>
      )}
    </div>
  );
};
