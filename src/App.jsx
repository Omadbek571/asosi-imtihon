import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Detailes from './pages/Detailes'
import SideBar from './layout/SideBar'
import ErroePages from './pages/ErroePages'

function App() {
  return (
    <div className='lg:flex md:mx-auto   rounded-md'>
      <div className=''>
        <SideBar/>
      </div>
      <div className='flex-col mx-auto container'>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/detailes/:id' element={<Detailes></Detailes>}></Route>
          <Route path='*' element={<ErroePages></ErroePages>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App