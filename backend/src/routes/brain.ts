import express from 'express'
import { nanoid } from 'nanoid'
import { Content, Links, Users } from '../db/schema'
import { UserMiddleWare } from '../utils/middleware'
import { ResponseCode } from '../utils/utils'

export const brainRouter = express.Router()

brainRouter.post('/share', UserMiddleWare, async (req, res) => {
   const share = req.body.share
   const id = nanoid(16)

   if (share) {
      const checkHash = await Links.findOne({ userId: req.userId })

      if (checkHash) {
         return res.status(ResponseCode.Success).json({
            msg: 'Already Enabled share',
            oldHash: checkHash.hash,
         })
      }

      try {
         await Links.create({
            hash: id,
            userId: req.userId,
         })

         return res.status(ResponseCode.Success).json({
            msg: 'Enabled share',
            id,
         })
      } catch (error) {
         console.error(error)
         return res.status(ResponseCode.Error).json({
            msg: 'Something went wrong while enabling share',
         })
      }
   } else {
      try {
         await Links.findOneAndDelete({ userId: req.userId })
         return res.status(ResponseCode.Success).json({
            msg: 'Disabled share',
         })
      } catch (error) {
         console.error(error)
         return res.status(ResponseCode.Error).json({
            msg: 'Something went wrong while disabling share',
         })
      }
   }
})

brainRouter.get('/:shareLink', async (req, res) => {
   const hash = req.params.shareLink

   const findHash = await Links.findOne({ hash })
   if (!findHash) {
      return res.status(ResponseCode.NotFound).json({
         msg: 'Incorrect hash',
      })
   }

   try {
      const [returnContent, userData] = await Promise.all([
         Content.find({ userId: findHash.userId }).populate('tags', 'title'),
         Users.findOne({ _id: findHash.userId }),
      ])

      return res.status(ResponseCode.Success).json({
         username: userData?.fullName,
         content: returnContent,
      })
   } catch (error) {
      console.error(error)
      return res.status(ResponseCode.Error).json({
         msg: 'Something went wrong while fetching content',
      })
   }
})
