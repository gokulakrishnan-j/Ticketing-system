import jwt from 'jsonwebtoken'

export const userAuth =(request,response,next)=>{
    try{
        const token = request.header("usertoken")
        jwt.verify(token,process.env.SECERET_KEY)
        next();
    }catch(err){
        response.status(401).send({message:err.message})
    }
}

export const managerAuth =(request,response,next)=>{
    try{
        const token = request.header("managertoken")
        jwt.verify(token,process.env.SECERET_KEY)
        next();
    }catch(err){
        response.status(401).send({message:err.message})
    }
}

export const helperAuth =(request,response,next)=>{
    try{
        const token = request.header("helpertoken")
        jwt.verify(token,process.env.SECERET_KEY)
        next();
    }catch(err){
        response.status(401).send({message:err.message})
    }
}

export const adminAuth =(request,response,next)=>{
    try{
        const token = request.header("admintoken")
        jwt.verify(token,process.env.SECERET_KEY)
        next();
    }catch(err){
        response.status(401).send({message:err.message})
    }
}