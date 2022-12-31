import express from 'express'
import { getingcommand } from '../services/allcommand.service.js';



const router = express.Router();

router.get('/command/:id', async function(request,response){
    const {id} = request.params
      
    const getingCommand = await getingcommand(id)
  
    
  response.send(getingCommand)
  })
  export default router


