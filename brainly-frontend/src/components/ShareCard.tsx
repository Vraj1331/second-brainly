import type { CardProps } from './Card'
import { FileIcon } from './icons/FileIcon'
import { ShareIcon } from './icons/ShareIcon'
 

export const ShareCard = ({
   _id,
   title,
   type,
   link,
   tags,
   date,
}: CardProps) => {
   return (
      <div
         key={_id}
         className="bg-white rounded-md border border-gray-200 max-w-80 max-h-[550px] flex flex-col justify-between py-2 px-4 mt-10 mb-10"
      >
         <div>
            {/* Top: Title + Icons */}
            <div className="flex justify-between">
               <div className="flex gap-2 items-center">
                  <FileIcon />
                  <span className="font-semibold text-base">{title}</span>
               </div>
               <div className="flex gap-2 items-center">
                  <a href={link} target="_blank">
                     <ShareIcon size="size-5" color="#374151" />
                  </a>
               </div>
            </div>

            {/* Middle: Content */}
            <div className="mt-5 px-2 ">
               {type === 'Youtube' && (
                  <iframe
                     className="w-full h-52 rounded-md"
                     src={link}
                     title="YouTube video player"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                     referrerPolicy="strict-origin-when-cross-origin"
                     allowFullScreen
                  ></iframe>
               )}
               {type === 'Twitter' && (
                  <div className="w-full h-72 overflow-hidden rounded-md">
                     <blockquote className="twitter-tweet w-full">
                        <a href={link}></a>
                     </blockquote>
                  </div>
               )}
            </div>
         </div>

         {/* Bottom: Tags + Date */}
         <div className="mt-5 2 px-2">
            <div className="flex flex-wrap gap-1.5 mb-2">
               {tags.map((tag, index) => (
                  <span
                     key={index}
                     className="bg-purple-100 text-purple-600 rounded-2xl px-2 py-1 text-sm"
                  >
                     {tag.title}
                  </span>
               ))}
            </div>
            <span className="text-gray-500 text-sm">Added on {date}</span>
         </div>
      </div>
   )
}
