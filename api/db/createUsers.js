import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    try {
        await sql`CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )`;
        res.status(200).send('Table created successfully');
    } catch (error) {
        res.status(500).send('Error creating table: ' + error.message);
    }
}
