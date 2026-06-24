import User from '../model/user.js'
import bcrypt from 'bcryptjs'

export const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required",
            })
        }

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                message: "User already exists",
            })
        }

        // hash password

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(201).json({
            message: "User register Successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}