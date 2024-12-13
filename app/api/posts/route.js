import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // db bağlantısına doğru yolu verin

export async function POST(request) {
    const { userId, description, imageUrl } = await request.json();

    if (!userId || !imageUrl) {
        return NextResponse.json({ success: false, error: 'userId ve imageUrl parametreleri gerekli' }, { status: 400 });
    }

    try {
        const result = await query(
            `INSERT INTO timeline_posts (user_id, image_url, description)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [userId, imageUrl, description]
        );

        return NextResponse.json({ success: true, post: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error(`Error saving post: ${error}`);
        return NextResponse.json({ success: false, error: `Database error: ${error.message}` }, { status: 500 });
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    if (!userId) {
        return NextResponse.json({ error: 'userId parametresi gerekli' }, { status: 400 });
    }

    const offset = (page - 1) * limit;

    try {
        const results = await query(`
            SELECT 
                timeline_posts.id,
                timeline_posts.image_url,
                timeline_posts.description,
                timeline_posts.user_id,
                timeline_posts.created_at,
                timeline_posts.updated_at, 
                members.username,
                members.profile_image_url
            FROM 
                timeline_posts
            JOIN 
                members 
            ON 
                timeline_posts.user_id = members.id
            WHERE 
                timeline_posts.user_id = $1
            ORDER BY 
                COALESCE(timeline_posts.updated_at, timeline_posts.created_at) DESC
            LIMIT $2 OFFSET $3;
        `, [userId, limit, offset]);

        const totalPostsResult = await query(`
            SELECT COUNT(*) FROM timeline_posts WHERE user_id = $1;
        `, [userId]);

        const totalPosts = parseInt(totalPostsResult.rows[0].count, 10);
        const hasMore = offset + results.rows.length < totalPosts;

        return NextResponse.json({ posts: results.rows, hasMore }, { status: 200 });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Gönderiler getirilirken hata oluştu', details: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    const { postId, description } = await request.json();

    if (!postId) {
        return NextResponse.json({ error: 'postId parametresi gerekli' }, { status: 400 });
    }

    try {
        const postExists = await query('SELECT id FROM timeline_posts WHERE id = $1', [postId]);

        if (postExists.rows.length === 0) {
            return NextResponse.json({ error: 'Güncellenecek post bulunamadı' }, { status: 404 });
        }

        const result = await query(
            'UPDATE timeline_posts SET description = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [description || '', postId]
        );

        return NextResponse.json({ success: true, post: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Post güncellenirken bir hata oluştu', details: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    const { postId } = await request.json();

    if (!postId) {
        return NextResponse.json({ error: 'postId parametresi gerekli' }, { status: 400 });
    }

    try {
        const postExists = await query('SELECT id FROM timeline_posts WHERE id = $1', [postId]);

        if (postExists.rows.length === 0) {
            return NextResponse.json({ error: 'Silinecek post bulunamadı' }, { status: 404 });
        }

        await query('DELETE FROM timeline_posts WHERE id = $1', [postId]);
        return NextResponse.json(null, { status: 204 }); 
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Post silinirken bir hata oluştu', details: error.message }, { status: 500 });
    }
}