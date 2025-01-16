import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// User data interface reflecting the User model in Prisma
interface UserData {
    id: number;
    username: string;
    email: string;
    role: 'user' | 'admin' | 'superAdmin'; // Match the Role enum
    location?: string; // Optional location field
}

// Function to generate a JWT token for a user
export const generateToken = (user: UserData) => {
    const payload = { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: user.role,
        location: user.location || null, // Default to null if not provided
    };

    return jwt.sign(payload, "tullir@@@", {
        expiresIn: '7d', // Token expires in 7 days
    });
};

// Interface to extend Express Request for custom user data
export interface CustomUserRequest extends Request {
    user?: UserData; // Optional user property to store decoded token
}

// Middleware to decode JWT token and attach user data to the request
export const decodeToken = (req: CustomUserRequest, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.startsWith('Bearer ') 
            ? req.headers.authorization.split(' ')[1] 
            : null;

        if (!token) {
            res.status(401).json({
                isSuccess: false,
                message: 'UNAUTHORIZED',
            });
            return; // Stop execution here if no token is provided
        }

        // Verify the token and cast to UserData type
        const decoded = jwt.verify(token, "tullir@@@") as UserData; 
        req.user = decoded; // Attach decoded user data to the request
        next(); // Pass control to the next middleware
    } catch (error) {
        console.error(`Error decoding token: ${error}`);
        res.status(401).json({
            isSuccess: false,
            message: 'UNAUTHORIZED',
        });
    }
};


// Middleware to check if the user has admin or superAdmin role
export const isAdmin = (req: CustomUserRequest, res: Response, next: NextFunction) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superAdmin')) {
        return res.status(403).json({
            isSuccess: false,
            message: 'FORBIDDEN: You do not have sufficient permissions.',
        });
    }
    next();
};

// Middleware to check if the user has superAdmin role
export const isSuperAdmin = (req: CustomUserRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'superAdmin') {
        return res.status(403).json({
            isSuccess: false,
            message: 'FORBIDDEN: You do not have sufficient permissions.',
        });
    }
    next();
};
