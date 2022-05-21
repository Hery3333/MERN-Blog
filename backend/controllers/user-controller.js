import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllUser = async (req,res,next) => {
    try {
        const users = await User.find();
        return res.status(200).json({users})
    } catch (error) {
        return res.status(404).json({message: 'error ' + error})
    }
}

export const signup = async (req,res,next) => {
    const { name,email,password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }
    if(existingUser){
        return res.status(400).json({message:'User Already exist'})
    }
    const passwordHash = bcrypt.hashSync(password)
    const user = new User({name,email,password: passwordHash,blogs:[]})
    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }
    return res.status(201).json({user})
}

export const login = async (req,res,next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }
    if(!existingUser){
        return res
            .status(404)
            .json({ message: "Couldn't find User for this email"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password"})
    }

    return res.status(200).json({message: "Login Successfull"})
}

