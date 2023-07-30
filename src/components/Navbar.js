import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery } from '@mui/material'
import { logo, navLinks, buttonLink, topBar, logoLink, } from '../styles/classes'
import React from 'react'
import { Link } from 'react-router-dom'
import { MenuDrawer } from './MenuDrawer'

function Navbar({handleOpen}) {  
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <AppBar position='static'>
            <Toolbar sx={topBar}>
                <Box sx={logo}>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        {isMobile ? (
                            <Typography sx={logoLink} variant='h5'>Manchester GC</Typography>
                        ) : (
                            <Typography sx={logoLink} variant='h5'>Manchester Golf Club</Typography>
                        )}
                    </Link>
                </Box>
            {isMobile ? (
                <MenuDrawer handleOpen={handleOpen}></MenuDrawer>
            ) : (
                <Box sx={navLinks}>
                    <Link to='/golfers'>
                        <Button sx={buttonLink}>Golfers</Button>
                    </Link>
                    <Link to='/courses'>
                        <Button sx={buttonLink}>Courses</Button>
                    </Link>
                    <Link to='/vs'>
                        <Button sx={buttonLink}>Vs</Button>
                    </Link>
                    <Link to='/postmatch'>
                        <Button sx={buttonLink}>Post a Match</Button>
                    </Link>
                    <Button onClick={handleOpen} sx={buttonLink}>Sign In</Button>
                </Box>
            )}
            </Toolbar>
        </AppBar>
        
    )
}

export {Navbar}
