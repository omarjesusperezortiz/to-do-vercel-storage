// /api/utils/validation.js
const validateTaskInput = (data) => {
    const errors = {};
    if (!data.title) errors.title = 'Title is required';
    if (!data.description) errors.description = 'Description is required';
    return errors;
};

module.exports = { validateTaskInput };
