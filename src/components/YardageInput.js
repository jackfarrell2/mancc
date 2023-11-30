import { Box } from '@mui/material'
import '../styles/scores.css'


function YardageInput({yardage, handleChange, index}) {
    
    function handleFormChange(event) {
        let newYardages = parseInt(event.target.value)
        handleChange(newYardages, index)

    }

    return (
        <Box>
            <input value={(yardage === 0) ? '' : yardage} onChange={handleFormChange} type='text' className="yardage-input" pattern="[1-9]|[1-9][0-9]|[1-9][0-9][0-9]" />
        </Box>
    )
}

export { YardageInput }