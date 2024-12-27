import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// User data interface reflecting the User model in Prisma
interface UserData {
    id: number; // Match with the User model's id
    username: string;
    email: string; // Email field from the User model
    isAdmin?: boolean; // Optional field for admin status
}

// Function to generate a JWT token for a user
export const generateToken = (user: UserData) => {
    const payload = { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        isAdmin: user.isAdmin || false, // Default to false if not provided
    };
    return jwt.sign(payload, "tullir@@@", {
        expiresIn: '7d'
    });
}

// Interface to extend Express Request for custom user data
export interface CustomUserRequest extends Request {
    user?: UserData; // Optional user property
}

// Middleware to decode JWT token and attach user data to the request
export const decodeToken = (req: CustomUserRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.startsWith('Bearer ') ? 
            req.headers.authorization.split(' ')[1] : null;

        if (!token) {
            return res.status(401).json({
                isSuccess: false,
                message: 'Unauthorized'.toUpperCase(),
            });
        }

        // Verify the token and cast to UserData type
        const decoded = jwt.verify(token, "tullir@@@") as UserData; 
        req.user = { ...decoded }; // Attach decoded user data to request
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            isSuccess: false,
            message: 'Unauthorized'.toUpperCase(),
        });
    }
}