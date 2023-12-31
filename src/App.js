import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Home from './pages/home'
import Courses from './pages/courses'
import Golfers from './pages/golfers'
import PostMatch from './pages/postmatch'
import New from './pages/new'
import Vs from './pages/vs'
import EditMatch from './pages/editmatch'
import NotFound from './pages/notfound'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Footer } from './components/Footer'
import { SignInModal } from './components/SignInModal'
import EditCourse from './pages/editcourse'


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


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignInModal openModal={openModal} handleClose={handleClose} setOpenModal={setOpenModal} />
      <Router>
        <Navbar handleOpen={handleOpen}/>
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path='/golfers/:golferName?' Component={Golfers} />
          <Route path='/courses' Component={Courses} />
          <Route path='/vs' Component={Vs} />
          <Route path='/postmatch' Component={PostMatch} />
          <Route path='/new' Component={New} />
          <Route path='/editmatch/:matchId' Component={EditMatch} />
          <Route path='/editcourse' Component={EditCourse} />
          <Route path='*' Component={NotFound} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App;
