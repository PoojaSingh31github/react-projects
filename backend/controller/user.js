import bcrypt from "bcryptjs";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export const signup = async(req, res)=>{
    try {
        const {username, email,password} = req.body;
        const isUserpresent = await User.findOne({email});
        if(isUserpresent){
          return res.status(400).json({message: "user already exists with this email ID"})
        }

        const hashPassowrd = await bcrypt.hash(password, 10);

        const user = new User({username, email, password:hashPassowrd})
        await user.save();

        return res.status(201).json({message: "user created succesfully"}); 

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


export const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) return res.status(400).json({message: "user not found firt sighup "});

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) return res.status(400).json({message: "invalid credentials"});

        const token = jwt.sign({id:user._id, email: user.email}, process.env.JWT, {expiresIn:"1d"});
        res.status(200).json({token})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const getUser =async(req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        const user = await User.findById(id);
        console.log(user, "userssssssssssssssssssssss")
        if(!user) return res.status(400).json({message: "user not found"});

        return res.status(200).json({message: "user get successfully", user});
    } catch (error) {
        res.status(500).json({message: "error in finding user", error:error.message})
    }
}

export const getAllUser =async(req,res)=>{
    try {
        const user = await User.find();
        console.log(user, "userssssssssssssssssssssss")
        if(!user) return res.status(400).json({message: "users not found"});

        return res.status(200).json({message: "user get successfully", user});
    } catch (error) {
        res.status(500).json({message: "error in finding user", error:error.message})
    }
}

export const deleteUser =async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteuser = await User.findByIdAndDelete(id);
        if(!deleteuser){
          return  res.status(400).json({message: "user not deleted or unable to find"})
        }
        res.status(200).json({message:"user deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"error in deleting user", error:error.message})
    }
}

export const updateUser =async (req,res) =>{
    try {
        const {id} = req.params;
        const {...updateUserdata} = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updateUserdata, {new:true, runValidators:true}  )
        if(!updatedUser) return res.status(400).json({message:"user not found or failed to update"})
        res.status(200).json({message: "user updated successfully" , user:updatedUser })    
    } catch (error) {
        res.status(500).json({message:"error in updateing user", error:error.message})
    }
}