import prisma from '../config/dbConn';
import { Request, Response } from 'express';

// Create an Employee
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, skillset, availability, organization_id, image } = req.body;

    const employee = await prisma.employee.create({
      data: {
        name,
        skillset,
        availability,
        organization_id,
        Image: image, // Save the image URL
      },
    });

    res.status(201).json({
      message: 'Employee created successfully',
      employee,
    });
  } catch (err) {
    console.error(`Error while creating an employee: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Employees
export const getAllEmployees = async (_: Request, res: Response): Promise<void> => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (err) {
    console.error(`Error while fetching employees: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get One Employee
export const getOneEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    res.status(200).json(employee);
  } catch (err) {
    console.error(`Error while fetching the employee: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an Employee
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, skillset, availability, image } = req.body;

    const employee = await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        name,
        skillset,
        availability,
        Image: image, // Update the image URL
      },
    });

    res.status(200).json({
      message: 'Employee updated successfully',
      employee,
    });
  } catch (err) {
    console.error(`Error while updating the employee: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an Employee
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.employee.update({
      where: { id: Number(id) },
      data: { availability: false },
    });

    res.status(200).json({ message: 'Employee deleted successfully (marked as unavailable)' });
  } catch (err) {
    console.error(`Error while deleting the employee: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Recycle an Employee (mark as hidden)
export const recycleEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { availability: false },
    });

    res.status(200).json({
      message: 'Employee moved to recycle bin',
      employee,
    });
  } catch (err) {
    console.error(`Error while recycling the employee: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Recycled Employees
export const getAllRecycledEmployees = async (_: Request, res: Response): Promise<void> => {
  try {
    const employees = await prisma.employee.findMany({
      where: { availability: false },
    });
    res.status(200).json(employees);
  } catch (err) {
    console.error(`Error while fetching recycled employees: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Restore an Employee
export const restoreEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { availability: true },
    });

    res.status(200).json({
      message: 'Employee restored successfully',
      employee,
    });
  } catch (err) {
    console.error(`Error while restoring the employee: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
