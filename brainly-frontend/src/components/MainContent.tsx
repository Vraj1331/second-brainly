import { useEffect, useState } from 'react'
import { Button } from './Button'
import { CreateContentModal } from './CreateContentModal'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
import { Card, type CardProps } from './Card'
import { useContent } from './hooks/useContent'
import { useNavigate } from 'react-router-dom'
import { CreateBrainModal } from './CreateBrainModal'
import { handleBrainLink } from './hooks/handleBrainLink'
import { toast, Toaster } from 'sonner'
import { useContentFilter } from './ContentFilterContext'

export const MainContent = () => {
   const [formModalOpen, setFormModelOpen] = useState(false)
   const [shareModalOpen, setShareModalOpen] = useState(false)
   const { contents, res, onDelete } = useContent()
   const navigate = useNavigate()
   const { filter } = useContentFilter()

   const handleLogout = () => {
      navigate('/')
      localStorage.clear()
   }

   const filteredContents = contents.filter((item) =>
      filter === 'All' ? true : item.type === filter
   )
   const handleShareBtn = async () => {
      const res = await handleBrainLink(true)
      toast.success('Link copied to your clipboard', {
         style: {
            fontSize: '20px',
            color: 'green',
         },
         duration: 3000,
      })
   }

   useEffect(() => {
      res()
      //@ts-ignore
      if (window.twttr) {
         //@ts-ignore
         window.twttr.widgets.load()
      }
   }, [formModalOpen, filteredContents])

   return (
      <div className="bg-[#F9FBFC]">
         <Toaster position="top-right" />
         <CreateContentModal
            open={formModalOpen}
            onClose={() => {
               setFormModelOpen(false)
            }}
         />
         <CreateBrainModal
            open={shareModalOpen}
            onClose={() => {
               setShareModalOpen(false)
            }}
            onClick={() => {
               handleShareBtn?.()
            }}
         />
         <div className=" w-full h-fit">
            <div className="mt-8 mx-10 ">
               <div className="flex justify-between ">
                  <div className="flex justify-center items-center">
                     <h1 className="font-bold text-3xl">{filter}</h1>
                  </div>
                  <div className="flex gap-3">
                     <Button
                        variant="secondary"
                        text="Share Brain"
                        startIcon={
                           <ShareIcon size="size-5" color="currentColor" />
                        }
                        onClick={() => {
                           setShareModalOpen(true)
                        }}
                     />
                     <Button
                        variant="primary"
                        text="Add Content"
                        startIcon={<PlusIcon />}
                        onClick={() => {
                           setFormModelOpen(true)
                        }}
                     />
                     <Button
                        variant="danger"
                        text="Logout"
                        onClick={handleLogout}
                     />
                  </div>
               </div>
            </div>
            {/* Card Component */}
            <div className="grid grid-cols-3 px-10">
               {filteredContents?.map(
                  ({ _id, link, type, title, tags, date }: CardProps) => (
                     <Card
                        _id={_id}
                        type={type}
                        link={link}
                        title={title}
                        tags={tags}
                        date={date}
                        onDelete={onDelete}
                     />
                  )
               )}
            </div>
         </div>
      </div>
   )
}
