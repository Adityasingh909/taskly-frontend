import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import {Routes,Route} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { useState } from 'react'

function App() {
   const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
    <Routes>
      <Route path='/login' element = {<Login/>} />
      <Route path='/register' element = {<Register/>} />
      <Route path='/dashboard' element = {
        <ProtectedRoute>
          <Dashboard
          darkMode={darkMode}

        setDarkMode={setDarkMode}
          />
        </ProtectedRoute>
      } />
    </Routes>
    </div>
  )
}

export default App