import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    let credit = await prisma.credit.findUnique({
      where: { id },
      include: {
        project: {
          include: {
            telemetry: true,
            satelliteSnapshots: true,
            verificationLedger: {
              orderBy: { timestamp: 'desc' },
            },
            anomalies: {
              orderBy: { timestamp: 'desc' },
            },
          },
        },
      },
    });

    // If matching credit not found by exact ID, attempt lookup by project ID
    if (!credit) {
      const project = await prisma.project.findUnique({
        where: { id },
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
      });

      if (project && project.credits.length > 0) {
        credit = {
          ...project.credits[0],
          project,
        };
      }
    }

    if (!credit) {
      return NextResponse.json({ error: 'Credit Passport not found' }, { status: 404 });
    }

    const formattedCredit = {
      ...credit,
      project: {
        ...credit.project,
        coordinates: [credit.project.latitude, credit.project.longitude] as [number, number],
        telemetryHistory: credit.project.telemetry || [],
      },
    };

    return NextResponse.json({ success: true, credit: formattedCredit });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch credit passport' }, { status: 500 });
  }
}
