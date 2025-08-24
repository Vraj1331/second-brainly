import type { NextFunction, Request, Response } from 'express'
import { ResponseCode } from './utils'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from './config'
import { Users } from '../db/schema'

declare global {
   namespace Express {
      interface Request {
         userId?: string
      }
   }
}

interface DecodedToken {
   id: string
}
export const UserMiddleWare = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const header = req.headers['authorization']

   if (!header) {
      return res.status(ResponseCode.NotFound).json({
         msg: 'Header missing',
      })
   }

   const extractToken = header.split(' ')[1]

   if (!extractToken) {
      return res.status(ResponseCode.NotFound).json({
         msg: 'Token missing',
      })
   }

   try {
      const extractUserId = jsonwebtoken.verify(
         extractToken,
         JWT_SECRET
      ) as DecodedToken

      const verifyUserId = await Users.findOne({
         _id: extractUserId.id,
      })

      if (!verifyUserId) {
         return res.status(ResponseCode.Conflict).json({
            msg: 'Incorrect token',
         })
      }
      req.userId = extractUserId.id
      next()
   } catch (error) {
      console.error(error)
   }
}
