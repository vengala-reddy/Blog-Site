import { Router } from 'express';
import { BlogController } from '../controllers/blogController';

const router = Router();
const blogController = new BlogController();

router.get("/info/:category", blogController.getBlogsByCategory);
router.get("/get/:category/:durationFromRange/:durationToRange", blogController.getBlogsByCategoryAndDuration);

export default router;