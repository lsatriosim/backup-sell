import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withAuth, withoutAuth } from '@/lib/apiRouteWrapper';

export const GET = withoutAuth(async (request: NextRequest) => {
    try {
        const url = new URL(request.url);
        const pathnameParts = url.pathname.split('/');
        const postId = pathnameParts[pathnameParts.length - 1];

        return await forwardToBackend(request, null, `/api/post/${postId}`, 'GET');
    } catch (_) {
        return NextResponse.json(
            { error: 'Failed to fetch post list due to server error.' },
            { status: 500 }
        );
    }
});