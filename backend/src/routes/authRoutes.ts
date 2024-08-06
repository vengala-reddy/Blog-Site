import {Router} from 'express';
import { AuthController } from '../controllers/authController';
import { BlogController } from '../controllers/blogController';

const router = Router();
const authController = new AuthController();
const blogController = new BlogController();

router.post('/register', authController.registerUser);
router.get("/getall", blogController.getAllBlogsByUser);
router.delete("/delete/:blogName/", blogController.deleteBlogByName);
router.post("/blogs/add/:blogname", blogController.addBlog);


export default router;