import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withAuth } from '@/lib/apiRouteWrapper';
import { LoginRequest } from '@/app/model/AuthModel';
import { CreatePostDto } from '@/app/model/PostModel';

export const POST = withAuth(async (request: NextRequest, token: string) => {
    let requestBody: CreatePostDto;

    try {
        requestBody = await request.json();
    } catch (_) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    try {
        return await forwardToBackend(request, token, '/api/post/create', 'POST', requestBody);
    } catch (_) {
        return NextResponse.json({ error: 'Failed to register account due to server error.' }, { status: 500 });
    }
});