import prisma from '../config/dbConn.ts';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password, email } = req.body;
     if ( !username|| !password || !email){
      
       res.json("please enter valid data")
      return 
     }
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);
    const newUser: any = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPwd,
      },
    });

    res.status(201).json({
      message: 'User created successfully',
      newUser,
    });
    return newUser;
  } catch (err) {
    console.log(`Error while creating a new user: ${err}`);
  }
};

// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;
//     const existingUser: any = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });
//     if (!existingUser) {
//       res.status(404).json({
//         message: 'User not found',
//       });
//       return;
//     }

//     const match = await bcrypt.compare(password, existingUser.password);
//     if (!match) {
//       res.status(401).json({
//         message: 'Invalid credentials',
//       });
//       return;
//     }

//     res.status(200).json({
//       message: 'User logged in successfully',
//       existingUser,
//     });

//     return existingUser;
//   } catch (err) {
//     console.log(`Error while logging in a user: ${err}`);
//   }
// };







export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Check in the User table
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Validate password for user
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Successful login for User
      res.status(200).json({
        message: 'User logged in successfully',
        accountType: 'User',
        user,
      });
      return;
    }

    // 2. Check in the Organizations table if not found in User table
    const organization = await prisma.organizations.findUnique({
      where: { email },
    });

    if (organization) {
      // Validate password for organization
      const isPasswordValid = await bcrypt.compare(password, organization.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Successful login for Organization
      res.status(200).json({
        message: 'Organization logged in successfully',
        accountType: 'Organization',
        organization,
      });
      return;
    }

    // 3. If neither user nor organization is found
    res.status(404).json({ message: 'Account not found' });
  } catch (err) {
    console.error(`Error while logging in: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
