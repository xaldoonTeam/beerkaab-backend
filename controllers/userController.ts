import prisma from '../config/dbConn.ts';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password, email } = req.body;
  try {
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

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existingUser: any = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      res.status(401).json({
        message: 'Invalid credentials',
      });
      return;
    }

    res.status(200).json({
      message: 'User logged in successfully',
      existingUser,
    });

    return existingUser;
  } catch (err) {
    console.log(`Error while logging in a user: ${err}`);
  }
};
