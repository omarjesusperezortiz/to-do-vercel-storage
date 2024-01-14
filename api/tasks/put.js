// /api/tasks/put.js
const pool = require('../utils/db');
const { sendError } = require('../utils/errorHandler');

module.exports = async (req, res) => {
    const { id, title, description } = req.body;

    try {
        const { rows } = await pool.query(
            'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
            [title, description, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        sendError(res, error);
    }
};
