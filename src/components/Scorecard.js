import * as React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, } from '@mui/material'



function Scorecard({round, golfer}){

    // Create Headers
    const headers = []
    for (let i = 0; i < 18; i++) {
        headers.push(<TableCell>{i+1}</TableCell>)
    }
    headers.splice(0, 0, <TableCell>Hole</TableCell>)
    headers.splice(10, 0, <TableCell>OUT</TableCell>)
    headers.push(<TableCell>IN</TableCell>)
    headers.push(<TableCell>TOT</TableCell>)

    // Create Yardages
    const cardYardages = []
    for (let i = 0; i < 18; i++) {
        cardYardages.push(<TableCell>{round['yardages'][i]}</TableCell>)
    }
    const courseYardages = round['yardages']
    const frontNineYardages = courseYardages.slice(0, 9)
    const backNineYardages = courseYardages.slice(9, 18)
    const frontNineYardagesSum = frontNineYardages.reduce((partialSum, a) => partialSum + a, 0)
    const backNineYardagesSum = backNineYardages.reduce((partialSum, a) => partialSum + a, 0)
    cardYardages.splice(10, 0, <TableCell>{frontNineYardagesSum}</TableCell>)
    cardYardages.push(<TableCell>{backNineYardagesSum}</TableCell>)
    cardYardages.push(<TableCell>{backNineYardagesSum + frontNineYardagesSum}</TableCell>)

    // Create Handicaps
    const cardHandicaps = []
    for (let i = 0; i < 18; i++) {
        cardHandicaps.push(<TableCell>{round['handicaps'][i]}</TableCell>)
    }
    cardHandicaps.splice(10, 0, <TableCell></TableCell>)
    cardHandicaps.push(<TableCell></TableCell>)
    cardHandicaps.push(<TableCell></TableCell>)

    // Create Strokes
    const cardStrokes = []
    for (let i = 0; i < 21; i++) {
        cardStrokes.push(<TableCell>{round['strokes'][i]}</TableCell>)
    }

    // Create toPars
    const toPars = []
    for (let i = 0; i < 21; i++) {
        toPars.push(<TableCell>{round['to_pars'][i]}</TableCell>)
    }

    // Create Pars
    const cardPars = []
    for (let i = 0; i < 18; i++) {
        cardPars.push(<TableCell>{round['pars'][i]}</TableCell>)
    }
    const coursePars = round['pars']
    const frontNinePars = coursePars.slice(0, 9)
    const backNinePars = coursePars.slice(9, 18)
    const frontNineParsSum = frontNinePars.reduce((partialSum, a) => partialSum + a, 0)
    const backNineParsSum = backNinePars.reduce((partialSum, a) => partialSum + a, 0)
    cardPars.splice(10, 0, <TableCell>{frontNineParsSum}</TableCell>)
    cardPars.push(<TableCell>{backNineParsSum}</TableCell>)
    cardPars.push(<TableCell>{backNineParsSum + frontNineParsSum}</TableCell>)

    return (
        <div>
            <Typography>{round['course_name']}</Typography>
            <Typography>{round['date']}</Typography>
            <TableContainer component={Paper}>
                <Table aria-label='scorecard'>
                    <TableHead>
                        <TableRow>
                            {headers}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{round['tees']}</TableCell>
                            {cardYardages}
                        </TableRow>
                        <TableRow>
                            <TableCell>Handicap</TableCell>
                            {cardHandicaps}
                        </TableRow>
                        <TableRow>
                            <TableCell>{golfer}</TableCell>
                            {cardStrokes}
                        </TableRow>
                        <TableRow>
                            <TableCell>+/-</TableCell>
                            {toPars}
                        </TableRow>
                        <TableRow>
                            <TableCell>Pars</TableCell>
                            {cardPars}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export {Scorecard}