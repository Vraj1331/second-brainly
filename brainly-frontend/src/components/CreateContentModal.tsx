import { useRef, useState } from 'react'
import { Button } from './Button'
import { CrossIcon } from './icons/CrossIcon'
import { Input } from './Input'
import { category, tags } from './utils/staticContent'
import { useHandleSubmit } from './hooks/handleFormSubmission'

export interface ModalTypes {
   open: boolean
   onClose?: () => void
   onClick?: () => void
}
export const CreateContentModal = ({ open, onClose }: ModalTypes) => {
   const [selectedTag, setSelectedTag] = useState<typeof tags>([])
   const [selectedCategory, setSelectedCategory] = useState('Youtube')
   const titleRef = useRef<HTMLInputElement>()
   const linkRef = useRef<HTMLInputElement>()

   const handleTagClick = (tag: string) => {
      if (selectedTag.includes(tag)) {
         setSelectedTag(selectedTag.filter((t) => t !== tag))
      } else {
         setSelectedTag([...selectedTag, tag])
      }
   }

   const submitForm = () => {
      const title = titleRef.current?.value
      const link = linkRef.current?.value

      useHandleSubmit({
         title,
         link,
         type: selectedCategory,
         tags: selectedTag,
      })
   }
   return (
      <div>
         {open && (
            <div>
               <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500 opacity-60 flex justify-center items-center"></div>
               <div className="w-screen h-screen fixed  left-0 flex justify-center items-center">
                  <div className="bg-white w-96 py-2 rounded-xl opacity-100">
                     <div className="relative flex items-center justify-end h-12">
                        <h1 className="absolute left-1/2 -translate-x-1/2 text-blue-600 text-xl font-bold">
                           Add Content
                        </h1>
                        <div className="mr-3 cursor-pointer" onClick={onClose}>
                           <CrossIcon />
                        </div>
                     </div>
                     <form className="flex items-center justify-center mt-5 w-full ">
                        <div className="flex flex-col gap-2 items-center">
                           <div className="flex flex-col">
                              <label className="text-base text-blue-600 font-semibold mb-2">
                                 Title:
                              </label>
                              <Input
                                 type="text"
                                 placeholder="Enter title"
                                 reference={titleRef}
                              />
                           </div>
                           <div className="flex flex-col">
                              <label className="text-base text-blue-600 font-semibold mb-2">
                                 Link:
                              </label>
                              <Input
                                 type="text"
                                 placeholder="Enter Link"
                                 reference={linkRef}
                              />
                           </div>
                           <div className="text-center space-y-2 mt-1">
                              <p className="font-semibold">Choose Tag:</p>
                              <div className="flex flex-wrap justify-center gap-2 cursor-pointer">
                                 {tags.map((tag) => (
                                    <div
                                       key={tag}
                                       onClick={() => {
                                          handleTagClick(tag)
                                       }}
                                       className={`px-3 py-1 rounded-full transition font-medium
                                        ${
                                           selectedTag.includes(tag)
                                              ? 'bg-blue-700 text-white'
                                              : 'bg-blue-300 text-black hover:bg-blue-400'
                                        }`}
                                    >
                                       {tag}
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div className="text-center space-y-2 my-1">
                              <p className="font-semibold">Choose Category:</p>
                              <div className="flex flex-wrap justify-center gap-2 cursor-pointer">
                                 {category.map((category) => (
                                    <div
                                       key={category}
                                       onClick={() =>
                                          setSelectedCategory(category)
                                       }
                                       className={`px-3 py-1 rounded-full transition font-medium
                                        ${
                                           selectedCategory === category
                                              ? 'bg-blue-700 text-white'
                                              : 'bg-blue-300 text-black hover:bg-blue-400'
                                        }`}
                                    >
                                       {category}
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <div className="flex justify-center items-center">
                              <Button
                                 variant="primary"
                                 text="Submit"
                                 onClick={() => {
                                    submitForm()
                                 }}
                              />
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
