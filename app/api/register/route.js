import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
        return NextResponse.json({ message: 'Kullanıcı adı, email ve şifre gereklidir' }, { status: 400 });
    }

    try {
        const existingUser = await query('SELECT * FROM members WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            return NextResponse.json({ message: 'Bu email adresi zaten kayıtlı' }, { status: 409 });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        console.log('Hashed password:', hashedPassword); 
    
        await query('INSERT INTO members (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
    
        console.log('User registered with email:', email); 
    
        return NextResponse.json({ message: 'Kullanıcı başarıyla kaydedildi' }, { status: 201 });
    } catch (error) {
        console.error('Error during registration:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
