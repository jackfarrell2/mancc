import { Select, MenuItem, Grid, IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

function SubmitGolferSelect({golfers, golferIndex, handleAdd, handleRemove, handleChange, selectedGolfers, golferCount}) {
    const golferSelects = []
    for (let i = 0; i <golfers.length; i++) {
        golferSelects.push(<MenuItem key={i} value={golfers[i]}>{golfers[i]}</MenuItem>)
    }

    function handleRemoveGolfer() {
        handleRemove(golferIndex)
    }
    
    function handleGolferChange(event) {
        handleChange(event.target.value, golferIndex)
    }

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={2}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={0}>
                    <Grid item>
                        <IconButton disabled={golferCount > 3} onClick={handleAdd} aria-label="add" color="success">
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton disabled={golferCount <= 1} onClick={handleRemoveGolfer} aria-label="remove" color="error">
                            <RemoveIcon  fontSize="small"  />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Select onChange={handleGolferChange} value={selectedGolfers[golferIndex]} sx={{minWidth: "180px"}}>
                    {golferSelects}
                </Select>
            </Grid>
        </Grid>
    )
}

export { SubmitGolferSelect }