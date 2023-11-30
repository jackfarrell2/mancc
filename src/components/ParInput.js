import { Box } from '@mui/material'
import '../styles/scores.css'


function ParInput({par, handleChange, index}) {
    
    function handleFormChange(event) {
        let newPars = parseInt(event.target.value)
        handleChange(newPars, index)

    }

    return (
        <Box>
            <input value={(par === 0) ? '' : par} onChange={handleFormChange} type='text' className="yardage-input" pattern="[3-5]" />
        </Box>
    )
}

export { ParInput }