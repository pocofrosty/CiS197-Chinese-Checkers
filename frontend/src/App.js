import React, { useState } from 'react'
import {
  Routes, Route, Outlet,
} from 'react-router-dom'

import axios from 'axios'
import { io } from 'socket.io-client'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignupPage'
import GameBoard from './components/GameBoard'
import HomePage from './components/HomePage'

// eslint-disable-next-line no-undef
export default App = () => {
  const [currentUsername, setCurrentUsername] = useState('')

  axios.defaults.baseURL = 'http://localhost:3000'
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="gameboard" element={<GameBoard currentUsername={currentUsername} setCurrentUsername={setCurrentUsername} />} />
          <Route path="login" element={<LoginPage setCurrentUsername={setCurrentUsername} />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="" element={<HomePage currentUsername={currentUsername} />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  )
}

const Layout = () => (
  <div>
    <Outlet />
  </div>
)

const ErrorPage = () => (
  <div>
    <h1> Invalid Site </h1>
  </div>
)
