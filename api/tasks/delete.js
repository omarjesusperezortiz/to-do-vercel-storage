// /api/tasks/delete.js
import { sql} from '@vercel/postgres';
import { authenticateToken} from "../utils/auth";

export default async (req, res) => {
    const { id } = req.body;
    const user = await authenticateToken(req, res);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        await sql`DELETE FROM tasks WHERE id = ${id} AND user_id = ${user.userId}`
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
