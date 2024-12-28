import { Request, Response } from 'express';
import prisma from '../config/dbConn.ts';

// Tool Creation
export const createTool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body) {
      res.status(403).json({
        message: 'Please Fill Out',
      });
    }

    const {
      name,
      description,
      price,
      location,
      category,
      organization_id,
      image,
    } = req.body;

    const tool: any = await prisma.tools.create({
      data: {
        name,
        description,
        price,
        location,
        category,
        organization_id,
        image,
      },
    });
    res.status(201).json({
      message: 'Tool created successfully',
      tool,
    });
    return tool;
  } catch (err) {
    console.log(`Error while creating a new tool: ${err}`);
  }
};

// Get All Tools
export const getAllTools = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const currentDate = new Date();

    // Get Expired Order
    await prisma.orders
      .findMany({
        where: {
          end_date: {
            lt: currentDate,
          },
        },
        include: {
          tool: true,
        },
      })
      .then(async (expiredOrders) => {
        for (const order of expiredOrders) {
          await prisma.tools.update({
            where: {
              id: order.tool_id,
            },
            data: { status: 'AVAILABLE' },
          });
        }
      });

    const tools: any = await prisma.tools.findMany({
      include: {
        organization: true,
      },
    });

    if (tools.length == 0) {
      res.status(404).json({
        message: 'No tools found',
      });
      return;
    }

    res.status(200).json({
      message: 'Tools found',
      tools,
    });

    return tools;
  } catch (err) {
    console.log(`Error while getting all tools: ${err}`);
  }
};

// Update Tool
export const updateTool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedTool: any = await prisma.tools.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.status(200).json({
      message: 'Tool updated successfully',
      updatedTool,
    });
    return updatedTool;
  } catch (err) {
    console.log(`Error while updating a tool: ${err}`);
  }
};

// Delete Tool
export const deleteTool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedTool: any = prisma.tools.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(201).json({
      message: 'Tool deleted successfully',
      deletedTool,
    });
    return deletedTool;
  } catch (err) {
    console.log(`Error while deleting a tool: ${err}`);
  }
};

// Get One Tool
export const getOneTool = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tool: any = await prisma.tools.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!tool) {
      res.status(404).json({ message: 'Tool not found' });
      return;
    }

    res.status(200).json({
      message: 'Tool found',
      tool,
    });
    return tool;
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(`Error while getting a tool: ${err}`);
  }
};
