import { managerAuth } from '../middleware/managerAuth.js';
import express from 'express'
import { transporter } from "../index.js";
import { managertokens, managerlogouts, managerprofile, managerprofiles, updatingquerydetails, getingquerystomanager, getingquerydetailstomanager, getingmanagerdetails, postingcommands } from '../services/manager.service.js';


const router = express.Router();

  router.get('/token/:managername',async function(request,response){
    const {managername} = request.params
    const managerToken = await managertokens(managername)
  
    response.send(managerToken)
  })
  router.delete('/logout/:name',async function(request,response){
    const {name} = request.params
    const managerLogout = await managerlogouts(name)
    response.send(managerLogout)
  })
  router.put('/profile/:name', managerAuth, async function(request,response){


    const {name} = request.params
    const {profile} = request.body
      const managerProfile = await managerprofile(name, profile)
      response.send("done")
    })
    router.get('/profile/:name', async function(request,response){
        const {name} = request.params
  
          const managerProfile = await managerprofiles(name)
          response.send(managerProfile)
        })
        router.put('/assign/:id', managerAuth, async function(request,response){
    
            const {completedmanagername,emailcontent,status,details}= request.body
            const {id} = request.params
            const updatingQueryDetails = await updatingquerydetails(id, status, emailcontent, completedmanagername)
           
          
          var mailOptions = {
            from: 'zen-class',
            to: request.body.details.studentName,
            subject: request.body.details.queryDescription,
            text: request.body.emailcontent
          };
          
          transporter.sendMail(mailOptions);
          response.send(updatingQueryDetails)
          
          })
          
          router.get('/query', managerAuth, async function(request,response){
              
              const getingQuerysToManager = await getingquerystomanager()
             
          
          response.send(getingQuerysToManager)
          })
          
  router.get('/:id', managerAuth, async function(request,response){
              
              const {id} = request.params
              const getingQueryDetailsToManager = await getingquerydetailstomanager(id)
             
          
          response.send(getingQueryDetailsToManager)
          })
   router.get('/details/:name', async function(request,response){
             const {name} = request.params
            const getingManagerDetails = await getingmanagerdetails(name)
          
          response.send(getingManagerDetails)
          })
          
          
          
 router.post('/command', managerAuth, async function(request,response){
              
            const postingCommand = await postingcommands(request)
          
            
          response.send("done")
          })



export default router


