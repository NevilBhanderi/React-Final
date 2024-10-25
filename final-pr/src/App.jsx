import { useState } from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css'
import Signup from './assets/Signup'
import Login from './assets/Login'
import Dashboard from './Dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       
      <BrowserRouter>
          <Routes>
          <Route index element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dash' element={<Dashboard />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
