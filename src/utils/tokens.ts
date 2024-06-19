import jwt from 'jsonwebtoken';

const { ACTIVATION_TOKEN_SECRET, RESET_TOKEN_SECRET } = process.env;

export const createActivationToken = (payload: any) => {
    if (!ACTIVATION_TOKEN_SECRET) {
        console.error('JWT token is not defined.');
        throw new Error('JWT token is not defined.');
    }
    return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, {
        expiresIn: '2d',
    });
};

export const createResetToken = (payload: any) => {
    if (!RESET_TOKEN_SECRET) {
        console.error('JWT reset token is not defined.');
        throw new Error('JWT reset token is not defined.');
    }
    return jwt.sign(payload, RESET_TOKEN_SECRET, {
        expiresIn: '1h',
    });
};
