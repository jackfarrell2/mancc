import * as React from 'react'
import { Box, Grid, Typography, Button, Select, TextField, useMediaQuery, TableCell, InputLabel, FormControl, TableBody, TableContainer, TableHead, TableRow, Paper, Table, MenuItem } from '@mui/material'
import { page } from '../styles/classes'
import { CourseSelect } from '../components/CourseSelect'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { YardageInput } from '../components/YardageInput'
import { ParInput } from '../components/ParInput'

function New() {

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [loading, setLoading] = React.useState(false)
    const [courses, setCourses] = React.useState([])
    const [course, setCourse] = React.useState('')
    const [tee, setTee] = React.useState('')
    const teeOptions = ['White', 'Blue', 'Red']
    const [yardages, setYardages] = React.useState(Array(18).fill(0))
    const [handicaps, setHandicaps] = React.useState(Array(18).fill(0))
    const [pars, setPars] = React.useState(Array(18).fill(0))



    React.useEffect(() => {
        setLoading(true)
        const url = 'http://127.0.0.1:8000/api/new'
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch course names.')
                }
                // Update Courses
                const data = await response.json()
                const courseNames = data['course_names']
                setCourses(courseNames)
                // setCourse(prevCourses => prevCourses ? prevCourses[0]: null)
                
            } catch (error) {
                console.error("Error fetching course names", error)
            }
            setLoading(false)
        };
        fetchData();

    }, []);

    function handleCourseChange(courseName) {
        setCourse(courseName)
    }

    function handleTeeChange(event) {
        setTee(event.target.value)
    }

    function handleYardageChange(yardage, index) {
        const yardageBuffer = [...yardages]
        if (isNaN(yardage)) yardage = 0
        yardageBuffer[index] = yardage
        setYardages(yardageBuffer)
    }

    function handleHandicapChange(handicap, index) {
        const handicapBuffer = [...handicaps]
        if (isNaN(handicap)) handicap = 0
        handicapBuffer[index] = handicap
        setHandicaps(handicapBuffer)
    }

    function handleParChange(par, index) {
        const parBuffer = [...pars]
        if (isNaN(par)) par = 0
        parBuffer[index] = par
        setPars(parBuffer)
    }

    // Create Tee Selects
    const teeSelects = []
    for (let i = 0; i < teeOptions.length; i++) {
        teeSelects.push(<MenuItem key={i} value={teeOptions[i]}>{teeOptions[i]}</MenuItem>)
    }

    // Create Headers
    const headers = []
    for (let i = 0; i < 18; i++) {
        headers.push(<TableCell key={i} style={{fontWeight: 'bold', color: 'white'}} align="center">{i+1}</TableCell>)
    }
    headers.splice(0, 0, <TableCell key={'hole'} style={{fontWeight: 'bold', color: 'white'}}>Hole</TableCell>)
    headers.splice(10, 0, <TableCell key={'out'} style={{fontWeight: 'bold', color: 'white'}} align="center">OUT</TableCell>)
    headers.push(<TableCell key={'IN'} style={{fontWeight: 'bold', color: 'white'}} align="center">IN</TableCell>)
    headers.push(<TableCell key={'TOT'} style={{fontWeight: 'bold', color: 'white'}} align="center">TOT</TableCell>)

    // Create Yardages
    const yardageInputs = yardages.map((yardage, index) => (
        <TableCell key={index} style={{ border: '1px solid black' }} align="center">
            <YardageInput yardage={yardage} index={index} handleChange={handleYardageChange} />
        </TableCell>
    ));

    const frontNineYardages = yardages.slice(0, 9)
    const backNineYardages = yardages.slice(9, 18)
    const frontNineYardagesSum = frontNineYardages.reduce((partialSum, a) => partialSum + a, 0)
    const backNineYardagesSum = backNineYardages.reduce((partialSum, a) => partialSum + a, 0)
    yardageInputs.splice(10, 0, <TableCell key={'frontnineyards'} style={{border: '1px solid black'}} align="center">{frontNineYardagesSum}</TableCell>)
    yardageInputs.push(<TableCell key={'backnine'} style={{border: '1px solid black'}} align="center">{backNineYardagesSum}</TableCell>)
    yardageInputs.push(<TableCell key={'frontnine'} style={{border: '1px solid black'}} align="center">{backNineYardagesSum + frontNineYardagesSum}</TableCell>)

    // Create Handicaps
    const handicapInputs = handicaps.map((handicap, index) => (
        <TableCell key={index} style={{ border: '1px solid black' }} align="center">
            <YardageInput handicap={handicap} index={index} handleChange={handleHandicapChange} />
        </TableCell>
    ));
    handicapInputs.splice(9, 0, <TableCell key={'blank3'} style={{border: '1px solid black'}} align="center"></TableCell>)
    handicapInputs.push(<TableCell key={'blank'} style={{border: '1px solid black'}} align="center"></TableCell>)
    handicapInputs.push(<TableCell key={'blank2'} style={{border: '1px solid black'}} align="center"></TableCell>)

    // Create Pars
    const parInputs = pars.map((par, index) => (
        <TableCell key={index} style={{ border: '1px solid black' }} align='center'>
            <ParInput par={par} index={index} handleChange={handleParChange} />
        </TableCell>
    ));

    const frontNinePars = pars.slice(0, 9)
    const backNinePars = pars.slice(9, 18)
    const frontNineParsSum = frontNinePars.reduce((partialSum, a) => partialSum + a, 0)
    const backNineParsSum = backNinePars.reduce((partialSum, a) => partialSum + a, 0)
    parInputs.splice(10, 0, <TableCell key={'frontninepars'} style={{border: '1px solid black', color: 'white' }} align='center'>{frontNineParsSum}</TableCell>)
    parInputs.push(<TableCell key={'frontninepars'} style={{border: '1px solid black', color: 'white' }} align='center'>{backNineParsSum}</TableCell>)
    parInputs.push(<TableCell key={'frontninepars'} style={{border: '1px solid black', color: 'white' }} align='center'>{frontNineParsSum + backNineParsSum}</TableCell>)



    if (loading) {
        return (
            <Box sx={page}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                        <LoadingSpinner />
                    </Grid>
                </Grid>
            </Box>
        )
    } else {
        return (
            <Box sx={page}>
                <Grid container direction='column' justifyContent='flex-start' alignItems='center' spacing={4}>
                    <Grid item xs={12} width="100%">
                        <Grid container direction='column' justifyContent='flex-start' alignItems='center' spacing={2}>
                            <Grid item>
                                <Typography>Please select if you are adding an entirely new course or just a new set of tees:</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container direction='row' justifyContent="center" alignItems='center' spacing={2}>
                                    <Grid item>
                                        <Button variant='contained' color='secondary'>Just New Tees</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant='contained' color='secondary'>New Course</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} width="100%">
                        <Grid container direction="row" justifyContent='flex-start' alignItems='center' spacing={2}>
                            <Grid item xs={3}>
                                <CourseSelect course={course} courses={courses} handleChange={handleCourseChange}/>
                            </Grid>
                            <Grid item xs={3} md={1}>
                                <FormControl fullWidth id="course-form">
                                    <InputLabel id="tees-select">Tees</InputLabel>
                                    <Select label='tees' value={tee} onChange={handleTeeChange}>{teeSelects}</Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} width="100%">
                        <Grid container direction="row" justifyContent='flex-start' alignItems='center' spacing={2}>
                            <Grid item>
                                <Grid container direction="row" justifyContent='flex-start' alignItems='center' spacing={1}>
                                    <Grid item xs={3}>
                                        <TextField id='slope' label='Slope' variant='filled' />
                                    </Grid>
                                    <Grid item xs={3} md={6}>
                                        <TextField id='slope' label={!isMobile ? 'Course Rating (i.e. 69.6)' : 'Course Rating'} variant='filled' />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} width="100%" sx={{overflow: 'auto'}}>
                            <TableContainer component={Paper} sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                                <Table aria-label='scorecard'>
                                    <TableHead>
                                        <TableRow style={{backgroundColor: 'black'}}>
                                            {headers}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow style={{backgroundColor: `${tee}`}}>
                                            <TableCell style={{border: '1px solid black'}}>Yardages</TableCell>
                                            {yardageInputs}
                                        </TableRow>
                                        <TableRow style={{backgroundColor: 'grey' }}>
                                            <TableCell style={{border: '1px solid black'}}>Handicaps</TableCell>
                                            {handicapInputs}
                                        </TableRow>
                                        <TableRow style={{backgroundColor: 'black'}}>
                                            <TableCell style={{ border: '1px solid black', color: 'white' }}>Pars</TableCell>
                                            {parInputs}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </Grid>
                    <Grid item xs={12} width="100%">
                        <Grid container justifyContent='center' alignItems='center'>
                            <Grid item>
                                <Button variant="contained">Add Course</Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        )
    }   
}

export default New