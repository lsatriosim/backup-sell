import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withAuth} from '@/lib/apiRouteWrapper';

export const GET = withAuth(async (request: NextRequest, token: string) => {
    try {
        return await forwardToBackend(request, token, '/api/auth/get-profile', 'GET');
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to register account due to server error.' }, { status: 500 });
    }
});