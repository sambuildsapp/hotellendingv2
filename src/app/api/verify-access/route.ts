import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { code } = await request.json();
        const validCode = process.env.ACCESS_CODE;

        // Default code if none set for local testing
        const secretCode = validCode || 'demo2026';

        if (code === secretCode) {
            const response = NextResponse.json({ success: true });

            // Set a secure cookie that expires in 7 days
            response.cookies.set('demo_access', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ success: false }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
