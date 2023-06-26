import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import '../styles/App.css'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigator = useNavigate();
  const changePage = (path) => {
    navigator(path)
  }

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    const data = {
      username: name,
      password: password,
    }
    console.log(data)
    sessionStorage.setItem('data', data)
  
  
    axios.post('http://119.235.112.154:3003/api/v1/users/login', data)
    .then(res => {
      const token = res.data.token
      console.log(token)
      sessionStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("token")}`
      if (res.data != null) {
        if (res.status != 400 || res.status != 500) {
          console.log(res)
          changePage('/task')
          alert("Login successful!")
        } else if (res.status == 400) {
          alert("Username or password wrong!")
        } else {
          alert("Unexpected error in server side")
        }
      }
    })
    .catch(error=>{
      alert(error)
    })
  }
  const buttonClick = e => {
    if (e.key === "Enter") {
        handleSubmit()
    }}
  return (
    <div className="login">
      <div className="center">

          <h1>Login</h1>
          
          <div className="formPadding">
            <div className="txt-field">
              <input type="text" name="username" id="user-input" required
              onChange={e => setName(e.target.value)}/>
              <span></span>
              <label htmlFor="username">Username</label>
            </div>
            <div className="txt-field">
              <input type="password" name="password" id="password-input" required
              onChange={e => setPassword(e.target.value)} onKeyDown={e => buttonClick(e)}/>
              <span></span>
              <label htmlFor="password">Password</label>
            </div>

            <button className="submit" id="submit-button" onClick={handleSubmit}>Login</button>
          </div>

      </div>
    </div>
  )
}

export default Login