import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
    try {
        const result = await query('SELECT id, username, profile_image_url, company FROM members ORDER BY RANDOM()');
        
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching members:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

