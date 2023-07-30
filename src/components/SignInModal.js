import { Modal, Box, useMediaQuery } from '@mui/material'
import { SignInForm } from './SignInForm'
import { signInModal, mobileSignInModal } from '../styles/classes'

function SignInModal({openModal, handleClose, submit, setOpenModal}) {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    
    return (
        <Modal open={openModal !== 'none'}
            onClose={handleClose}
            aria-labelledby='modal-modal-signin'
            aria-describedby='modal-modal-signin or registration form'
        >
        <Box sx={isMobile ? (mobileSignInModal) : (signInModal)}>
            <SignInForm onSubmit={submit} handleClose={handleClose} openModal={openModal} setOpenModal={setOpenModal} />
        </Box>
        </Modal>
    )
}

export {SignInModal}