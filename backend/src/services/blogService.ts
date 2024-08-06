import Blog, { IBlog } from "../models/blogModel";

export class BlogService {
  public async createBlog(blogData: Partial<IBlog>): Promise<IBlog> {
    const newBlog: IBlog = new Blog(blogData);
    const savedBlog: IBlog = await newBlog.save();
    return savedBlog;
  }

  public async getAllBlogsByUser(authorName: string): Promise<IBlog[]> {
    return await Blog.find({ authorName });
  }

  public async deleteBlogByName(
    blogName: string,
    authorName: string
  ): Promise<IBlog | null> {
    const deletedBlog: IBlog | null = await Blog.findOneAndDelete({
      blogName,
      authorName,
    });
    return deletedBlog;
  }

  public async getBlogsByCategory(category: string): Promise<IBlog[]> {
    return Blog.find({ category });
  }

  public async getBlogsByCategoryAndDuration(
    category: string,
    durationFrom: Date,
    durationTo: Date
  ): Promise<IBlog[]> {
    return Blog.find({
      category,
      timestamp: { $gte: durationFrom, $lte: durationTo },
    }).populate("authorName");
  }
}

export default BlogService;