import axios from 'axios'
import React from 'react'

const baseURL = "http://119.235.112.154:3003"

export const AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout:100000,
    headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }
})//this is not used

const Main = () => {
    // console.log(AxiosInstance)
  return (
    <div style={{
      display: "flex", 
      flexWrap:'wrap', 
      justifyContent: "center", 
      // transform:'translate(0%, 39%)',
      height:'566px',
      background: "linear-gradient(120deg, #2980b9, #8e44ad)",
      }}>
        <h1 style={{
          width:'390px', textAlign:'center',
          transform:'translate(0%, 199px)', color:'#fff'
          }}>Welcome to Doingly TASK DEALER</h1>
    </div>
  )
}

export default Main