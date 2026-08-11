import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');
    const status = searchParams.get('status');

    const where: any = {};
    if (region && region !== 'All') {
      where.project = { region };
    }
    if (status && status !== 'All') {
      where.status = status;
    }

    const anomalies = await prisma.anomalyEvent.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            region: true,
            riskScore: true,
            trustStatus: true,
          },
        },
      },
      orderBy: { timestamp: 'desc' },
      take: 20,
    });

    return NextResponse.json({ success: true, count: anomalies.length, anomalies });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch anomalies' }, { status: 500 });
  }
}
