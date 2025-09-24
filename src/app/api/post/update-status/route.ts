import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withAuth } from '@/lib/apiRouteWrapper';
import { UpdatePostStatusDTO } from '@/app/model/PostModel';

export const POST = withAuth(async (request: NextRequest, token: string) => {
    let requestBody: UpdatePostStatusDTO;

    try {
        requestBody = await request.json();
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    try {
        return await forwardToBackend(request, token, '/api/post/update-status', 'POST', requestBody);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update post status due to server error.' }, { status: 500 });
    }
});