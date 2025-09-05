import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withAuth, withoutAuth } from '@/lib/apiRouteWrapper';

export const POST = withAuth(async (request: NextRequest, token: string) => {
    try {
        return await forwardToBackend(request, token, '/api/auth/logout', 'POST');
    } catch (_) {
        return NextResponse.json({ error: 'Failed to logout account due to server error.' }, { status: 500 });
    }
});