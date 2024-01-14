import { db } from '@vercel/postgres';

export default async function testDb(req, res) {
    const client = await db.connect();

    try {
        // Replace 'SELECT 1' with a more relevant query for your database
        const result = await client.sql`SELECT 1`;
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        await client.end();
    }
}
