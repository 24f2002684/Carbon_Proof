import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    const where: any = {};

    if (region && region !== 'All') {
      where.region = region;
    }

    if (status && status !== 'All') {
      if (status === 'High Trust') {
        where.trustStatus = 'VERIFIED';
      } else if (status === 'Flagged') {
        where.trustStatus = { in: ['ELEVATED RISK', 'CRITICAL ANOMALY'] };
      }
    }

    if (type && type !== 'All') {
      where.type = type;
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        credits: true,
        telemetry: true,
        satelliteSnapshots: true,
        verificationLedger: {
          orderBy: { timestamp: 'desc' },
        },
        anomalies: {
          orderBy: { timestamp: 'desc' },
        },
      },
      orderBy: { riskScore: 'desc' },
    });

    const formattedProjects = projects.map((p) => ({
      ...p,
      coordinates: [p.latitude, p.longitude] as [number, number],
      telemetryHistory: p.telemetry || [],
    }));

    return NextResponse.json({ success: true, count: formattedProjects.length, projects: formattedProjects });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
