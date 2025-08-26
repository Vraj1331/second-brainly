import { useRef } from 'react'
import Logo from '../assets/Logo.avif'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
export const SignUp = () => {
   const usernameRef = useRef<HTMLInputElement>()
   const passwordRef = useRef<HTMLInputElement>()
   const fullNameRef = useRef<HTMLInputElement>()
   const navigate = useNavigate()

   const signUp = async (e: any) => {
      e.preventDefault()
      try {
         const username = usernameRef.current?.value
         const password = passwordRef.current?.value
         const fullName = fullNameRef.current?.value

         const res = await axios.post(`${BACKEND_URL}api/v1/user/signup`, {
            username,
            password,
            fullName,
         })

         navigate('/signin')
      } catch (error) {
         console.error(error)
      }
   }
   return (
      <div className="h-screen w-full bg-[#F9FBFC]">
         <div className="flex items-center gap-1 mt-2 ml-3 pb-5 justify-center border-b  border-neutral-200">
            <img src={Logo} className="w-14 h-14 " />
            <span className="text-4xl font-semibold pt-1">first Brain</span>
         </div>

         <div className="mt-10">
            <h1 className="text-center text-4xl">SignUp to get started</h1>
         </div>

         <div className="mt-10 flex items-center justify-center ">
            <form className="flex items-center justify-center mt-5 bg-white shadow-md max-w-96 px-10 py-10 rounded">
               <div className="flex flex-col gap-2 items-center">
                  <div className="flex flex-col">
                     <label className="text-base text-blue-600 font-semibold mb-2">
                        FullName:
                     </label>
                     <Input
                        type="text"
                        placeholder="Username"
                        reference={fullNameRef}
                     />
                     <label className="text-base text-blue-600 font-semibold mb-2">
                        Username:
                     </label>
                     <Input
                        type="text"
                        placeholder="Username"
                        reference={usernameRef}
                     />
                  </div>
                  <div className="flex flex-col">
                     <label className="text-base text-blue-600 font-semibold mb-2">
                        Password:
                     </label>
                     <Input
                        type="password"
                        placeholder="Password"
                        reference={passwordRef}
                     />
                  </div>
                  <div className="flex justify-center items-center mt-5">
                     <Button
                        variant="primary"
                        text="Submit"
                        onClick={(e) => {
                           signUp(e)
                        }}
                     />
                  </div>
                  <div className="text-neutral-500 text-xl">
                     Already have an account?{' '}
                     <a href="/" className="text-red-600">
                        SignIn
                     </a>
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}
