// app/api/index/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('You have successfully connected to Bitrix API');
    return NextResponse.json({ message: 'Welcome to the Bitrix Auth API' });
}

