import { Select, MenuItem, Grid, IconButton } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

function SubmitGolferSelect({golfers, golfer, handleGolferCountChange}) {
    const golferSelects = []
    for (let i = 0; i <golfers.length; i++) {
        golferSelects.push(<MenuItem key={i} value={golfers[i]}>{golfers[i]}</MenuItem>)
    }

    function handleAdd() {
        handleGolferCountChange(1)
    }

    function handleDelete() {
        handleGolferCountChange(-1)
    }
    
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={2}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item>
                        <IconButton onClick={handleAdd} aria-label="add" color="success">
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={handleDelete} aria-label="remove" color="error">
                            <RemoveIcon fontSize="small"  />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Select defaultValue="" inputLabel="" sx={{minWidth: "180px"}}>
                    {golferSelects}
                </Select>
            </Grid>
        </Grid>
    )
}

export { SubmitGolferSelect }