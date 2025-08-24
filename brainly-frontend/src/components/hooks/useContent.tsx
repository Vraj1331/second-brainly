import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { BACKEND_URL } from '../../config'
import { token } from './handleFormSubmission'
import type { CardProps } from '../Card'

export const useContent = () => {
   const [contents, setContents] = useState<CardProps[]>([])

   const fetchContents = useCallback(async () => {
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
   }, [])

   const onDelete = (id: string) => {
      setContents((prev) => prev.filter((t) => t._id !== id))
   }

   useEffect(() => {
      fetchContents()
   }, [fetchContents])

   return { contents, fetchContents, onDelete }
}
