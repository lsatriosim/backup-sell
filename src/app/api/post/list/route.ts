import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withAuth, withoutAuth} from '@/lib/apiRouteWrapper';

export const GET = withoutAuth(async (request: NextRequest) => {
    try {
        return await forwardToBackend(request, null, '/api/post/list', 'GET');
    } catch (_) {
        return NextResponse.json({ error: 'Failed to fetch post list due to server error.' }, { status: 500 });
    }
});