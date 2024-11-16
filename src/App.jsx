import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './page/Login'
import Signup from './page/Signup'
import Dashboard from './page/main/Dashboard'
import F from './f'

export default function App() {
  return (
   <>
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/singup' element={<Signup />} />
            <Route path='/f' element={<F />} />
            </Routes>
        </BrowserRouter>
   </>
  )
}
