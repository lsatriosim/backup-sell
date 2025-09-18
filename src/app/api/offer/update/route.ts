import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withAuth } from '@/lib/apiRouteWrapper';

export const POST = withAuth(async (request: NextRequest, token: string) => {
    try {
        return await forwardToBackend(request, token, `/api/offer/update`, 'POST');
    } catch (_) {
        return NextResponse.json(
            { error: 'Failed to fetch post list due to server error.' },
            { status: 500 }
        );
    }
});