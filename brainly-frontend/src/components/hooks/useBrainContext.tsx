import { useState } from 'react'
import { BACKEND_URL } from '../../config'
import type { CardProps } from '../Card'
import axios from 'axios'
export const useBrainContext = (hash: string) => {
   {
      const [brainContents, setContents] = useState<CardProps[]>([])
      const [username, setUsername] = useState()

      const res = async () => {
         try {
            const response = await axios.get(
               `${BACKEND_URL}api/v1/brain/${hash}`
            )

            setContents(response.data.content)
            setUsername(response.data.username)
         } catch (error) {
            console.error(error)
         }
      }

      return { brainContents, res, username }
   } // Add logic to fetch shareable content passed from params in shar
}
