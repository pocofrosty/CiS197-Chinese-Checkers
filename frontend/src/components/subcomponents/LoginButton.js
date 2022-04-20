import React from 'react'
import axios from 'axios'

const LoginButton = ({
  username, password, switchScreens,
}) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={async () => {
      try {
        window.location.href = 'http://localhost:3000/auth/google'
        // await axios.get('/auth/google')
        const navigate = switchScreens
        navigate('/gameboard', { replace: true })
      } catch (e) {
        alert('Incorrect Username/Password')
      }
    }}
  >
    Log In
  </button>
)

export default LoginButton
