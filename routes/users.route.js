import { userAuth } from '../middleware/managerAuth.js';
import express from 'express'
import { generator,transporter} from "../index.js";
import genHashesPassword from "../index.js";
import { bcrypt} from '../index.js';
import { changePassword , getinguserfromdb, creatingusers, usertoken, userlogout, userprofile, getuserprofile, getingquerys, postingquerys, getingquerydetails } from '../services/user.service.js';


const router = express.Router();

async function userFromDb(username){

    const getinguserfromDB = await getinguserfromdb(username)
  
      return getinguserfromDB
      
  }
  


async function createUser(userDetails){
  
    const creatingUser = await creatingusers(userDetails)
  
      return creatingUser
      
  }
  
router.post('/signup',async function (request,response){
    const {email,password,createdDate,createdTime,name,role} = request.body
  
    const getUserFromDB = await userFromDb(email)
  
    if(getUserFromDB){
      response.status(400).send({message : "username alredy exists"})
    }else if(password.length < 8){
      response.status(400).send({message : "your password must be at least 8 characters"})
    }else{
      const hashedPassword = await genHashesPassword(password)
  
      const hashAndUser = await createUser({email:email,password:hashedPassword,
      createdDate:createdDate,createdTime:createdTime,name:name,role:role})
  
      response.send(hashAndUser)
    }
  
  })
router.get('/token/:username',async function(request,response){
    const {username} = request.params
    const userToken = await usertoken(username)
  
    response.send(userToken)
  })
router.get('/autogenpassword',async function(request,response){
  
    var password = generator.generate({
      length: 14,
      symbols : true,
      numbers: true
    });
  
    response.send({password:password})
    
  
  })

  
router.delete('/logout/:name',async function(request,response){
  const {name} = request.params
    const userLogout = await userlogout(name)
    response.send(userLogout)
  })
router.put('/profile/:name', userAuth, async function(request,response){
    const {name} = request.params
    const {profile} = request.body
      const userProfile = await userprofile(name, profile)
      response.send("done")
    })
router.get('/profile/:name', userAuth, async function(request,response){
        const {name} = request.params

          const userProfile = await getuserprofile(name)
          response.send(userProfile)
        })
 router.get('/query', userAuth, async function(request,response){
   
            const getingQuery = await getingquerys()
        
        response.send(getingQuery)
        })
        
router.post('/query',userAuth, async function(request,response){
            
            const postingQuery = await postingquerys(request)
        
            var mailOptions = {
                from: 'zen-class',
                to: request.body.studentName,
                subject: request.body.queryTitle,
                text: 'Your query sent sucessfully'
              };
              
              transporter.sendMail(mailOptions);
        
        response.send("done")
        })
        
 router.get('/query/:id', userAuth, async function(request,response){
            
            const {id} = request.params
            const getingQueryDetails = await getingquerydetails(id)
           
        
        response.send(getingQueryDetails)
        })


       
        async function changepassword (data){
         
         const changedPassword= await changePassword(data)
        }

        router.put('/newpassword/:name',async function (request,response){

 
          const {email,password,newpassword} = request.body
        
          
        
            var getManagerFromDB = await userFromDb(email)
        
        
          
          if(getManagerFromDB ){
           
         
              const passwordFromUserDB = getManagerFromDB.password
          
             const passwordMatch =await bcrypt.compare(password,passwordFromUserDB)
          
             if(passwordMatch){
              const hashedPassword = await genHashesPassword(newpassword)
          
         const  handleChange = changepassword({email:email,password:hashedPassword})
          
          response.send(handleChange)
          
             }else{
              response.status(401).send({message : "invalid credentials "})
             }
           
            
          }
        })

        router.post('/forgottenpassword/:email',async function (request,response){
   
    
          const {email} = request.body
        
            var getUserFromDB = await userFromDb(email)
        
        
          
          if(getUserFromDB ){
           
            var mailOptions = {
              from: 'zen-class',
              to: email,
              subject: 'Change password',
              text: `https://ticketing-system-for-query.netlify.app/student/forgottenpassword/${getUserFromDB.email}`
            };
            
            transporter.sendMail(mailOptions);
           response.send({message:"done"})
            
          }else{
            response.status(401).send({message:"Username not exist"})
          }
        })

        router.put('/changeforgottenpassword/:email',async function (request,response){

 
          const {password} = request.body
        const {email} = request.params
          
        
            var getManagerFromDB = await userFromDb(email)
        
        
          
          if(getManagerFromDB ){
           
         
          
             
              const hashedPassword = await genHashesPassword(password)
          
         const  handleChange = changepassword({email:email,password:hashedPassword})
          
          response.send(handleChange)
           
            
          }
        })

export default router


