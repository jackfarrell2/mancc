import * as React from 'react'
import config from '../config'
import { Box, Grid, Typography, Button, Select, TextField, useMediaQuery, TableCell, InputLabel, FormControl, TableBody, TableContainer, TableHead, TableRow, Paper, Table, MenuItem } from '@mui/material'
import { page } from '../styles/classes'
import { CourseSelect } from '../components/CourseSelect'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { YardageInput } from '../components/YardageInput'
import { ParInput } from '../components/ParInput'
import { HandicapInput } from '../components/HandicapInput'
import { Link } from 'react-router-dom'

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
    const [slope, setSlope] = React.useState('')
    const [courseRating, setCourseRating] = React.useState('')
    const [submitError, setSubmitError] = React.useState('')
    const [submitOption, setSubmitOption] = React.useState('tees')
    const [newCourseName, setNewCourseName] = React.useState('')
    const [isSuccess, setIsSuccess] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        const url = `${config.apiUrl}api/new`
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
                const data = await response.json()
                const courseNames = data['course_names']
                setCourses(courseNames)
                
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

    function handleSlopeChange(event) {
        setSlope(event.target.value)
    }

    function handleCourseRatingChange(event) {
        setCourseRating(event.target.value)
    }

    function handleTeesClick() {
        setSubmitOption('tees')
    }

    function handleNewCourseClick() {
        setSubmitOption('course')
    }

    function handleNewCourseNameChange(event) {
        setNewCourseName(event.target.value)
    }

    const handleSubmitCourse = async () => {
        setLoading(true)
        setSubmitError('')
        const submitURL = `${config.apiUrl}api/new/`
        const requestData = {
            course,
            tee,
            slope,
            courseRating,
            submitOption,
            newCourseName,
            yardages: yardages,
            handicaps: handicaps,
            pars: pars,
        }
        try {
            const response = await fetch(submitURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const responseData = await response.json()
            if (responseData.error) {
                setSubmitError(`Error: ${responseData.result.Message}`)
            } else {
                setIsSuccess(true)
            }
            if (!response.ok) {
                throw new Error('Failed to submit course.')
            }
        } catch (error) {
            console.error("Error submitting course", error);
        } finally {
            setLoading(false)

        }
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
    yardageInputs.splice(9, 0, <TableCell key={'frontnineyards'} style={{border: '1px solid black'}} align="center">{frontNineYardagesSum}</TableCell>)
    yardageInputs.push(<TableCell key={'backnine'} style={{border: '1px solid black'}} align="center">{backNineYardagesSum}</TableCell>)
    yardageInputs.push(<TableCell key={'frontnine'} style={{border: '1px solid black'}} align="center">{backNineYardagesSum + frontNineYardagesSum}</TableCell>)

    // Create Handicaps
    const handicapInputs = handicaps.map((handicap, index) => (
        <TableCell key={index} style={{ border: '1px solid black' }} align="center">
            <HandicapInput handicap={handicap} index={index} handleChange={handleHandicapChange} />
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
    parInputs.splice(9, 0, <TableCell key={'frontninepars'} style={{border: '1px solid black', color: 'white' }} align='center'>{frontNineParsSum}</TableCell>)
    parInputs.push(<TableCell key={'backninepars'} style={{border: '1px solid black', color: 'white' }} align='center'>{backNineParsSum}</TableCell>)
    parInputs.push(<TableCell key={'totalpars'} style={{border: '1px solid black', color: 'white' }} align='center'>{frontNineParsSum + backNineParsSum}</TableCell>)



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
                                <Typography>Please select if you are adding an entirely new course, just a new set of tees, or you wish to edit an existing course:</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container direction='row' justifyContent="center" alignItems='center' spacing={2}>
                                    <Grid item>
                                        <Button variant='contained' color='secondary' onClick={handleTeesClick}>Just New Tees</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant='contained' color='secondary' onClick={handleNewCourseClick}>New Course</Button>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/editcourse">
                                            <Button variant='contained' color='secondary'>Edit Course</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} width="100%">
                        <Grid container direction="row" justifyContent='flex-start' alignItems='center' spacing={2}>
                            <Grid item xs={12} md={3} lg={3} width="100%">
                                {(submitOption === 'tees') && <CourseSelect sx={{width: '90%'}} course={course} courses={courses} handleChange={handleCourseChange}/>}
                                {(submitOption === 'course') && <TextField sx={{width: '90%', minWidth: '200px'}} id='course-name' label='Course Name' variant='standard' onChange={handleNewCourseNameChange} />}
                            </Grid>
                            <Grid item xs={12} md={3} lg={3} width="100%">
                                <FormControl fullWidth id="course-form">
                                    <InputLabel id="tees-select">Tees</InputLabel>
                                    <Select sx={{maxWidth: '200px'}} label='tees' value={tee} onChange={handleTeeChange}>{teeSelects}</Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} width="100%">
                        <Grid container direction="row" justifyContent='flex-start' alignItems='center' spacing={2}>
                            <Grid item>
                                <Grid container direction="row" justifyContent='flex-start' alignItems='center' spacing={1}>
                                    <Grid item md={6}>
                                        <TextField value={slope} id='slope' label='Slope' variant='filled' onChange={handleSlopeChange} />
                                    </Grid>
                                    <Grid item md={6}>
                                        <TextField value={courseRating} id='slope' label={!isMobile ? 'Course Rating (i.e. 69.6)' : 'Course Rating'} variant='filled' onChange={handleCourseRatingChange}/>
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
                        <Grid container justifyContent='center' alignItems='center' spacing={2}>
                            <Grid item>
                                <Button variant="contained" onClick={handleSubmitCourse}>Add Course</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                            {submitError && (
                                <div style={{ color: 'red' }}>
                                    {submitError}
                                </div>
                            )}
                            {isSuccess && (
                                <div style={{ color: 'green' }}>
                                    <Typography>Your new course has been submitted!</Typography>
                                </div>
                            )}
                        </Grid>
                </Grid>
            </Box>
        )
    }   
}

export default New