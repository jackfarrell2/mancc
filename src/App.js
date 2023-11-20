import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Home from './pages/home'
import Courses from './pages/courses'
import Golfers from './pages/Golfers'
import PostMatch from './pages/postmatch'
import Vs from './pages/vs'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Footer } from './components/Footer'
import { SignInModal } from './components/SignInModal'


const theme = createTheme({
  palette: {
    primary: {
      main: '#198754',
    },
    secondary: {
      main: '#ac2054'
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    },
    fontFamily: [
      'sans-serif',
      'Roboto',
      'Helvetica',
      'Arial',
    ].join(','),
  }
});


function App() {
  const [openModal, setOpenModal] = React.useState('none')
  const handleOpen = () => setOpenModal('sign-in')
  const handleClose = () => setOpenModal('none')

  function submit(formData) {
    if (openModal === 'sign-in') {
      console.log('Signin', formData)
    } else if (openModal === 'signup') {
      console.log('Signup', formData)
    } else if (openModal === 'forgot') {
      console.log('forgot', formData)
    } else {
      throw new Error('This should not be possible.')
    }
  
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignInModal openModal={openModal} handleClose={handleClose} submit={submit} setOpenModal={setOpenModal}/>
      <Router>
        <Navbar handleOpen={handleOpen}/>
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path='/golfers' Component={Golfers} />
          <Route path='/courses' Component={Courses} />
          <Route path='/vs' Component={Vs} />
          <Route path='/postmatch' Component={PostMatch} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App;
