import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import { PrivateRoute } from './components/PrivateRoute';
import CalendarApp from './components/calendar/CalendarApp'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path='/calendar' element={<CalendarApp />} />
      </Routes>
    </Router>

  )
}

export default App
