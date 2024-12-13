import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10; // Her sayfada 10 post var
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
      ORDER BY 
        COALESCE(timeline_posts.updated_at, timeline_posts.created_at) DESC
      LIMIT $1 OFFSET $2;
    `, [limit, offset]);

    const countResults = await query(`
      SELECT COUNT(*) AS total FROM timeline_posts;
    `);
    const totalPosts = parseInt(countResults.rows[0].total, 10);
    const hasMore = offset + results.rowCount < totalPosts;

    return NextResponse.json({ posts: results.rows, hasMore }, { status: 200 });
  } catch (error) {
    console.error('Detailed error in timeline API:', error);
    return NextResponse.json({ error: 'Error fetching timeline posts', details: error.message }, { status: 500 });
  }
}
