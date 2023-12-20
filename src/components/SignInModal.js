import { Modal, Box, useMediaQuery } from '@mui/material'
import { SignInForm } from './SignInForm'
import { signInModal, mobileSignInModal } from '../styles/classes'
import * as React from 'react'

function SignInModal({openModal, handleClose, setOpenModal}) {
    const [submitted, setSubmitted] = React.useState(false)
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    
    function submit(formData) {
    if (openModal === 'sign-in') {
      setSubmitted(true)
    } else if (openModal === 'signup') {
      setSubmitted(true)
    } else if (openModal === 'forgot') {
      setSubmitted(true)
    } else {
      throw new Error('This should not be possible.')
    }
  
  }
    
    function closeModal() {
        setSubmitted(false)
        handleClose()
    }

    return (
        <Modal open={openModal !== 'none'}
            onClose={closeModal}
            aria-labelledby='modal-modal-signin'
            aria-describedby='modal-modal-signin or registration form'
        >
        <Box sx={isMobile ? (mobileSignInModal) : (signInModal)}>
            <SignInForm onSubmit={submit} handleClose={handleClose} openModal={openModal} setOpenModal={setOpenModal} submitted={submitted} />
        </Box>
        </Modal>
    )
}

export {SignInModal}