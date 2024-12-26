import prisma from '../config/dbConn.ts';
import { Request, Response } from 'express';

export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders: any = await prisma.orders.findMany({
      include: {
        tool: true,
      },
    });
    if (orders.length == 0) {
      res.status(404).json({
        message: 'No orders found',
      });
      return;
    }

    res.status(200).json({
      message: 'Orders found',
      orders,
    });

    return orders;
  } catch (err) {
    console.log(`Error while getting all orders: ${err}`);
  }
};

export const createOrder = async (
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
      farmer_name,
      phone,
      address,
      tool_id,
      start_date,
      end_date,
      organization_id,
      status,
    } = req.body;
    const order: any = await prisma.orders.create({
      data: {
        farmer_name,
        phone,
        address,
        start_date,
        end_date,
        tool_id,
        organization_id,
        status,
      },
    });
    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
    return order;
  } catch (err) {
    console.log(`Error while creating a new order: ${err}`);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const updatedOrder: any = await prisma.orders.update({
      where: {
        id: id,
      },
      data: req.body,
    });

    res.status(200).json({
      message: 'Order updated successfully',
      updatedOrder,
    });
    return updatedOrder;
  } catch (err) {
    console.log(`Error while updating an order: ${err}`);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deletedOrder: any = await prisma.orders.delete({
      where: {
        id: id,
      },
    });

    res.status(201).json({
      message: 'Order deleted successfully',
      deletedOrder,
    });
    return deletedOrder;
  } catch (err) {
    console.log(`Error while deleting an order: ${err}`);
  }
};
