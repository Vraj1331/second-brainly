import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useEffect, useState } from 'react'
import { token } from './handleFormSubmission'
import type { CardProps } from '../Card'

export const useContent = () => {
   const [contents, setContents] = useState<CardProps[]>([])

   const onDelete = (id: string) => {
      setContents((prev) => prev.filter((t) => t._id !== id))
   }

   const res = async () => {
      try {
         const response = await axios.get(`${BACKEND_URL}api/v1/content/`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })

         setContents(response.data.fetchContent)
      } catch (error) {
         console.error(error)
      }
   }

   return { contents, res, onDelete }
}
