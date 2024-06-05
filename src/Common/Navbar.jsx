import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, IconButton, Button, Typography, Box, Avatar } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { LogoutToggel } from '../Redux/AuthSlice';
import { Profile_Pic } from '../AxiosInstance/axiosInstance';


const Navbar = () => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event);
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handlelogout = () => {
        dispatch(LogoutToggel())
        navigate("/login")
    }
    
    const { isLogedIn } = useSelector((s) => s.auth)
    console.log(isLogedIn)
    const name = localStorage.getItem("name")
    console.log(name)
    const profilePic = localStorage.getItem("profile_pic")
    console.log(profilePic)


    const [names, setName] = useState()
    useEffect(() => {
        setName(name)
    },[name])

    return (
        <>
            <AppBar position='sticky' style={{ backgroundColor: "#E7F651" }}>
                <Toolbar>
                    <IconButton>
                        <EditNoteIcon size='large' color='inherit' edge='start' aria-label='logo' />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>Product</Typography>
                    {isLogedIn ?
                        (<>
                            <Box sx={{ flexGrow: 1 }}>
                                <Button color='inherit'><Link to='/' style={{ textDecoration: 'none', color: "white" }}>Home</Link></Button>
                                <Button color='inherit'><Link to='/product' style={{ textDecoration: 'none', color: "white" }}>Product</Link></Button>
                                <Button color='inherit'><Link to='/register' style={{ textDecoration: 'none', color: "white" }}>{names}</Link></Button>
                            </Box>
                            <Box >{auth && (
                                <>
                                    <Avatar
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                        src={profilePic ? Profile_Pic(profilePic): "error"}
                                    />
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem>User: {names}</MenuItem>
                                        <MenuItem onClick={() => {handleClose(); handlelogout()}}>Logout</MenuItem>
                                    </Menu>
                                </>
                            )}</Box>
                        </>)
                        :
                        (<>
                            <Box sx={{ flexGrow: 1 }}>
                                <Button color='inherit'><Link to='/' style={{ textDecoration: 'none', color: "white" }}>Home</Link></Button>
                                <Button color='inherit'><Link to='/product' style={{ textDecoration: 'none', color: "white" }}>Product</Link></Button>
                                <Button color='inherit'><Link to='/register' style={{ textDecoration: 'none', color: "white" }}>Register</Link></Button>
                                <Button color='inherit' ><Link to='/login' style={{ textDecoration: 'none', color: "white" }}>login</Link></Button>
                            </Box>
                            <Box >{auth && (
                                <>
                                    <Avatar
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    />
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem>User</MenuItem>
                                    </Menu>
                                </>
                            )}</Box>
                        </>)}

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar