import axios from 'axios'
import { BACKEND_URL } from '../../config'

interface formTypes {
   title: string
   link: string
   tags: string[]
   type: string
   date?: string
}

export const token = localStorage.getItem('token')
export const useHandleSubmit = async ({
   title,
   link,
   tags,
   type,
}: formTypes) => {
   try {
      const data = await axios.post(
         `${BACKEND_URL}api/v1/content/`,
         {
            title,
            link,
            tags,
            type,
         },
         {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         }
      )
      console.log(data.data)
   } catch (error) {
      console.error(error)
   }
}
