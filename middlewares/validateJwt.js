import jwt from 'jsonwebtoken'

export const validateJwt = async(req, res , next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let {authorization} = req.headers

        if(!authorization){
            return res.status(401).send({message:'Authorized'})
        }
        let user = jwt.verify(authorization, secretKey)
        req.user = user
        next()
    }catch (error){
        console.error(error)
        return res.status(401).send({message:'Invalid credentials'})
    }
}

export const isAdmin = async(req, res, next)=>{
    try {
        const {user}=req
        if(user.role !== 'ADMIN') return res.status(403).send({success:false,message:`You don't have access`})
            next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({success:false,message:'Invalid credentials'})
    }
}