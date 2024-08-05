import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'secret';

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        console.log("verifyTokenErr", err);
        return null;
    }
};

export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('cicada_token');
    }
    return null;
};
