import React, { useEffect } from 'react'
import Home from './pages/Home/Home.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Player from './pages/Player/Player.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SquareNumber from './pages/Home/Sample.jsx'

const App = () => {
  const navigagte = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Logged in')
        navigagte('/square')
      } else {
        console.log('Not logged in')
        navigagte('/login')
      }
    })
  }, [])

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='login' element={<Login/>} />
        <Route path='player/:id' element={<Player/>} />
        <Route path='square' element={<SquareNumber />}/>
      </Routes>
    </div>
  )
}

export default App
