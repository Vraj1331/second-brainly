import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { mainRouter } from './routes'
import { MONGO_URL, PORT } from './utils/config'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', mainRouter)

const connectDB = async () => {
   try {
      await mongoose.connect(MONGO_URL)
   } catch (error) {
      console.error(error)
      process.exit()
   }
}

await connectDB()

app.listen(PORT, () => {
   console.log('Listening at port ', PORT)
})
