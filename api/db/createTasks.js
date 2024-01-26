// api/db/createTasks.js

import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    try {
        await sql`CREATE TABLE tasks (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )`;
        res.status(200).send('Table created successfully');
    } catch (error) {
        res.status(500).send('Error creating table: ' + error.message);
    }
}
