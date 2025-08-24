import express from 'express'
import { Content, Tags } from '../db/schema'
import { UserMiddleWare } from '../utils/middleware'
import { ResponseCode } from '../utils/utils'
import { handleTagId } from '../utils/handleTags'
import { ContentValidation } from '../utils/zodTypes'
import { formattedDate } from '../utils/handleDate'
import { parseUrl } from '../utils/parseUrl'

export const contentRouter = express.Router()

contentRouter.post('/', UserMiddleWare, async (req, res) => {
   const { type, link, title, tags } = req.body
   const userId = req.userId

   try {
      const contentValidation = ContentValidation.safeParse({
         type,
         link,
         title,
         tags,
      })

      if (!contentValidation.success) {
         return res.status(ResponseCode.InputError).json({
            msg: 'Invalid inputs',
         })
      }
   } catch (error) {
      console.error(error)
   }

   try {
      // This function return tagIds
      const handleTag = await handleTagId(tags)
      let finalUrl = link

      if (finalUrl.includes('youtu.be')) {
         finalUrl = parseUrl(finalUrl)
      }

      const addContent = await Content.create({
         type: type,
         link: finalUrl,
         title: title,
         tags: handleTag,
         userId: userId,
         date: formattedDate,
      })

      res.status(ResponseCode.Success).json({
         msg: 'Added content successfully',
      })
   } catch (error) {
      console.error(error)
   }
})

contentRouter.get('/', UserMiddleWare, async (req, res) => {
   const userId = req.userId

   try {
      const fetchContent = await Content.find({
         userId: userId,
      }).populate('tags', 'title')

      res.status(ResponseCode.Success).json({
         fetchContent,
      })
   } catch (error) {
      console.error(error)
   }
})

contentRouter.delete('/', UserMiddleWare, async (req, res) => {
   const contentId = req.body.contentId
   const userId = req.userId

   try {
      const deleteContent = await Content.findByIdAndDelete({
         _id: contentId,
         userId: userId,
      })

      if (!deleteContent) {
         return res.status(ResponseCode.NotFound).json({
            msg: 'Content not found',
         })
      }

      res.status(ResponseCode.Success).json({
         msg: 'Content deleted successfully',
      })
   } catch (error) {
      console.error(error)
   }
})
