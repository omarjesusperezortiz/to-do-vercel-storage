// /api/tasks/get.js
import { authenticateToken } from '../utils/auth.js';
import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    try {
        const user = await authenticateToken(req);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Retrieve the tasks associated with the user's ID
        const client = await db.connect();
        const result = await client.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC', [user.userId]);

        // Release the client
        client.release();

        // If successful, return the tasks in the response
        res.status(200).json(result.rows);
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}
