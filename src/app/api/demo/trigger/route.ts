import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const projectId = body.projectId || 'CP-AMZ-8841';

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Toggle project status between VERIFIED and ELEVATED RISK
    const isCurrentlyVerified = project.trustStatus === 'VERIFIED';
    const newStatus = isCurrentlyVerified ? 'ELEVATED RISK' : 'VERIFIED';
    const newScore = isCurrentlyVerified ? 62 : 96;
    const newRate = isCurrentlyVerified ? '-2.4% Sector 4 Clearing' : '+1.4% Biomass Growth';

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        trustStatus: newStatus,
        riskScore: newScore,
        canopyChangeRate: newRate,
        lastScanDate: 'Just now (Live Pitch Simulation)',
        verificationLedger: {
          create: {
            timestamp: new Date().toISOString(),
            title: isCurrentlyVerified ? 'Canopy Depression Anomaly Detected' : 'Live Verification Audit Clear',
            source: 'AI Risk Engine',
            status: isCurrentlyVerified ? 'WARNING' : 'VERIFIED',
            hash: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
            description: isCurrentlyVerified
              ? 'Simulated canopy thinning event flagged by PlanetScope 3m resolution stream.'
              : 'Simulated verification audit successfully re-cleared project canopy integrity.',
          },
        },
      },
    });

    if (isCurrentlyVerified) {
      await prisma.anomalyEvent.create({
        data: {
          projectId,
          projectName: project.name,
          timestamp: 'Just now',
          type: 'Canopy Loss',
          severity: 'high',
          status: 'ACTIVE',
          details: 'Live demo triggered anomaly: 2.8 hectare canopy disturbance detected via PlanetScope 3m stream.',
          coordinates: `${Math.abs(project.latitude).toFixed(2)}°S ${Math.abs(project.longitude).toFixed(2)}°W`,
        },
      });
    } else {
      await prisma.anomalyEvent.updateMany({
        where: { projectId, status: 'ACTIVE' },
        data: { status: 'RESOLVED' },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Demo trigger toggled status for ${project.name} to ${newStatus} (${newScore}/100)`,
      project: updatedProject,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Demo trigger failed' }, { status: 500 });
  }
}
