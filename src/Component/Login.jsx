import React, { useEffect, useState } from 'react'
import { Grid, TextField, Typography, Box, Button, Avatar, Paper } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useDispatch, useSelector } from 'react-redux';
import { LoginApi } from '../Redux/AuthSlice';

const Login = () => {

    const { redirectToLogin } = useSelector((s) => s.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialstate = {
        email: '',
        password: ''
    }
    const [login, setLogin] = useState(initialstate)
    const handleValue = (e) => {
        const { name, value } = e.target
        setLogin({ ...login, [name]: value })
    }

    const submit = (e) => {
        e.preventDefault()

        let data = {
            "email": login.email,
            "password": login.password
        }
        dispatch(LoginApi(data))
        
    }

    const redirectToHomePage = () => {
        const token = localStorage.getItem("token")
        const IsloagedIn = window.location.pathname.toLowerCase() === "/login"
        if (token !== null && token !== undefined && token !== "") {
            IsloagedIn && navigate("/product")
        }
    }
    useEffect(() => {
        redirectToHomePage()
    }, [redirectToLogin])
    return (
        <>
            <div class="d-flex justify-content-center w-100 vh-200 body">

                <div class="">
                    <Grid>
                        <Paper style={{ padding: "20px", height: '80vh', width: "450px", marginTop: '20px', border: "1px solid #E7F651" }}>
                            <Grid align='center'>
                                <Avatar style={{ backgroundColor: "#C8B002" }}><AppRegistrationIcon /></Avatar>
                                <h3 className='text-white pt-1 text'>Sign In</h3>
                            </Grid>
                            <Box component='form' onSubmit={submit} style={{ marginTop: '50px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label='Email' onChange={handleValue} className='text-white' style={{ width: "410px" }} name='email' value={login.email} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label='Password' type='password' onChange={handleValue} className='text-white' style={{ width: "410px" }} name='password' value={login.password} />
                                    </Grid>
                                </Grid>
                                <Link href="#" style={{ textDecoration: 'none' }}>
                                    Forgot Password
                                </Link>
                                <Typography className='mt-2'> Don't have an account? &nbsp;
                                    <Link href="#" underline="none">
                                        <Link to='/register' >Sign Up</Link>
                                    </Link>

                                </Typography>
                                <div className='mt-3'>
                                    <Button type='submit' variant='contained' style={{ backgroundColor: "#E7F651" }} fullWidth>Login</Button>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default Login