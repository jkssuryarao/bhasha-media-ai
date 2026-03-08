import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    const res = await fetch(decodedUrl);
    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }
    const contentType = res.headers.get('content-type') || 'audio/mpeg';
    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Audio proxy error:', error);
    return new NextResponse(null, { status: 502 });
  }
}
