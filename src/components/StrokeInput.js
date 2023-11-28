import { Box } from '@mui/material'
import { useMediaQuery, IconButton } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import '../styles/scores.css'

function StrokeInput({strokes, handleChange, index, golferIndex}) {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    
    function handleFormChange(event) {
        let newStrokes = parseInt(event.target.value)
        handleChange(newStrokes, index, golferIndex)

    }

    function handleAddClick(){
        const newStrokes = strokes + 1
        handleChange(newStrokes, index, golferIndex)
    }

    function handleSubtractClick() {
        const newStrokes = strokes - 1
        handleChange(newStrokes, index, golferIndex)
    }

    return (
        <Box>
            {isMobile && <IconButton onClick={handleAddClick} color="success"><AddIcon fontSize='small' /></IconButton>}
            <input value={(strokes === 0) ? '' : strokes} onChange={handleFormChange} type='text' className="stroke-input" pattern="[1-9]" />
            {isMobile &&  <IconButton onClick={handleSubtractClick} color="error"><RemoveIcon fontSize='small' /></IconButton>}
        </Box>
    )
}

export { StrokeInput }