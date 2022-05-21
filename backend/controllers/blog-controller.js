import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllBlogs = async (req,res,next) => {
    let blogs;
    try {
        blogs = await Blog.find();
        return res.status(200).json({blogs})
    } catch (error) {
        return console.log(error)
    }
}

export const getBlogById = async( req,res,next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error)
    }
    if(!blog){
        return res.status(404).json({message:"unable to find this blog"})
    }
    return res.status(200).json({blog})
}

export const newBlog = async(req,res,next) => {
    const {title,description,image,user} =req.body;
    let existingUser;

    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error)
    }

    if(!existingUser){
        return res.status(400).json({message:"Unable to find this User by t"})
    }

    const blog = new Blog({
        title, description, image, user,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction()

    } catch (error) {
        return res.status(500).json({ message: err });
    }
    return res.status(200).json({ blog });
}

export const editBlog = async(req,res,next) => {
    const blogId = req.params.id;
    const {title,description }= req.body;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (error) {
        return console.log(error)
    }
    if(!blog){
        return res.status(500).json({message:"Unable to update the blog"})
    }
    return res.status(200).json({blog})
}

export const removeBlog = async( req,res,next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (error) {
        return console.log(error)
    }
    if(!blog){
        return res.status(400).json({message: "unable to delete blog"})
    }
    return res.status(200).json({message:"blog delete with success"})
}

export const getByUserId = async(req,res,next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate('blogs');
    } catch (error) {
        return console.log(error)
    }
    if(!userBlogs){
        return res.status(404).json({message:"no blogs found"})
    }
    return res.status(200).json({userBlogs})
}