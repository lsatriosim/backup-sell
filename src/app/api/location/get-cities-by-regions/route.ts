import { NextRequest, NextResponse } from 'next/server';
import { forwardToBackend, withoutAuth } from '@/lib/apiRouteWrapper';

export const GET = withoutAuth(async (request: NextRequest) => {
    try {
        return await forwardToBackend(request, null, `/api/location/get-cities-by-regions`, 'GET');
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: 'Failed to fetch cities by region due to server error.' },
            { status: 500 }
        );
    }
});