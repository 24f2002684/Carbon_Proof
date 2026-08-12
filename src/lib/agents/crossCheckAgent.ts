import { generateLlmCompletion } from './llmClient';
import { CvAnalysisResult } from './cvAgent';

export interface CrossCheckAgentResult {
  verdict: 'CONSISTENT' | 'INCONSISTENT' | 'NEEDS_REVIEW';
  reasoning: string;
  claimStatement: string;
  evidenceSummary: string;
  executionTimeMs: number;
}

export async function runCrossCheckAgent(
  projectName: string,
  claimStatement: string,
  cvResult: CvAnalysisResult
): Promise<CrossCheckAgentResult> {
  const startTime = Date.now();

  const evidenceSummary = `Multi-spectral satellite analysis confirms ${cvResult.currentCanopyPercent}% canopy cover (${cvResult.canopyDeltaPercent}% change from baseline). NDVI index is ${cvResult.currentNdvi}.`;

  const prompt = `[Cross-Check Agent Prompt]
Project: ${projectName}
Registered Claim: "${claimStatement}"
Observed Physical Evidence: ${evidenceSummary}

Instruct: Compare the project's registered claim against the satellite evidence. Return a formal verdict (CONSISTENT, INCONSISTENT, or NEEDS_REVIEW) followed by 2 sentences explaining the discrepancy or validation.`;

  const systemPrompt = 'You are the CarbonProof QA/Cross-Check Agent. Validate project claims against independent physical satellite evidence.';
  const reasoning = await generateLlmCompletion(prompt, systemPrompt);

  let verdict: 'CONSISTENT' | 'INCONSISTENT' | 'NEEDS_REVIEW' = 'CONSISTENT';
  if (cvResult.canopyDeltaPercent < -10.0) {
    verdict = 'INCONSISTENT';
  } else if (cvResult.canopyDeltaPercent < -3.0) {
    verdict = 'NEEDS_REVIEW';
  }

  return {
    verdict,
    reasoning,
    claimStatement,
    evidenceSummary,
    executionTimeMs: Date.now() - startTime,
  };
}
