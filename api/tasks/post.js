// /api/tasks/post.js
import { authenticateToken } from '../utils/auth.js';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    const user = await authenticateToken(req, res);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const { title, description, status } = req.body;
    try {
        await sql`INSERT INTO tasks (user_id, title, description, status) VALUES (${user.userId}, ${title}, ${description}, ${status})`;
        res.status(200).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
