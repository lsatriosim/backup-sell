import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withAuth } from '@/lib/apiRouteWrapper';
import { UpdateProfileRequest } from '@/app/model/AuthModel';

export const POST = withAuth(async (request: NextRequest, token: string) => {
    let requestBody: UpdateProfileRequest;

    try {
        requestBody = await request.json();
    } catch (_) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (!requestBody.name || !requestBody.phone) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        return await forwardToBackend(request, token, '/api/auth/updateProfile', 'POST', requestBody);
    } catch (_) {
        return NextResponse.json({ error: 'Failed to register account due to server error.' }, { status: 500 });
    }
});