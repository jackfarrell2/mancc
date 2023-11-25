import * as React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'


function TeeSelect({tee, tees, handleChange}) {
    const teeSelects = []
    for (let i = 0; i <tees.length; i++) {
        teeSelects.push(<MenuItem key={i} value={tees[i]}>{tees[i]}</MenuItem>)
    }
    

    function handleFormChange(event) {
        handleChange(event.target.value)
    }

    return (
        <FormControl fullWidth id="tee-form">
            <InputLabel id="tee-select">Tees</InputLabel>
            <Select
                labelId="tee-select"
                id="tee"
                value={tee}
                label="Tee"
                onChange={handleFormChange}
            >
                {teeSelects}
            </Select>
            </FormControl>        
    )
}

export { TeeSelect }