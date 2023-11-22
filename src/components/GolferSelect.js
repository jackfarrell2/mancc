import * as React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'


function GolferSelect({golfer, golfers, handleChange}) {
    const golferSelects = []
    for (let i = 0; i <golfers.length; i++) {
        golferSelects.push(<MenuItem key={i} value={golfers[i]}>{golfers[i]}</MenuItem>)
    }
    

    function handleFormChange(event) {
        handleChange(event.target.value)
    }

    return (
        <FormControl fullWidth id="golfer-form">
            <InputLabel id="golfer-select">Golfer</InputLabel>
            <Select
                labelId="golfer-select"
                id="golfer"
                value={golfer}
                label="Golfer"
                onChange={handleFormChange}
            >
                {golferSelects}
            </Select>
            </FormControl>        
    )
}

export {GolferSelect}