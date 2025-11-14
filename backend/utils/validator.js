import validator from 'validator';

export const validateRegistrationData = (data) => {
    
    if (!data.name || !data.email || !data.password) {
        return { valid: false, message: 'All fields are required.' };
    }

    if (!validator.isEmail(data.email)) {
        return { valid: false, message: 'Invalid email format.' };
    }

    if (data.password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters long.' };
    }
    return { valid: true };
}