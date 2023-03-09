import axios from 'axios'
import { useState, createContext, useEffect } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({ user: null, token: "" })

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem('auth')
    if (data) {
      const parsedData = JSON.parse(data)
      setAuth({
        ...auth,
        user: parsedData.user,
        token: parsedData.token
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
