import React, { useState } from 'react'
import { Drawer, List, ListItem, ListItemText, Divider, IconButton, } from '@mui/material'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { drawerItem } from '../styles/classes'


function MenuDrawer({handleOpen}) {
    const [openDrawer, setOpenDrawer] = useState(false)
    function openLoginForm() {
        handleOpen();
        setOpenDrawer(false)
    }
    return (
        <>
            <Drawer open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to='/' style={drawerItem}>Home</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to='/golfers' style={drawerItem}>Golfers</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to='/courses' style={drawerItem}>Courses</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to='/vs' style={drawerItem}>Vs</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to='/golfers' style={drawerItem}>Golfers</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to='/postmatch' style={drawerItem}>Post a Match</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem onClick={openLoginForm}>
                        <ListItemText>
                            <Link to='/' style={drawerItem}>Log In</Link>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                </List>
            </Drawer>
            <IconButton sx={{ color: 'white' }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}

export {MenuDrawer}