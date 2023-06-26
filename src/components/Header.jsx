import { IconButton } from '@mui/material'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const Header = () => {
    const navigator = useNavigate();
    const changePage = path => {
        navigator(path)
    }
        
  return (
    <header>
        <h1 onClick={() => changePage('/')}>DOINGLY</h1>

        <div className='user-interaction'>
            <NavLink to={"/register"}>
                <IconButton aria-label='register'>
                    <PersonAddIcon sx={{ fontSize: "30px", color: "#1400e1", margin:'9px' }}/> Register
                </IconButton>
            </NavLink>

            <IconButton aria-label='login' onClick={() => changePage("/login")}>
                <LoginIcon sx={{ fontSize: "30px", color: "#1400e1", margin:'9px' }}/>Login
            </IconButton>
        </div>
    </header>
  )
}

export default Header