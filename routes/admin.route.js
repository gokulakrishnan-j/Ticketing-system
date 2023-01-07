import { adminAuth } from "../middleware/managerAuth.js"
import express from 'express'
import { bcrypt,jwt} from "../index.js";
import genHashesPassword from "../index.js";
import {changehelpername, adminfromdb, creatingadmin, storeadmintokens, getinghelperfromdbs, getingmanagerfromdb, createhelpers, creatingmanagers, admintokens, adminlogout, adminprofiles, adminprofile, getinghelpertoadmin, getingmanagertoadmin, getingquery, getingquerys, getingquerysofmanager, getingqueryofuser ,changePassword, changemanage } from "../services/admin.service.js";
import { transporter } from "../index.js";


const router = express.Router();




async function adminFromDb(adminname){

    const getingadminfromDB = await adminfromdb(adminname)
  
      return getingadminfromDB
      
  }
  


async function createAdmin(adminDetails){
  
    const creatingAdmin = await creatingadmin(adminDetails)
  
      return creatingAdmin
      
  }
  
router.post('/signup',async function (request,response){
    const {adminname,password,createdDate,createdTime} = request.body
  
    const getAdminFromDB = await adminFromDb(adminname)
  
    if(getAdminFromDB){
      response.status(400).send({message : "username alredy exists"})
    }else if(password.length < 8){
      response.status(400).send({message : "your password must be at least 8 characters"})
    }else{
      const hashedPassword = await genHashesPassword(password)
  
      const hashAndAdmin = await createAdmin({adminname:adminname,password:hashedPassword,
        createdDate:createdDate,createdTime:createdTime})
  
      response.send(hashAndAdmin)
    }
  
  })
  
router.post('/signin',async function (request,response){
    const {adminname,password} = request.body
  
    const getAdminFromDB = await adminFromDb(adminname)
  
    if(!getAdminFromDB){
      response.status(400).send({message : "username not found exists"})
    }else{
      const passwordFromAdminDB = getAdminFromDB.password
  
     const passwordMatch =await bcrypt.compare(password,passwordFromAdminDB)
  
     if(passwordMatch){
  const token = jwt.sign({id:getAdminFromDB._id},process.env.SECERET_KEY)
  
  const storeAdminToken = await storeadmintokens(token, getAdminFromDB)
  
  response.send(storeAdminToken)
  
     }else{
      response.status(401).send({message : "invalid credentials"})
     }
    }
  
  })
  





  async function helperFromDb(helpername){

    const getinghelperfromDB = await getinghelperfromdbs(helpername)
  
      return getinghelperfromDB
      
  }
  


  async function managerFromDb(managername){
  
    const getingmanagerfromDB = await getingmanagerfromdb(managername)
  
      return getingmanagerfromDB
      
  }
  
  


async function createHelper(helperDetails){
  
    const createHelper = await createhelpers(helperDetails)
  
      return createHelper
      
  }
  
router.post('/helpersignup',adminAuth, async function (request,response){
    const {name,helpername,password,createdDate,createdTime,role,gender} = request.body
  
    const getHelperFromDB = await helperFromDb(helpername)
  
    if(getHelperFromDB){
      response.status(400).send({message : "username alredy exists"})
    }else if(password.length < 8){
      response.status(400).send({message : "your password must be at least 8 characters"})
    }else{
      const hashedPassword = await genHashesPassword(password)
  
      const hashAndHelper = await createHelper({name:name,helpername:helpername,password:hashedPassword,
        createdDate:createdDate,createdTime:createdTime,role:role,gender:gender})
  
      response.send(hashAndHelper)
    }
  
  })
  
  
  

async function createManager(managerDetails){
  
    const createManager = await creatingmanagers(managerDetails)
  
      return createManager
      
  }
  
router.post('/managersignup',adminAuth, async function (request,response){
    const {name,managername,password,createdDate,createdTime,role,gender,position} = request.body
  
    const getManagerFromDB = await managerFromDb(managername)
  
    if(getManagerFromDB){
      response.status(400).send({message : "username alredy exists"})
    }else if(password.length < 8){
      response.status(400).send({message : "your password must be at least 8 characters"})
    }else{
      const hashedPassword = await genHashesPassword(password)
  
      const hashAndManager = await createManager({name:name,managername:managername,password:hashedPassword,
        createdDate:createdDate,createdTime:createdTime,role:role,gender:gender,position:position})
  
      response.send(hashAndManager)
    }
  
  })

router.get('/token/:adminname',async function(request,response){
    const {adminname} = request.params
    const adminToken = await admintokens(adminname)
  
    response.send(adminToken)
  })

 router.delete('/logout/:name',async function(request,response){
    const {name} = request.params
    const adminLogout = await adminlogout(name)
    response.send(adminLogout)
  })
router.put('/profile/:name', adminAuth, async function(request,response){
    const {name} = request.params
    const {profile} = request.body
      const adminProfile = await adminprofiles(name, profile)
      response.send("done")
    })
router.get('/profile/:name', adminAuth, async function(request,response){
        const {name} = request.params
       
          const adminProfile = await adminprofile(name)
          response.send(adminProfile)
         
        })
router.get('/helper', adminAuth, async function(request,response){
    
            const getingHelperTOAdmin = await getinghelpertoadmin()
          
          response.send(getingHelperTOAdmin)
          })
          
router.get('/manager', adminAuth, async function(request,response){
              
            const getingManagerTOAdmin = await getingmanagertoadmin()
          
          response.send(getingManagerTOAdmin)
          })
router.get('/query', adminAuth, async function(request,response){
   
            const getingQuery = await getingquery()
          
          response.send(getingQuery)
          })
router.get('/helpers', adminAuth, async function(request,response){
             
            const getingQuery = await getingquerys()
          
          response.send(getingQuery)
          })
router.get('/managers', adminAuth, async function(request,response){
             
            const getingQuery = await getingquerysofmanager()
          
          response.send(getingQuery)
          })
router.get('/users', adminAuth, async function(request,response){
             
            const getingQuery = await getingqueryofuser()
          
          response.send(getingQuery)
          })


          async function changepassword (data){
        
            const changedPassword= await changePassword(data)
           }
   
           router.put('/newpassword/:name',async function (request,response){
   
    
             const {adminname,password,newpassword} = request.body
           
            
           
               var getAdminFromDB = await adminFromDb(adminname)
           
           
             
             if(getAdminFromDB ){
              
            
                 const passwordFromUserDB = getAdminFromDB.password
             
                const passwordMatch =await bcrypt.compare(password,passwordFromUserDB)
             
                if(passwordMatch){
                 const hashedPassword = await genHashesPassword(newpassword)
             
            const  handleChange = changepassword({adminname:adminname,password:hashedPassword})
             
             response.send(handleChange)
             
                }else{
                 response.status(401).send({message : "invalid credentials "})
                }
              
               
             }
           })


           router.put('/changemanagername/:managername',adminAuth,async function(request,response){
            
            const {managername} = request.params
            const {newname,newgender} = request.body
            
            const changeManager = await changemanage(managername, newname, newgender)
            response.send({message: "name and gender updated"})
          })

          router.put('/changehelpername/:helpername',adminAuth,async function(request,response){
            
            const {helpername} = request.params
            const {newname,newgender} = request.body
            
            const changehelper = await changehelpername(helpername, newname, newgender)
            response.send(helpername)
          })
         

          router.post('/forgottenpassword/:email',async function (request,response){
   
    
            const {email} = request.body
          
              var getAdminFromDB = await adminFromDb(email)
          
          
            
            if(getAdminFromDB ){
             
              var mailOptions = {
                from: 'zen-class',
                to: email,
                subject: 'Change password',
                text: `https://ticketing-system-for-query.netlify.app/admin/forgottenpassword/${getAdminFromDB.adminname}`
              };
              
              transporter.sendMail(mailOptions);
             
              
            }else{
              response.status(401).send({message:"Username not exist"})
            }
          })

          router.put('/changeforgottenpassword/:email',async function (request,response){
   

    
            const {password} = request.body
          const {email} = request.params
           
          
              var getAdminFromDB = await adminFromDb(email)
          
          
            
            if(getAdminFromDB ){
            
              
                const hashedPassword = await genHashesPassword(password)
            
           const  handleChange = changepassword({adminname:email,password:hashedPassword})
            
            response.send(handleChange)
            
              
             
              
            }
          })

export default router;




