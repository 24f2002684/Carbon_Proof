import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() || '';

    if (!query) {
      return NextResponse.json({ success: true, results: [], suggestions: [] });
    }

    const cleanQuery = query.toUpperCase();

    // Query projects by ID, name, location, or region code
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { id: { contains: cleanQuery } },
          { name: { contains: query } },
          { location: { contains: query } },
          { region: { contains: query } },
        ],
      },
      include: {
        credits: true,
      },
      take: 10,
    });

    const formattedResults = projects.map((p) => ({
      ...p,
      coordinates: [p.latitude, p.longitude] as [number, number],
      creditId: p.credits[0]?.id || `CP-2026-${p.id.split('-')[1] || 'AMZ'}-09412`,
    }));

    const suggestions = projects.slice(0, 5).map((p) => ({
      id: p.id,
      name: p.name,
      creditId: p.credits[0]?.id || `CP-2026-${p.id.split('-')[1] || 'AMZ'}-09412`,
      region: p.region,
    }));

    return NextResponse.json({
      success: true,
      query,
      count: formattedResults.length,
      results: formattedResults,
      suggestions,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
