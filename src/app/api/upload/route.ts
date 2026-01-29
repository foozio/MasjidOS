
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { getAuthContext } from '@/lib/api-utils';

export const dynamic = 'force-dynamic'
export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const auth = await getAuthContext();

        if (!auth.isAuthenticated) {
            return auth.response;
        }

        // You can enforce tenant limits here if needed
        // e.g. check DB for storage usage or plan limits

        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname, clientPayload) => {
                // Authenticated user check is already done above via getAuthContext
                // We can add metadata to the file here if needed
                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                    tokenPayload: JSON.stringify({
                        userId: auth.userId,
                        tenantId: auth.tenantId,
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // This is called after the file is uploaded
                // You can run post-processing here if needed via webhook
                // For simple usage we just return
                try {
                    console.log('Upload completed:', blob.url);
                } catch (error) {
                    console.error('Error in onUploadCompleted:', error);
                }
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 }, // The webhook will retry 5 times automatically
        );
    }
}
