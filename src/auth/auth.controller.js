import User from "../user/user.model.js";
import { checkPassword, encrypt } from "../../utils/encrypt.js";
import { generateJwt } from "../../utils/jwt.js";

export const register = async(req, res)=>{
    try {
        const data = req.body
        const newUser = new User(data)
        newUser.password = await encrypt(newUser.password)
        await newUser.save()
        return res.send({ success: true, message: 'User Registered successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ success: false, message: 'General error registering'})
    }
}


export const login = async(req,res)=>{
    try{
        let{userLogin,password} = req.body
        let user = await User.findOne({$or:[{username:userLogin}]})
        if (!user) return res.status(400).send({success:false, message:'User not found.'})
        if (user && await checkPassword(user.password,password)){
            let loggedUser ={
                uid:user._id,
                username: user.username
            }
            let token = await generateJwt(loggedUser)
            return res.send({success:true, message: `Welcome ${user.password, password}`,loggedUser,token})
        }
        return res.status(500).send({success:false, message:'Invalid Credentials'})
    }catch(e){
        console.log(e)
        return res.status(500).send({success:false, message:'General error whit login.',e})
    }
}