import { ContentFilterContext } from '../components/ContentFilterContext'
import { MainContent } from '../components/MainContent'
import { Navbar } from '../components/Navbar'

export const Home = () => {
   return (
      <ContentFilterContext>
         <div className="flex">
            <div className="w-72">
               <Navbar />
            </div>
            <div className="flex-1 bg-[#F9FBFC] h-screen">
               <MainContent />
            </div>
         </div>
      </ContentFilterContext>
   )
}
