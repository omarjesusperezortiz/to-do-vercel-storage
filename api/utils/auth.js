// /api/utils/auth.js
import jwt from 'jsonwebtoken';

export async function authenticateToken(req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new Error('No token provided');
    }

    try {
        return await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    reject(new Error('Invalid token'));
                } else {
                    resolve(user);
                }
            });
        });
    } catch (error) {
        throw error;
    }
}
