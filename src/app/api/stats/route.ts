import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');

    const where: any = {};
    if (region && region !== 'All') {
      where.region = region;
    }

    const projects = await prisma.project.findMany({
      where,
      select: {
        areaHectares: true,
        riskScore: true,
        carbonCreditsIssued: true,
      },
    });

    const totalHectares = projects.reduce((acc, p) => acc + p.areaHectares, 0);
    const avgRiskScore = projects.length
      ? (projects.reduce((acc, p) => acc + p.riskScore, 0) / projects.length).toFixed(1)
      : '0.0';
    const totalCredits = projects.reduce((acc, p) => acc + p.carbonCreditsIssued, 0);
    const verifiableValue = ((totalCredits * 15) / 1000000).toFixed(1); // $15 per ton average

    const anomalyWhere: any = {};
    if (region && region !== 'All') {
      anomalyWhere.project = { region };
    }
    const anomalyCount = await prisma.anomalyEvent.count({
      where: anomalyWhere,
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalHectares,
        avgRiskScore: parseFloat(avgRiskScore),
        anomalyCount,
        verifiableValue: parseFloat(verifiableValue),
        projectCount: projects.length,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to compute stats' }, { status: 500 });
  }
}
