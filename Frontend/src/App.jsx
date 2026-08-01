import React from 'react'
import { RouterProvider } from 'react-router'
import AppRoutes from './AppRoutes'
import { AuthProvider } from './features/auth/auth.context'
import { PostContextProvider } from './features/post/post.context'

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App
