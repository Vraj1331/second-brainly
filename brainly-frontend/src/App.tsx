import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Share } from './pages/Share'

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/share/:hash" element={<Share />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
