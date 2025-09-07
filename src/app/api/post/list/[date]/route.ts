import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withAuth } from '@/lib/apiRouteWrapper';

export const GET = withAuth(async (request: NextRequest, token: string) => {
    try {
        const url = new URL(request.url);
        const pathnameParts = url.pathname.split('/');
        const date = pathnameParts[pathnameParts.length - 1];

        return await forwardToBackend(request, token, `/api/post/list/${date}`, 'GET');
    } catch (_) {
        return NextResponse.json(
            { error: 'Failed to fetch post list due to server error.' },
            { status: 500 }
        );
    }
});