import { NextRequest, NextResponse } from 'next/server';

const LAMBDA_URL = process.env.NEXT_PUBLIC_LAMBDA_URL || 
  'https://humutolm65f3ildxsj5pfy4ohu0dywdi.lambda-url.ap-southeast-2.on.aws/';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, language } = body;

    if (!prompt || !language) {
      return NextResponse.json(
        { error: 'Missing prompt or language' },
        { status: 400 }
      );
    }

    const url = LAMBDA_URL.replace(/\/$/, '');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, language }),
    });

    const text = await response.text();
    let data: Record<string, unknown>;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = {};
    }

    if (!response.ok) {
      const errMsg = (data as { message?: string; error?: string })?.message 
        || (data as { message?: string; error?: string })?.error 
        || text 
        || 'Lambda request failed';
      return NextResponse.json(
        { error: errMsg },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate content' },
      { status: 500 }
    );
  }
}
