import { NextResponse } from 'next/server';
import { executeMultiAgentPipeline } from '@/lib/agents/orchestrator';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { projectId } = await request.json().catch(() => ({}));

    const targetId = projectId || 'CP-AMZ-8841';

    const project = await prisma.project.findUnique({
      where: { id: targetId },
    });

    const projectName = project?.name || 'Alto Mayo Amazon REDD+';
    const claimStatement = project?.claimStatement || 'Claims zero net deforestation across 182,400 hectares since 2022 vintage.';
    const riskScore = project?.riskScore || 96;

    const pipelineResult = await executeMultiAgentPipeline(
      targetId,
      projectName,
      claimStatement,
      riskScore
    );

    return NextResponse.json({
      success: true,
      pipeline: pipelineResult,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Multi-agent pipeline execution failed' }, { status: 500 });
  }
}
