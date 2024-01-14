// /api/tasks/post.js
const pool = require('../utils/db');
const { sendError } = require('../utils/errorHandler');

module.exports = async (req, res) => {
    const { title, description } = req.body;

    try {
        const { rows } = await pool.query(
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        sendError(res, error);
    }
};
