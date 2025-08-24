import { useEffect } from 'react'
import { type CardProps } from '../components/Card'
import { useBrainContext } from '../components/hooks/useBrainContext'
import { useParams } from 'react-router-dom'
import { ShareCard } from '../components/ShareCard'
export const Share = () => {
   const { hash } = useParams()
   const { brainContents, res, username } = useBrainContext(hash!)

   useEffect(() => {
      res()
   }, [])
   return (
      <div className="pt-10">
         <div className="w-full">
            <div className="mx-auto max-w-7xl px-4">
               <div className="flex justify-center items-center mb-8">
                  <h1 className="font-bold text-3xl text-center">
                     {username} Brain
                  </h1>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brainContents?.map(
                     ({ _id, link, type, title, tags, date }: CardProps) => (
                        <ShareCard
                           key={_id}
                           _id={_id}
                           type={type}
                           link={link}
                           title={title}
                           tags={tags}
                           date={date}
                        />
                     )
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}
