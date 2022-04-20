import React from 'react'
import {
  Routes, Route, Outlet,
} from 'react-router-dom'

import axios from 'axios'
import LoginPage from './components/LoginPage'
import GameBoard from './components/GameBoard'

// eslint-disable-next-line no-undef
export default App = () => {
  axios.defaults.baseURL = 'http://localhost:3000'
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="gameboard" element={<GameBoard />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<label className="font-bold"> test </label>} />
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
