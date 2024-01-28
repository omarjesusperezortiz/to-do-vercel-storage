// /api/tasks/put.js
import { authenticateToken } from '../utils/auth.js';
import { sql } from '@vercel/postgres';

export default async (req, res) => {
    const user = await authenticateToken(req, res);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id, title, description, status } = req.body;
    const fieldsToUpdate = [];
    const values = [];

    if (title !== undefined) {
        fieldsToUpdate.push('title = $' + (fieldsToUpdate.length + 1));
        values.push(title);
    }

    if (description !== undefined) {
        fieldsToUpdate.push('description = $' + (fieldsToUpdate.length + 1));
        values.push(description);
    }

    if (status !== undefined) {
        fieldsToUpdate.push('status = $' + (fieldsToUpdate.length + 1));
        values.push(status);
    }

    if (fieldsToUpdate.length === 0) {
        return res.status(400).json({ error: 'No fields provided to update' });
    }
    const query = 'UPDATE tasks SET ' + fieldsToUpdate.join(', ') + ' WHERE id = $' + (values.length + 1) + ' AND user_id = $' + (values.length + 2) + ' RETURNING *';
    values.push(id, user.userId);
    try {
        const { rows } = await sql.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Task not found or not authorized to update this task' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
