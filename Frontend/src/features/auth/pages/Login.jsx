import React, { useState } from 'react'
import '../styles/form.css'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth.jsx'
const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { handleLogin, loading } = useAuth()
  const navigate = useNavigate()

  if(loading){
    return (
      <h1>Loading...</h1>
    )
  }
  
  async function handleSubmit(e){
    e.preventDefault()

    handleLogin(username, password)
    .then(res => {
      navigate('/')
    })

  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input 
          onInput={(e) => {setUsername(e.target.value)}} 
          type="text" 
          name="username" 
          placeholder='Enter Username' />

          <input 
          onInput={(e) => {setPassword(e.target.value)}} 
          type="password" 
          name="password" 
          placeholder='Enter Password' />

          <button type='submit'>Login</button>
        </form>

        <p>Don't have an account?<Link className='toggleAuthForm' to='/register'>Register</Link></p>
      </div>
    </main>
  )
}

export default Login
