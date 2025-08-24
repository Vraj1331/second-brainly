import express from 'express'
import { userRouter } from './user'
import { contentRouter } from './content'
import { brainRouter } from './brain'
export const mainRouter = express.Router()

mainRouter.use('/user', userRouter)
mainRouter.use('/content', contentRouter)
mainRouter.use('/brain', brainRouter)
