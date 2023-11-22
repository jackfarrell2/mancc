import * as React from 'react'
import { Grid, Typography } from '@mui/material'
import { GolferSelect } from './GolferSelect'

function CompareHeader({golfers, golfer1, golfer2, handleChange}) {

    function handleGolferOneChange(event) {
        handleChange(event.target.value, 1)
    }

    function handleGolferTwoChange(event) {
        handleChange(event.target.value, 2)
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
                <GolferSelect golfers={golfers} golfer={golfer1} handleGolferOneChange={handleGolferOneChange}></GolferSelect>
            </Grid>
            <Grid item>
                <Typography>vs</Typography>
            </Grid>
            <Grid item>
                <GolferSelect golfers={golfers} golfer={golfer2} handleGolferTwoChange={handleGolferTwoChange}></GolferSelect>
            </Grid>
        </Grid>
    )
}

export {CompareHeader}