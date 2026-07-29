import React from 'react'
import { RouterProvider } from 'react-router'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './features/auth/auth.context'

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>   
  )
}

export default App
