import { Box } from '@mui/material'
import '../styles/scores.css'


function HandicapInput({handicap, handleChange, index}) {
    
    function handleFormChange(event) {
        let newHandicaps = parseInt(event.target.value)
        handleChange(newHandicaps, index)

    }

    return (
        <Box>
            <input value={(handicap === 0) ? '' : handicap} onChange={handleFormChange} type='text' className="yardage-input" pattern="[1-9]|1[0-8]" />
        </Box>
    )
}

export { HandicapInput }