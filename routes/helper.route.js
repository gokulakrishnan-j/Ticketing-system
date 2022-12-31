import { helperAuth } from '../middleware/managerAuth.js';
import express from 'express'
import { helpertokens, helperlogouts, helperprofiles, gethelperprofiles, sendingquerytohelpers, getingquerydetails, updatingquerydetails } from '../services/helper.service.js';

const router = express.Router();

router.get('/token/:helpername',async function(request,response){
    const {helpername} = request.params
    const helperToken = await helpertokens(helpername)
  
    response.send(helperToken)
  })
  
  
  
  router.delete('/logout/:name',async function(request,response){
    const {name} = request.params
    const helperLogout = await helperlogouts(name)
    response.send(helperLogout)
  })
  
  router.put('/profile/:name', helperAuth, async function(request,response){
  const {name} = request.params
  const {profile} = request.body
    const helperProfile = await helperprofiles(name, profile)
    response.send("done")
  })
  
  
  
  
  
  router.get('/profile/:name', async function(request,response){
          const {name} = request.params
            const helperProfile = await gethelperprofiles(name)
            response.send(helperProfile)
          })


          router.get('/query', helperAuth, async function(request,response){
    
    
            const sendingQueryToHelper = await sendingquerytohelpers()
           
        
        response.send(sendingQueryToHelper)
        })
        
        router.get('/:id', helperAuth, async function(request,response){
            
            const {id} = request.params
            const getingQueryDetails = await getingquerydetails(id)
           
        
        response.send(getingQueryDetails)
        })
        
        router.put('/assign/:id', helperAuth, async function(request,response){
            
            const {id} = request.params
            const {assigedhelpername,value} =  request.body
        
            const updatingQueryDetails = await updatingquerydetails(id, assigedhelpername, value)
           
        
        response.send(updatingQueryDetails)
        
        })

export default router


