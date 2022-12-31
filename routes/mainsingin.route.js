import express from 'express'
import { bcrypt,jwt} from '../index.js';
import { helperfromdb, managerfromdb, userfromdb, storemanagertoken, storehelpertoken, storeusertoken } from '../services/mainsignin.service.js';






const router = express.Router();


async function helperFromDb(helpername){

    const getinghelperfromDB = await helperfromdb(helpername)
  
      return getinghelperfromDB
      
  }
  


  async function managerFromDb(managername){
  
    const getingmanagerfromDB = await managerfromdb(managername)
  
      return getingmanagerfromDB
      
  }


  async function userFromDb(username){
  
    const getinguserfromDB = await userfromdb(username)
  
      return getinguserfromDB
      
  }
  router.post('/signin',async function (request,response){

 
    const {loginName,password,role} = request.body
  
    
   
    var getUserFromDB = await userFromDb(loginName)
  
      var getHelperFromDB = await helperFromDb(loginName)
  
      var getManagerFromDB = await managerFromDb(loginName)
  
  
    
    if(getManagerFromDB && getManagerFromDB.role === role){
     
   
        const passwordFromUserDB = getManagerFromDB.password
    
       const passwordMatch =await bcrypt.compare(password,passwordFromUserDB)
    
       if(passwordMatch){
    const token = jwt.sign({id:getManagerFromDB._id},process.env.SECERET_KEY)
    
    const storeManagerToken = await storemanagertoken(token, getManagerFromDB, role)
    
    response.send(storeManagerToken)
    
       }else{
        response.status(401).send({message : "invalid credentials "})
       }
     
    
      
    }else if(getHelperFromDB && getHelperFromDB.role === role){
   
     
        const passwordFromUserDB = getHelperFromDB.password
    
       const passwordMatch =await bcrypt.compare(password,passwordFromUserDB)
    
       if(passwordMatch){
    const token = jwt.sign({id:getHelperFromDB._id},process.env.SECERET_KEY)
    
    const storeHelperToken = await storehelpertoken(token, getHelperFromDB, role)
    
    response.send(storeHelperToken)
    
       }else{
        response.status(401).send({message : "invalid credentials "})
       }
    
  
  }else if(getUserFromDB && getUserFromDB.role === role){
   
      const passwordFromUserDB = getUserFromDB.password
  
     const passwordMatch =await bcrypt.compare(password,passwordFromUserDB)
  
     if(passwordMatch){
  const token = jwt.sign({id:getUserFromDB._id},process.env.SECERET_KEY)
  
  const storeUserToken = await storeusertoken(token, getUserFromDB, role)
  
  response.send(storeUserToken)
  
     }else{
      response.status(401).send({message : "invalid credentials"})
     }
   
  
  }else{
  
      response.status(400).send({message : "invalid credentials "})
  }
  })

  export default router
