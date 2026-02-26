import { NextRequest, NextResponse } from 'next/server';
import { fetchProfiles } from '@erasys-monorepo/shared-profiles';

const ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN || '*';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET(_req: NextRequest) {
  try {
    const profiles = await fetchProfiles();

    return NextResponse.json(profiles, {
      headers: {
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      },
    });
  } catch (error) {
    console.error('Failed to fetch profiles', error);
    return NextResponse.json(
      { message: 'Failed to fetch profiles' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        },
      },
    );
  }
}
