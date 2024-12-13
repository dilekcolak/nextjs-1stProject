import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ message: 'Email ve şifre gereklidir' }, { status: 400 });
    }

    try {
        const result = await query('SELECT * FROM members WHERE email = $1', [email]);

        console.log('Query result:', result.rows);

        if (result.rows.length === 0) {
            console.log('Email not found:', email); 
            return NextResponse.json({ message: 'Geçersiz email veya şifre' }, { status: 401 });
        }

        const user = result.rows[0];

        console.log('User found:', user); 
        console.log('Entered password:', password); 
        console.log('Stored hash:', user.password); 

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Is password valid:', isPasswordValid); 

        if (!isPasswordValid) {
            console.log('Password does not match for email:', email); 
            return NextResponse.json({ message: 'Geçersiz email veya şifre' }, { status: 401 });
        }

        return NextResponse.json({ 
            userId: user.id, 
            username: user.username, 
            profile_image_url: user.profile_image_url 
        }, { status: 200 });
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
