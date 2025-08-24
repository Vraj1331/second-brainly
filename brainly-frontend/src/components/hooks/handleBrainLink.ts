import axios from 'axios'
import { BACKEND_URL } from '../../config'
const FRONTEND_URL = 'http://localhost:5173/'

const token = localStorage.getItem('token')
export const handleBrainLink = async (share: boolean) => {
   let uniqueId = ''
   try {
      const data = await axios.post(
         `${BACKEND_URL}api/v1/brain/share`,
         {
            share,
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      )
      uniqueId = data.data.id || data.data.oldHash
   } catch (error) {
      console.error(error)
   }
   const createShareUrl = `${FRONTEND_URL}share/${uniqueId}`

   if (createShareUrl) {
      await navigator.clipboard.writeText(createShareUrl)
   }

   console.log('Done copying url')

   return true
}
