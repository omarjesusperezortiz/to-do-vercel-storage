// /api/utils/errorHandler.js
const sendError = (res, error, statusCode = 500) => {
    // Log the error for debugging
    console.error('API Error:', error);

    // Customize error responses based on the error or status code
    switch (statusCode) {
        case 400:
            res.status(400).json({ error: 'Bad Request' });
            break;
        case 404:
            res.status(404).json({ error: 'Not Found' });
            break;
        default:
            res.status(statusCode).json({ error: error.message });
    }
};

module.exports = { sendError };
