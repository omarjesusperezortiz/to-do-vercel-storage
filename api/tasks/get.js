// /api/tasks/get.js
const pool = require('../utils/db');
const { sendError } = require('../utils/errorHandler');

module.exports = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
        res.status(200).json(rows);
    } catch (error) {
        sendError(res, error);
    }
};
