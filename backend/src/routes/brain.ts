import express from 'express'
import { nanoid } from 'nanoid'
import { Content, Links, Users } from '../db/schema'
import { UserMiddleWare } from '../utils/middleware'
import { ResponseCode } from '../utils/utils'

export const brainRouter = express.Router()

brainRouter.post('/share', UserMiddleWare, async (req, res) => {
   const share = req.body.share
   console.log(share)
   const id = nanoid(16)

   if (share) {
      const checkHash = await Links.findOne({
         userId: req.userId,
      })

      const oldHash = checkHash?.hash
      if (checkHash) {
         return res.status(ResponseCode.Success).json({
            msg: 'Already Enabled share',
            oldHash,
         })
      }

      try {
         const createLink = await Links.create({
            hash: 3,
            userId: req.userId,
         })
      } catch (error) {
         console.error(error)
      }

      res.status(ResponseCode.Success).json({
         msg: 'Enabled share',
         id,
      })
   } else {
      try {
         const deleteHash = await Links.findOneAndDelete({
            userId: req.userId,
         })
         res.status(ResponseCode.Success).json({
            msg: 'Disabled share',
         })
      } catch (error) {
         console.error(error)
      }
   }
})
brainRouter.get('/:shareLink', async (req, res) => {
   const hash = req.params.shareLink

   const findHash = await Links.findOne({
      hash: hash,
   })

   if (!findHash) {
      res.status(ResponseCode.NotFound).json({
         msg: 'Incorrect hash',
      })
   }

   try {
      const [returnContent, userData] = await Promise.all([
         Content.find({
            userId: findHash?.userId,
         }).populate('tags', 'title'),
         Users.findOne({
            _id: findHash?.userId,
         }),
      ])
      const userName = userData?.fullName
      res.status(ResponseCode.Success).json({
         username: userName,
         content: returnContent,
      })
   } catch (error) {
      console.error(error)
   }
})
