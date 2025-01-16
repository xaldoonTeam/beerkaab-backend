// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// // User data interface reflecting the User model in Prisma
// interface UserData {
//     id: number;
//     username: string;
//     email: string;
//     role: 'user' | 'admin' | 'superAdmin'; // Match the Role enum
//     location?: string; // Optional location field
// }


// // Interface to extend Express Request for custom user data
// export interface CustomUserRequest extends Request {
//     user?: UserData; 
// }

// // Middleware to decode JWT token and attach user data to the request
// export const decodeToken = (req: CustomUserRequest, res: Response, next: NextFunction): void => {
//     try {
//         const token = req.headers.authorization?.startsWith('Bearer ') 
//             ? req.headers.authorization.split(' ')[1] 
//             : null;

//         if (!token) {
//             res.status(401).json({
//                 isSuccess: false,
//                 message: 'Unauthorized'.toUpperCase(),
//             });
//             return; // End execution after sending a response
//         }

//         // Verify the token and cast to UserData type
//         const decoded = jwt.verify(token, "tullir@@@") as UserData; 
//         req.user = { ...decoded }; 
//         next(); // Proceed to the next middleware or handler
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({
//             isSuccess: false,
//             message: 'Unauthorized'.toUpperCase(),
//         });
//     }
// };
