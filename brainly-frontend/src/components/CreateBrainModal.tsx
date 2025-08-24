import type { ModalTypes } from './CreateContentModal'
import { CrossIcon } from './icons/CrossIcon'
import { TwoSquare } from './icons/TwoSquare'

export const CreateBrainModal = ({ open, onClose, onClick }: ModalTypes) => {
   return (
      <div>
         {open && (
            <div>
               <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500 opacity-60 flex justify-center items-center"></div>
               <div className="w-screen h-screen fixed  left-0 flex justify-center items-center">
                  <div className="bg-white w-md py-2 rounded-xl opacity-100">
                     <div className="flex px-6 justify-between py-3 items-cente ">
                        <h1 className="text-xl font-semibold">
                           Share Your Second Brain
                        </h1>
                        <div className="mr-3 cursor-pointer" onClick={onClose}>
                           <CrossIcon />
                        </div>
                     </div>
                     <div className="flex justify-center items-center px-6 mt-1 pt-2 font-medium text-base text-[#535B65]">
                        Share your entire collection of notes,documents, <br />
                        tweets, and videos with others. They'll be able to
                        import your content into their Second Brain.
                     </div>
                     <div className="flex justify-center mt-4 w-full px-6">
                        <button
                           onClick={() => {
                              ;(onClick?.(), onClose?.())
                           }}
                           className="bg-purple-600 text-white font-normal text-lg px-4 py-3 rounded-xl 
                        text-center rounded-xl-sm gap-2 flex items-center justify-center cursor-pointer w-full"
                        >
                           <TwoSquare />
                           Share Brain
                        </button>
                     </div>

                     <div className="flex justify-center mt-4 mb-2 text-gray-500">
                        3 items will be shared
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
