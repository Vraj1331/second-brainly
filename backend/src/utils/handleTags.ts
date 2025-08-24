import mongoose from 'mongoose'
import { Tags } from '../db/schema'

// This function takes tags as input and returns a Promise which expects array of ObjectId when resolved
export const handleTagId = async (
   tags: string[]
): Promise<mongoose.Types.ObjectId[]> => {
   const tagIds: mongoose.Types.ObjectId[] = []

   for (const title of tags) {
      let tag = await Tags.findOne({ title })

      if (!tag) {
         tag = await Tags.create({
            title: title,
         })
      }
      tagIds.push(tag?._id)
   }
   return tagIds
}
