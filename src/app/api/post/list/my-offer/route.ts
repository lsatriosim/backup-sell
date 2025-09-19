import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withAuth, withoutAuth } from '@/lib/apiRouteWrapper';

export const GET = withAuth(async (request: NextRequest, token: string) => {
    try {
        return await forwardToBackend(request, token, `/api/post/my-offer`, 'GET');
    } catch (_) {
        return NextResponse.json(
            { error: 'Failed to fetch post list due to server error.' },
            { status: 500 }
        );
    }
});