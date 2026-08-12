import { analyzeSatelliteCanopy, CvAnalysisResult } from './cvAgent';
import { runAnomalyDetectionAgent, AnomalyAgentResult } from './anomalyAgent';
import { runCrossCheckAgent, CrossCheckAgentResult } from './crossCheckAgent';
import { runReportGenerationAgent, ReportAgentResult } from './reportAgent';

export interface MultiAgentPipelineResult {
  projectId: string;
  projectName: string;
  totalTimeMs: number;
  steps: {
    cv: { status: 'COMPLETED'; timeMs: number; data: CvAnalysisResult };
    anomaly: { status: 'COMPLETED'; timeMs: number; data: AnomalyAgentResult };
    crossCheck: { status: 'COMPLETED'; timeMs: number; data: CrossCheckAgentResult };
    report: { status: 'COMPLETED'; timeMs: number; data: ReportAgentResult };
  };
}

export async function executeMultiAgentPipeline(
  projectId: string,
  projectName: string,
  claimStatement?: string,
  riskScore: number = 96
): Promise<MultiAgentPipelineResult> {
  const startTime = Date.now();

  const defaultClaim = claimStatement || 'Claims zero net deforestation across project boundary since 2022 vintage.';

  // Node 1: Computer Vision / Perception Agent
  const cvResult = await analyzeSatelliteCanopy();

  // Node 2: Anomaly Detection Agent
  const anomalyResult = await runAnomalyDetectionAgent(projectName, cvResult, riskScore);

  // Node 3: QA / Cross-Check Agent
  const crossCheckResult = await runCrossCheckAgent(projectName, defaultClaim, cvResult);

  // Node 4: Report Generation Agent
  const reportResult = await runReportGenerationAgent(projectName, projectId, cvResult, anomalyResult, crossCheckResult);

  const totalTimeMs = Date.now() - startTime;

  return {
    projectId,
    projectName,
    totalTimeMs,
    steps: {
      cv: { status: 'COMPLETED', timeMs: cvResult.analysisTimeMs, data: cvResult },
      anomaly: { status: 'COMPLETED', timeMs: anomalyResult.executionTimeMs, data: anomalyResult },
      crossCheck: { status: 'COMPLETED', timeMs: crossCheckResult.executionTimeMs, data: crossCheckResult },
      report: { status: 'COMPLETED', timeMs: reportResult.executionTimeMs, data: reportResult },
    },
  };
}
