import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '../../../lib/db';

export async function PUT(request) {
    const { userId, username, email, password, profile_image_url, company, position, job_description } = await request.json();

    try {
        const currentUser = await query('SELECT email, username FROM members WHERE id = $1', [userId]);

        if (currentUser.rows.length === 0) {
            return NextResponse.json({ message: 'Kullanıcı bulunamadı' }, { status: 404 });
        }

        const currentEmail = currentUser.rows[0].email;
        const currentUsername = currentUser.rows[0].username;

        if (email !== currentEmail || username !== currentUsername) {
            const duplicateCheck = await query(
                `SELECT * FROM members WHERE (email = $1 OR username = $2) AND id != $3`,
                [email, username, userId]
            );

            if (duplicateCheck.rows.length > 0) {
                return NextResponse.json({ message: 'Email veya kullanıcı adı zaten kullanılıyor.' }, { status: 400 });
            }
        }

        let hashedPassword = null;
        if (password) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

        const result = await query(
            `UPDATE members 
             SET username = COALESCE($1, username),
                 email = COALESCE($2, email),
                 password = COALESCE($3, password),
                 profile_image_url = COALESCE($4, profile_image_url),
                 company = COALESCE($5, company),
                 position = COALESCE($6, position),
                 job_description = COALESCE($7, job_description)
             WHERE id = $8 RETURNING *`,
            [username, email, hashedPassword || currentUser.rows[0].password, profile_image_url, company, position, job_description, userId]
        );

        if (result.rows.length > 0) {
            return NextResponse.json(result.rows[0], { status: 200 });
        } else {
            return NextResponse.json({ message: 'Kullanıcı bulunamadı' }, { status: 404 });
        }
    } catch (error) {
        console.error('Profil güncelleme hatası:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

