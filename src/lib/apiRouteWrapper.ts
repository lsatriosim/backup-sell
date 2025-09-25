// lib/apiRouteWrapper.ts
import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';



// Define a type for your authenticated API route handler.
// It receives the NextRequest and the token string.
type AuthenticatedApiHandler<P extends Record<string, string>> = (
  request: NextRequest,
  token: string,
  params: P
) => Promise<Response | NextResponse>;
type NonAuthenticatedApiHandler = (request: NextRequest) => Promise<Response | NextResponse>;

/**
 * A wrapper for Next.js API route handlers that requires authentication.
 * It extracts the token from cookies and passes it to the handler.
 * If no token is found, it returns an Unauthorized response.
 *
 * @param handler The actual API route logic that takes NextRequest and the token.
 * @returns A Next.js API route handler (GET, POST, etc.)
 */
export function withAuth<P extends Record<string, string>>(
  handler: AuthenticatedApiHandler<P>
): (request: NextRequest, context: { params: Promise<P> }) => Promise<Response | NextResponse> {
  return async function (
    request: NextRequest,
    context: { params: Promise<P> }
  ): Promise<Response | NextResponse> {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
    }

    try {
      const resolvedParams = await context.params;
      return await handler(request, token, resolvedParams);
    } catch (error) {
      console.error(`Error in authenticated API route handler for ${request.url}:`, error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  };
}


export function withoutAuth(handler: NonAuthenticatedApiHandler) {
    return async function (request: NextRequest) {
        try {
            return await handler(request);
        } catch (error) {
            console.error(`Error in non authenticated API route handler for ${request.url}:`, error);
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
}

/**
 * Forward request to backend API and safely return JSON
 * - Removes problematic headers like content-encoding/content-length
 * - Handles optional token
 */
export async function forwardToBackend(
  request: NextRequest,
  token: string | null,
  backendPath: string,
  method: string,
  body?: unknown
) {
  const backendUrl = process.env.BACKEND_URL;
  const url = `${backendUrl}${backendPath}`;

  let headers: HeadersInit;

  if (token != null) {
    headers = {
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`,
    };
  } else {
    headers = {
      'Content-Type': 'application/json',
    };
  }

  let requestBody: string | undefined;
  if (body !== undefined) {
    requestBody = JSON.stringify(body);
  } else {
    const requestMethod = request.method.toUpperCase();
    const contentType = request.headers.get('content-type');

    const isMethodThatCanHaveBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(requestMethod);
    const isJsonContentType = contentType?.includes('application/json');

    if (isMethodThatCanHaveBody && isJsonContentType) {
      try {
        const jsonContent = await request.json();
        requestBody = JSON.stringify(jsonContent);
      } catch (e: unknown) {
        if (e instanceof SyntaxError && e.message.includes('Unexpected end of JSON input')) {
          console.warn(`[forwardToBackend] Empty or malformed JSON body for ${request.method} ${request.url}. Proceeding without body.`);
        } else {
          console.error(`[forwardToBackend] Error parsing JSON body for ${request.method} ${request.url}:`, e);
        }
      }
    }
  }

  const init: RequestInit = {
    method: method,
    headers,
    body: requestBody,
    cache: request.method === 'GET' ? 'no-store' : undefined,
  };

  try {
    const backendResponse = await fetch(url, init);

    // Strip problematic headers when re-wrapping JSON
    const responseHeaders = new Headers();
    backendResponse.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey === 'set-cookie') {
        responseHeaders.append(key, value);
      } else if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(lowerKey)) {
        responseHeaders.set(key, value);
      }
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(`Error forwarding request to backend ${url}:`, error);
    return NextResponse.json({ message: 'Error communicating with backend' }, { status: 500 });
  }
}