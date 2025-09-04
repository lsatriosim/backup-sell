import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withoutAuth } from '@/lib/apiRouteWrapper';
import { RegisterRequest } from '@/app/model/AuthModel';

export const POST = withoutAuth(async (request: NextRequest) => {
    let requestBody: RegisterRequest;

    try {
        requestBody = await request.json();
    } catch (_) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (!requestBody.email || !requestBody.name || !requestBody.password) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        return await forwardToBackend(request, null, '/api/auth/register', 'POST', requestBody);
    } catch (_) {
        return NextResponse.json({ error: 'Failed to register account due to server error.' }, { status: 500 });
    }
});