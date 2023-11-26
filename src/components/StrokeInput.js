import { Box } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import '../styles/scores.css'

function StrokeInput({strokes, handleChange, index}) {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    function handleFormChange(event) {
        console.log("running change")
        let newStrokes = parseInt(event.target.value)
        console.log(newStrokes, index)
        handleChange(newStrokes, index)
    }
    if (strokes === 0) {
        return (
            <Box>
                {isMobile && <AddIcon fontSize='small' />}
                <input onChange={handleFormChange} type='text' className="stroke-input" pattern="[1-9]" />
                {isMobile &&  <RemoveIcon fontSize='small' />}
            </Box>
        )
    } else {
        return (
            <Box>
                {isMobile && <AddIcon fontSize='small' />}
                <input onChange={handleFormChange} type='text' className="stroke-input" value={strokes} pattern="[1-9]" />
                {isMobile &&  <RemoveIcon fontSize='small' />}
            </Box>
        )
    }
}

export { StrokeInput }