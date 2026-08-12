import { generateLlmCompletion } from './llmClient';
import { CvAnalysisResult } from './cvAgent';
import { AnomalyAgentResult } from './anomalyAgent';
import { CrossCheckAgentResult } from './crossCheckAgent';

export interface ReportAgentResult {
  fullReportText: string;
  executiveSummary: string;
  recommendations: string[];
  executionTimeMs: number;
}

export async function runReportGenerationAgent(
  projectName: string,
  projectId: string,
  cvResult: CvAnalysisResult,
  anomalyResult: AnomalyAgentResult,
  crossCheckResult: CrossCheckAgentResult
): Promise<ReportAgentResult> {
  const startTime = Date.now();

  const prompt = `[Report Generation Agent Prompt]
Project: ${projectName} (${projectId})
Perception Metrics: Baseline Canopy ${cvResult.baselineCanopyPercent}%, Current Canopy ${cvResult.currentCanopyPercent}%, Delta ${cvResult.canopyDeltaPercent}%, Baseline NDVI ${cvResult.baselineNdvi}, Current NDVI ${cvResult.currentNdvi}
Anomaly Risk: ${anomalyResult.riskSeverity} - ${anomalyResult.assessmentText}
Cross-Check Verdict: ${crossCheckResult.verdict} - ${crossCheckResult.reasoning}

Instruct: Generate a comprehensive, 4-paragraph formal Carbon Credit Audit & Verification Report suitable for PDF download. Include Executive Summary, Optical & SAR Findings, Fraud & Anomaly Risk, and Final Registry Recommendation.`;

  const systemPrompt = 'You are the CarbonProof Report Generation Agent. Produce detailed, professional climate intelligence audit reports.';
  const fullReportText = await generateLlmCompletion(prompt, systemPrompt);

  const executiveSummary = `CarbonProof AI completed multi-spectral verification for ${projectName}. Computer Vision detected a ${cvResult.canopyDeltaPercent}% canopy coverage shift (${cvResult.currentCanopyPercent}% current cover). Anomaly Detection flagged ${anomalyResult.riskSeverity} risk in ${anomalyResult.flaggedSectors.join(', ')}. Cross-Check Agent verdict: ${crossCheckResult.verdict}.`;

  const recommendations = [
    `Deploy targeted drone SAR LIDAR sweep over ${anomalyResult.flaggedSectors[0] || 'Sector 4B'}.`,
    `Adjust credit trust score to ${cvResult.canopyDeltaPercent < -10 ? '62/100 (ELEVATED RISK)' : '96/100 (VERIFIED)'}.`,
    `Update cryptographic SHA-256 Merkle root hash on public registry ledger.`,
  ];

  return {
    fullReportText,
    executiveSummary,
    recommendations,
    executionTimeMs: Date.now() - startTime,
  };
}
