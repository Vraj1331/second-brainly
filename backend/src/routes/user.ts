import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { Users } from '../db/schema'
import { ResponseCode } from '../utils/utils'
import { JWT_SECRET } from '../utils/config'
import { SignInValidation, SignUpValidation } from '../utils/zodTypes'

export const userRouter = express.Router()

userRouter.post('/signup', async (req, res) => {
   const fullName = req.body.fullName
   const username = req.body.username
   const password = req.body.password

   const validateInput = SignUpValidation.safeParse({
      username,
      password,
      fullName,
   })

   if (!validateInput.success) {
      return res.status(ResponseCode.InputError).json({
         msg: 'Invalid inputs',
      })
   }
   const checkUsername = await Users.findOne({
      username: username,
   })

   if (checkUsername) {
      return res.status(ResponseCode.Conflict).json({
         msg: 'Username already exists',
      })
   }

   try {
      const addUser = await Users.create({
         username,
         password,
         fullName,
      })

      res.status(200).json({
         msg: 'Hello User',
      })
   } catch (error) {
      console.error(error)
   }
})
userRouter.post('/signin', async (req, res) => {
   const username = req.body.username
   const password = req.body.password

   const validateInput = SignInValidation.safeParse({
      username,
      password,
   })

   if (!validateInput.success) {
      return res.status(ResponseCode.InputError).json({
         msg: 'Invalid inputs',
      })
   }
   const checkUserExists = await Users.findOne({
      username: username,
   })

   if (!checkUserExists) {
      return res.status(ResponseCode.UnAuthorised).json({
         msg: 'Invalid username',
      })
   }

   try {
      const checkPassword = await checkUserExists.isValidPassword(password)
      if (!checkPassword) {
         return res.status(ResponseCode.UnAuthorised).json({
            msg: 'Incorrect password',
         })
      }

      const jwt = jsonwebtoken.sign(
         {
            id: checkUserExists._id,
         },
         JWT_SECRET
      )

      res.status(200).json({
         msg: 'Welcome back user',
         token: jwt,
      })
   } catch (error) {
      console.error(error)
   }
})
