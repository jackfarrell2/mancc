import * as React from 'react'
import { Grid, Typography } from '@mui/material'
import { GolferSelect } from './GolferSelect'

function CompareHeader({golfers, golfer1, golfer2, handleChange}) {

    function handleGolferOneChange(value) {
        handleChange(value, 0)
    }

    function handleGolferTwoChange(value) {
        handleChange(value, 1)
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
                <GolferSelect golfers={golfers} golfer={golfer1} handleChange={handleGolferOneChange}></GolferSelect>
            </Grid>
            <Grid item>
                <Typography>vs</Typography>
            </Grid>
            <Grid item>
                <GolferSelect golfers={golfers} golfer={golfer2} handleChange={handleGolferTwoChange}></GolferSelect>
            </Grid>
        </Grid>
    )
}

export {CompareHeader}