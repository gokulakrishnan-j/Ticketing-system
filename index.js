import express from 'express'
import { MongoClient, ObjectId } from 'mongodb'
import cors from 'cors'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import generator from 'generate-password'
import adminRouter from './routes/admin.route.js'
import userRouter from './routes/users.route.js'
import managerRouter from './routes/manager.route.js'
import helperRouter from './routes/helper.route.js'
import allcommand from './routes/allcommand.route.js'
import mainsigin from './routes/mainsingin.route.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT



const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL)
await client.connect()

app.use(cors())
app.use(express.json())


var transporter = nodemailer.createTransport({
    service: 'gmail' ,
    auth: {
      user: 'zenclass1234@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
 


async function genHashesPassword (password){
  const NO_OF_ROUNDS = 10
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
  const hashPassword = await bcrypt.hash(password,salt)

  return hashPassword
}


app.use('/main',mainsigin)
app.use('/all',allcommand)
app.use('/admin',adminRouter)
app.use('/user',userRouter)
app.use('/management',managerRouter)
app.use('/helpdesk',helperRouter)



app.listen(PORT)

export {client,bcrypt,jwt,generator,transporter,ObjectId}
export default genHashesPassword
