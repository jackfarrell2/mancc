import * as React from 'react'
import { birdie, par, doubleBogey, tripleOrWorse } from '../styles/colors.js'
import { TableCell } from '@mui/material'

function Score({variant, score}) {

    const colors = { 'birdie': birdie, 'par': par, 'double-bogey': doubleBogey, 'triple-or-worse': tripleOrWorse, 'sum': 'white', 'bogey': 'white'}
    const scoreColor = colors[variant]
    
    return (
        <TableCell sx={{fontFamily: 'ink free', border: '1px solid black', backgroundColor: `${scoreColor}`}} align="center">{score}</TableCell>
    )
}

export {Score}