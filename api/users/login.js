// /api/users/login.js
import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export default async function handler(req, res) {
    const client = await db.connect();
    const { email, password } = req.body;

    try {
        const userQuery = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userQuery.rows[0];
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ user: { id: user.id, email: user.email }, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await client.end();
    }
}
