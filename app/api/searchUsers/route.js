import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        let sqlQuery = 'SELECT * FROM members';

        const values = [];
        if (search) {
            sqlQuery += ` WHERE username ILIKE $1`;
            values.push(`${search}%`);
        }

        const result = await query(sqlQuery, values);
        
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching members:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}