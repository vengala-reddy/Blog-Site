import { Request, Response } from 'express';
import BlogService from '../services/blogService';

export class BlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  // Add a new blog
  public addBlog = async (req: Request, res: Response): Promise<void> => {
    const { blogName, category, article, authorName } = req.body;

    // Validate the request body
    if (!blogName || !category || !article || !authorName) {
      res.status(400).json({ message: 'All fields are mandatory' });
      return;
    }

    if (blogName.length < 20) {
      res.status(400).json({ message: "Blog Name should be of minimum 20 characters" });
      return;
    }

    if (category.length < 20) {
      res.status(400).json({ message: "Category should be of minimum 20 characters" });
      return;
    }

    if (article.split(' ').length < 1000) {
      res.status(400).json({ message: "Article should be of minimum 1000 words" });
      return;
    }

    // Add the blog
    try {
      const newBlog = await this.blogService.createBlog({ blogName, category, article, authorName, timestamp: new Date() });
      res.status(201).json({result: newBlog});
    } catch (error) {
      res.status(500).json({ message: 'Failed to add blog', error });
    }
  }

  // Get all blogs by User
  public getAllBlogsByUser = async (req: Request, res: Response): Promise<void> => {
    const { authorName } = req.query;

    if (!authorName) {
      res.status(400).json({ message: 'Author Name is required' });
      return;
    }

    // Get the blogs
    try {
      const blogs = await this.blogService.getAllBlogsByUser(authorName as string);
      res.status(200).json({result: blogs});
    } catch (error) {
      res.status(500).json({ message: 'Failed to get blogs', error });
    }
  }

  // Delete a blog by name
  public deleteBlogByName = async (req: Request, res: Response): Promise<void> => {
    const { blogName, authorName } = req.query;

    if (!blogName || !authorName) {
      res.status(400).json({ message: 'Blog Name and Author Name are required' });
      return;
    }

    // Delete the blog
    try {
      const deletedBlog = await this.blogService.deleteBlogByName(blogName as string, authorName as string);
      if (!deletedBlog) {
        res.status(404).json({ message: 'Blog not found' });
        return;
      } else {
      res.status(200).json({result: deletedBlog, message: 'Blog deleted successfully'});
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete blog', error });
    }
  }

  public getBlogsByCategory = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.query;

    if (!category) {
      res.status(400).json({ message: 'Category is required' });
      return;
    }

    // Get the blogs
    try {
      const blogs = await this.blogService.getBlogsByCategory(category as string);
      res.status(200).json({result: blogs});
    } catch (error) {
      res.status(500).json({ message: 'Failed to get blogs for the provided category', error });
    }
  }

  public getBlogsByCategoryAndDuration = async (req: Request, res: Response): Promise<void> => {
    const { category, durationFromRange, durationToRange } = req.params;

    if (!category || !durationFromRange|| !durationToRange) {
      res.status(400).json({ message: 'Category, durationFrom and durationTo range are required' });
      return;
    }

    const durationFrom = new Date(durationFromRange);
    const durationTo = new Date(durationToRange);

    if (isNaN(durationFrom.getTime()) || isNaN(durationTo.getTime())) {
      res.status(400).json({ message: "Invalid date format" });
      return;
    }


    // Get the blogs by category and duration
    try {
      const blogs = await this.blogService.getBlogsByCategoryAndDuration(
        category,
        durationFrom,
        durationTo
      );
      res.status(200).json({result: blogs});
    } catch (error) {
      res.status(500).json({ message: 'Failed to get blogs for the provided category and duration', error });
    }
  }
}