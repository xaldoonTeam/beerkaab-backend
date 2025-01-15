import prisma from '../config/dbConn.ts';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

// Organization Creation
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

// Login Organization
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

// Recycle Organization
export const recycleOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if organization exists
    const organization = await prisma.organizations.findUnique({
      where: { id: Number(id) },
    });

    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }

    // Proceed to update if it exists
    const updatedOrganization = await prisma.organizations.update({
      where: { id: Number(id) },
      data: { Isdeleted: 'HIDDEN' },
    });

    res.status(200).json({
      message: 'Organization moved to recycle bin',
      organization: updatedOrganization,
    });
  } catch (err) {
    console.error(`Error while recycling organization: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Restore Organization
export const restoreOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if organization exists and is marked as deleted
    const organization = await prisma.organizations.findUnique({
      where: { id: Number(id), Isdeleted: 'HIDDEN' },
    });

    if (!organization) {
      res
        .status(404)
        .json({ message: 'Organization not found or not deleted' });
      return;
    }

    // Proceed to restore if it exists
    const updatedOrganization = await prisma.organizations.update({
      where: { id: Number(id) },
      data: { Isdeleted: 'VISIBLE' },
    });

    res.status(200).json({
      message: 'Organization restored successfully',
      organization: updatedOrganization,
    });
  } catch (err) {
    console.error(`Error while restoring organization: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Organization
export const deleteOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if organization exists
    const organization = await prisma.organizations.findUnique({
      where: { id: Number(id) },
    });

    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }

    // Proceed to delete if it exists
    await prisma.organizations.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Organization deleted permanently' });
  } catch (err) {
    console.error(`Error while deleting organization: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Make Paid
export const makePaid = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if organization exists
    const organization = await prisma.organizations.findUnique({
      where: { id: Number(id) },
    });

    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }

    // Proceed to update status if it exists
    const updatedOrganization = await prisma.organizations.update({
      where: { id: Number(id) },
      data: { status: 'paid' },
    });

    res.status(200).json({
      message: 'Organization status updated to paid',
      organization: updatedOrganization,
    });
  } catch (err) {
    console.error(`Error while updating organization status: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Make Unpaid
export const makeUnpaid = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if organization exists
    const organization = await prisma.organizations.findUnique({
      where: { id: Number(id) },
    });

    if (!organization) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }

    // Proceed to update status if it exists
    const updatedOrganization = await prisma.organizations.update({
      where: { id: Number(id) },
      data: { status: 'unpaid' },
    });

    res.status(200).json({
      message: 'Organization status updated to unpaid',
      organization: updatedOrganization,
    });
  } catch (err) {
    console.error(`Error while updating organization status: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
