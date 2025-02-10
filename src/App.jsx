import React from 'react'
import Home from './pages/Home'
import MyLayout from './layout/MyLayout'
import { Route, Routes } from 'react-router-dom'
import Detailes from './pages/Detailes'

function App() {
  return (
    <div className='container mx-auto lg:flex  rounded-md'>
      <div>
        <MyLayout></MyLayout>
      </div>
      <div className='flex flex-col mx-auto'>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/detailes/:id' element={<Detailes></Detailes>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App