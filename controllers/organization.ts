import prisma from '../config/dbConn.ts';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const createOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, username, password, email, description, phone, address } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const organization: any = await prisma.organizations.create({
      data: {
        name,
        address,
        username,
        password: hashedPassword,
        email,
        description,
        phone,
      },
    });

    res.status(201).json({
      message: 'Organization created successfully',
      organization,
    });

    return organization;
  } catch (err) {
    console.log(`Error while creating a new organization: ${err}`);
  }
};

export const loginOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const organization: any = await prisma.organizations.findUnique({
      where: {
        email: email,
      },
    });

    if (!organization) {
      res.status(404).json({
        message: 'Organization not found',
      });
      return;
    }
    const match = bcrypt.compare(password, organization.password);
    if (!match) {
      res.status(401).json({
        message: 'Invalid credentials',
      });
      return;
    }

    res.status(200).json({
      message: 'Organization logged in successfully',
      organization,
    });

    return organization;
  } catch (err) {
    console.log(`Error while logging in an organization: ${err}`);
  }
};
