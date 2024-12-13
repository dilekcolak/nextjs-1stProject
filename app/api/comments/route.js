import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const post_id = searchParams.get('post_id');

    try {
        const { rows } = await query(
            `SELECT c.id, c.post_id, c.user_id, c.content, c.created_at, m.username 
            FROM comments c 
            JOIN members m ON c.user_id = m.id 
            WHERE c.post_id = $1 
            ORDER BY c.created_at ASC`,
            [post_id]
        );
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 });
    }
}

export async function POST(request) {
    const { post_id, user_id, content } = await request.json();

    try {
        const { rows } = await query(
            `INSERT INTO comments (post_id, user_id, content, created_at, username) 
            VALUES ($1, $2, $3, NOW(), (SELECT username FROM members WHERE id = $2)) 
            RETURNING id, post_id, user_id, content, created_at, username`,
            [post_id, user_id, content]
        );
        return NextResponse.json(rows[0], { status: 201 });
    } catch (error) {
        console.error('Yorum eklenirken bir hata oluştu:', error);
        return NextResponse.json({ error: 'Yorum eklenirken bir hata oluştu' }, { status: 500 });
    }
}

export async function DELETE(request) {
    const { id, user_id } = await request.json();

    try {
        const { rows } = await query('SELECT user_id FROM comments WHERE id = $1', [id]);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Yorum bulunamadı' }, { status: 404 });
        }

        const commentOwnerId = rows[0].user_id;

        if (String(commentOwnerId) !== String(user_id)) {
            return NextResponse.json({ error: `commentUserId= ${commentOwnerId}, userId= ${user_id}` }, { status: 403 });
        }

        const { rowCount } = await query('DELETE FROM comments WHERE id = $1', [id]);

        if (rowCount > 0) {
            return NextResponse.json({ message: 'Yorum başarıyla silindi' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Yorum bulunamadı' }, { status: 404 });
        }
    } catch (error) {
        console.error('Yorumu silerken bir hata oluştu:', error);
        return NextResponse.json({ error: 'Yorumu silerken bir hata oluştu' }, { status: 500 });
    }
}