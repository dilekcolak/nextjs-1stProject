import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const result = await query('SELECT * FROM members WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return NextResponse.json({ message: 'Kullanıcı bulunamadı' }, { status: 404 });
        }
        
        return NextResponse.json(result.rows[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching member:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}