import express from 'express';
import { getAllBlogs,getBlogById, getByUserId, newBlog, editBlog, removeBlog } from '../controllers/blog-controller.js';
const router = express.Router();

router.get("/",getAllBlogs);

router.get("/:id",getBlogById)

router.get("/user/:id",getByUserId)

router.post("/add",newBlog);

router.put("/edit/:id",editBlog)

router.delete("/:id",removeBlog)

export default router;