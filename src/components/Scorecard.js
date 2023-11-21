import * as React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Card, Grid, useMediaQuery, Container, Button } from '@mui/material'
import '../styles/golfer.css'
import { Score } from './Score'



function Scorecard({round, golfer}){
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const courseName = round['course_name']
    const abbrev = courseName.match(/\b([A-Z])/g).join('');
    // Create Headers
    const headers = []
    for (let i = 0; i < 18; i++) {
        headers.push(<TableCell key={i} sx={{fontWeight: 'bold', color: 'white'}} align="center">{i+1}</TableCell>)
    }
    headers.splice(0, 0, <TableCell key={'hole'} sx={{fontWeight: 'bold', color: 'white'}}>Hole</TableCell>)
    headers.splice(10, 0, <TableCell key={'out'} sx={{fontWeight: 'bold', color: 'white'}} align="center">OUT</TableCell>)
    headers.push(<TableCell key={'IN'} sx={{fontWeight: 'bold', color: 'white'}} align="center">IN</TableCell>)
    headers.push(<TableCell key={'TOT'} sx={{fontWeight: 'bold', color: 'white'}} align="center">TOT</TableCell>)

    // Create Yardages
    const cardYardages = []
    for (let i = 0; i < 18; i++) {
        cardYardages.push(<TableCell key={i} sx={{border: '1px solid black'}} align="center">{round['yardages'][i]}</TableCell>)
    }
    const courseYardages = round['yardages']
    const frontNineYardages = courseYardages.slice(0, 9)
    const backNineYardages = courseYardages.slice(9, 18)
    const frontNineYardagesSum = frontNineYardages.reduce((partialSum, a) => partialSum + a, 0)
    const backNineYardagesSum = backNineYardages.reduce((partialSum, a) => partialSum + a, 0)
    cardYardages.splice(10, 0, <TableCell key={'frontnineyards'} sx={{border: '1px solid black'}} align="center">{frontNineYardagesSum}</TableCell>)
    cardYardages.push(<TableCell key={'backnine'} sx={{border: '1px solid black'}} align="center">{backNineYardagesSum}</TableCell>)
    cardYardages.push(<TableCell key={'frontnine'} sx={{border: '1px solid black'}} align="center">{backNineYardagesSum + frontNineYardagesSum}</TableCell>)

    // Create Handicaps
    const cardHandicaps = []
    for (let i = 0; i < 18; i++) {
        cardHandicaps.push(<TableCell key={i} sx={{border: '1px solid black'}} align="center">{round['handicaps'][i]}</TableCell>)
    }
    cardHandicaps.splice(9, 0, <TableCell key={'blank3'} sx={{border: '1px solid black'}} align="center"></TableCell>)
    cardHandicaps.push(<TableCell key={'blank'} sx={{border: '1px solid black'}} align="center"></TableCell>)
    cardHandicaps.push(<TableCell key={'blank2'} sx={{border: '1px solid black'}} align="center"></TableCell>)


    // Create Strokes
    const frontNineStrokes = round['strokes'].slice(0, 9)
    const backNineStrokes = round['strokes'].slice(10, 19)
    const cleanStrokes = frontNineStrokes.concat(backNineStrokes)
    const cardStrokes = []
    for (let i = 0; i < 18; i++) {
        const difference = (cleanStrokes[i] - round['pars'][i])
        let variant = 'bogey'
        if (difference <= -1) {
            variant = 'birdie'
        } else if (difference === 0) {
            variant = 'par'
        } else if (difference === 2) {
            variant = 'double-bogey'
        } else if (difference >= 3) {
            variant = 'triple-or-worse'
        } else {
            variant = 'bogey'
        }
        cardStrokes.push(<Score key={i} variant={variant} score={cleanStrokes[i]}></Score>)
    }

    cardStrokes.splice(9, 0, <Score key={'front-sum'} variant="sum" score={round['strokes'][9]}></Score>)
    cardStrokes.push(<Score key={'back-sum'} variant="sum" score={round['strokes'][19]}></Score>)
    cardStrokes.push(<Score key={'tot-sum'} variant="sum" score={round['strokes'][20]}></Score>)

    // Create toPars
    const toPars = []
    for (let i = 0; i < 21; i++) {
        toPars.push(<TableCell key={i} sx={{fontFamily: "ink free", border: '1px solid black'}} align="center">{round['to_pars'][i]}</TableCell>)
    }

    // Create Pars
    const cardPars = []
    for (let i = 0; i < 18; i++) {
        cardPars.push(<TableCell size="small" key={i} sx={{fontWeight: 'bold', color: 'white'}} align="center">{round['pars'][i]}</TableCell>)
    }
    const coursePars = round['pars']
    const frontNinePars = coursePars.slice(0, 9)
    const backNinePars = coursePars.slice(9, 18)
    const frontNineParsSum = frontNinePars.reduce((partialSum, a) => partialSum + a, 0)
    const backNineParsSum = backNinePars.reduce((partialSum, a) => partialSum + a, 0)
    cardPars.splice(9, 0, <TableCell key={'frontnine'} sx={{fontWeight: 'bold', color: 'white'}} align="center">{frontNineParsSum}</TableCell>)
    cardPars.push(<TableCell key={'backnine'} sx={{fontWeight: 'bold', color: 'white'}} align="center">{backNineParsSum}</TableCell>)
    cardPars.push(<TableCell key={'total'} sx={{fontWeight: 'bold', color: 'white'}} align="center">{backNineParsSum + frontNineParsSum}</TableCell>)

    // Format Date
    let date = new Date(`${round['date']}T00:00`);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`

    return (
        <Card variant="outlined" sx={{width: isMobile ? '100%' : '100%'}}>
            <Grid container sx={{marginTop: '10px', marginBottom: '10px'}}>
                <Grid item xs={6}><Typography sx={{marginLeft: '10px'}}>{isMobile ? abbrev : courseName}</Typography></Grid>
                <Grid item xs={6}>
                    <Grid container justifyContent="flex-end">
                        <Typography sx={{marginRight: '10px'}}>{formattedDate}</Typography>  
                    </Grid>
                </Grid>
            </Grid>
            <Container maxWidth='xl' disableGutters={isMobile ? 'true' : 'false'} sx={{overflow: 'auto'}}>
                <TableContainer component={Paper} sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                    <Table aria-label='scorecard'>
                        <TableHead>
                            <TableRow sx={{backgroundColor: 'black'}}>
                                {headers}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{border: '1px solid black'}}>{round['tees']}</TableCell>
                                {cardYardages}
                            </TableRow>
                            <TableRow sx={{backgroundColor: 'grey' }}>
                                <TableCell sx={{border: '1px solid black'}}>Handicap</TableCell>
                                {cardHandicaps}
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{fontFamily: "ink free", border: '1px solid black'}}>{golfer}</TableCell>
                                {cardStrokes}
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{border: '1px solid black'}}>+/-</TableCell>
                                {toPars}
                            </TableRow>
                            <TableRow sx={{backgroundColor: 'black'}}>
                                <TableCell sx={{fontWeight: 'bold', color: 'white'}}>Par</TableCell>
                                {cardPars}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Grid container alignItems="center">
                <Grid item xs={8}>
                    <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1} padding={1}>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                <Grid item><div className="indicator-box birdie-box"></div></Grid>
                                <Grid item><Typography variant='caption'>{isMobile ? 'Birdie' : 'Birdie or Better'}</Typography></Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                <Grid item><div className="indicator-box par-box"></div></Grid>
                                <Grid item><Typography variant='caption'>Par</Typography></Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                <Grid item><div className="indicator-box double-bogey-box"></div></Grid>
                                <Grid item><Typography variant='caption'>{isMobile ? 'Double' : 'Double Bogey'}</Typography></Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                <Grid item><div className="indicator-box triple-or-worse-box"></div></Grid>
                                <Grid item><Typography variant='caption'>{isMobile ? 'Triple' : 'Triple Bogey or Worse'}</Typography></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid container justifyContent="flex-end" alignItems="center">
                        <Grid item>
                            <Button sx={{marginRight: '8px'}} size="small" color="error" variant="contained">{isMobile ? 'Edit' : 'Edit Round'}</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export {Scorecard}