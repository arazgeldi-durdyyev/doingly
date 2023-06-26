import React, { useState } from 'react'
// import { AxiosInstance } from './Main';
// import { Button } from '@mui/material';
import '../styles/App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigator = useNavigate();
  const changePage = (path) => {
    navigator(path)
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    // const data = {
    //   name,
    //   email,
    //   password,
    // };
    const data = {
      username: name,
      email: email,
      password: password,
    }

  
        axios.post('http://119.235.112.154:3003/api/v1/users/register', data)
        .then(res => {
          console.log(res)
          const token = res.data.token
          console.log(token)
          sessionStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          if (res.status == 200) {
            changePage('/task')
            alert('Registered Successfully!')
          }
        })
        .catch(error=>{
          if (error.response.status == 409) {
            alert('Some data (username, email, or password) are already in use by other users \n Try adding unique info')
          }else if (error.response.status == 400) {
            alert('email, username, password are required!')
          }else if (error.response.status == 500) {
            alert('Unexpected error in server side')
          } else {
            alert(error)
          }
        })

  }

    const buttonClick = e => {
    if (e.key === "Enter") {
        handleSubmit()
    }}

  return (
    <div className="register">
    <div className="center">

        <h1>Register</h1>
        
        <div className="formPadding">
          <div className="txt-field">
            <input type="text" name="username" id="user-input" required
            onChange={e=> setName(e.target.value)}/>
            <span></span>
            <label htmlFor="username">Username</label>
          </div>
          <div className="txt-field">
            <input type="text" name="email" id="email-input" required
            onChange={ e => setEmail(e.target.value)}/>
            <span></span>
            <label htmlFor="email-input">E-mail</label>
          </div>
          <div className="txt-field">
            <input type="password" name="password" id="password-input" required
            onChange={ e => {setPassword(e.target.value), console.log(e.target.value)}} onKeyDown={e=>buttonClick(e)}/>
            <span></span>
            <label htmlFor="password">Password</label>
          </div>
          <button className='submit' onClick={handleSubmit}>Register</button>
        </div>
    </div>
  </div>
  )
}

export default Register