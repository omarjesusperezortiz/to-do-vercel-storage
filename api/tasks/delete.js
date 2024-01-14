// /api/tasks/delete.js
const pool = require('../utils/db');
const { sendError } = require('../utils/errorHandler');

module.exports = async (req, res) => {
    const { id } = req.body;

    try {
        const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        if (rowCount === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        sendError(res, error);
    }
};
