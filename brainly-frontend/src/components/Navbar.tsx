import type { ReactElement } from 'react'
import Logo from '../assets/Logo.avif'
import { TwitterIcon } from './icons/TwitterIcon'
import { YoutubeIcon } from './icons/YoutubeIcon'
import { FileIcon } from './icons/FileIcon'
import { Links } from './icons/Links'
import { HashTag } from './icons/HashTag'
import type { NavContent } from './utils/navbarContent'
import { useContent } from './hooks/useContent'
import { useContentFilter } from './ContentFilterContext'

export const Navbar = () => {
   const { setFilter } = useContentFilter()
   const NavLinks: NavContent[] = [
      {
         id: 1,
         title: 'All',
         imgLink: <FileIcon />,
      },
      {
         id: 2,
         title: 'Twitter',
         imgLink: <TwitterIcon />,
      },
      {
         id: 3,
         title: 'Youtube',
         imgLink: <YoutubeIcon />,
      },
      // {
      //    id: 4,
      //    title: 'Links',
      //    imgLink: <Links />,
      // },
      // {
      //    id: 5,
      //    title: 'Tags',
      //    imgLink: <HashTag />,
      // },
   ]

   return (
      <div className="h-screen w-72  bg-white border-slate-200 border-r fixed left-0 top-0">
         <div className="flex items-center gap-1 mt-8 ml-3">
            <img src={Logo} className="w-12 h-12 text-purple-600" />
            <span className="text-2xl font-semibold pt-1">Second Brain</span>
         </div>
         <div className="mt-8 p-2 px-5 ">
            {NavLinks.map(({ id, title, imgLink }) => (
               <div
                  key={id}
                  onClick={() => {
                     setFilter(title)
                  }}
                  className="flex items-center gap-3 mb-1 py-2 px-2 cursor-pointer hover:bg-gray-200 rounded transition-colors duration-150"
               >
                  {imgLink}
                  <p className="font-bold text-xl text-gray-700 text-center">
                     {title}
                  </p>
               </div>
            ))}
         </div>
      </div>
   )
}
