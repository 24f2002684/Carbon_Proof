import { generateLlmCompletion } from './llmClient';
import { CvAnalysisResult } from './cvAgent';

export interface AnomalyAgentResult {
  riskSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  assessmentText: string;
  flaggedSectors: string[];
  executionTimeMs: number;
}

export async function runAnomalyDetectionAgent(
  projectName: string,
  cvResult: CvAnalysisResult,
  riskScore: number
): Promise<AnomalyAgentResult> {
  const startTime = Date.now();

  const prompt = `[Anomaly Detection Agent Prompt]
Project Name: ${projectName}
Current Risk Score: ${riskScore}/100
Baseline Canopy: ${cvResult.baselineCanopyPercent}%
Current Canopy: ${cvResult.currentCanopyPercent}%
Canopy Change Delta: ${cvResult.canopyDeltaPercent}%
Baseline NDVI: ${cvResult.baselineNdvi}
Current NDVI: ${cvResult.currentNdvi}

Instruct: Assess whether this canopy change represents an illegal clearing risk, degradation event, or normal seasonal variation. Explain why in 2-3 concise sentences.`;

  const systemPrompt = 'You are the CarbonProof Anomaly Detection Agent. Provide concise, expert risk analysis.';
  const assessmentText = await generateLlmCompletion(prompt, systemPrompt);

  const severity = cvResult.canopyDeltaPercent < -15.0 ? 'HIGH' : cvResult.canopyDeltaPercent < -5.0 ? 'MEDIUM' : 'LOW';

  return {
    riskSeverity: severity,
    assessmentText,
    flaggedSectors: cvResult.canopyDeltaPercent < -10.0 ? ['Sector 4B (NW Boundary)', 'Sector 7 (Perimeter)'] : ['Sector 1 (Stable)'],
    executionTimeMs: Date.now() - startTime,
  };
}
