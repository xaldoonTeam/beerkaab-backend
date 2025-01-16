import prisma from '../config/dbConn';
import { Request, Response } from 'express';
import { CustomUserRequest } from '../middleware/secure';

// Create a Post
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, organization_id, image } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        Image: image, // Save the image URL
        organization_id,
      },
    });

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (err) {
    console.error(`Error while creating a post: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Posts
export const getAllPosts = async (_: Request, res: Response): Promise<void> => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (err) {
    console.error(`Error while fetching posts: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get All Recycle Posts
export const getAllRecyclePosts = async (_: Request, res: Response): Promise<void> => {
  try {
    const posts = await prisma.post.findMany(
      {where:{status:"HIDDEN"}}
    );
    res.status(200).json(posts);
  } catch (err) {
    console.error(`Error while fetching posts: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get One Post
export const getOnePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(`Error while fetching the post: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a Post
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        Image: image, // Update the image URL
      },
    });

    res.status(200).json({
      message: 'Post updated successfully',
      post,
    });
  } catch (err) {
    console.error(`Error while updating the post: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a Post
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.post.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(`Error while deleting the post: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Recycle a Post
export const recyclePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { status: 'HIDDEN' },
    });

    res.status(200).json({
      message: 'Post moved to recycle bin',
      post,
    });
  } catch (err) {
    console.error(`Error while recycling the post: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Restore a Post
export const restorePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { status: 'VISIBLE' },
    });

    res.status(200).json({
      message: 'Post restored successfully',
      post,
    });
  } catch (err) {
    console.error(`Error while restoring the post: ${err}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Accept a Post
export const acceptPost = async (req: CustomUserRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Ensure `user` is attached to the request and check for role
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superAdmin')) {
      res.status(403).json({
        isSuccess: false,
        message: 'FORBIDDEN: You do not have sufficient permissions.',
      });
      return;
    }

    // Update the post's status to "VISIBLE"
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { status: 'VISIBLE' },
    });

    res.status(200).json({
      isSuccess: true,
      message: 'Post accepted and made visible',
      post,
    });
  } catch (err) {
    console.error(`Error while accepting the post: ${err}`);
    res.status(500).json({
      isSuccess: false,
      message: 'Internal server error',
    });
  }
};
