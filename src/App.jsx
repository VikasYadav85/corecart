import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Services from './component/Services'
import About from './component/About'
// import Contact from './component/contact'
import Signup from './component/Signup'
import Login from './component/Login'
import Contact from './component/Contact'

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/services' element={<Services/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
