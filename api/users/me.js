// /api/users/me.js
import { db } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const client = await db.connect();
        const userQuery = await client.query('SELECT id, email FROM users WHERE id = $1', [userId]);
        const user = userQuery.rows[0];
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
