import * as React from 'react'
import { Box, Card, Grid, useMediaQuery, TableCell, Container, TableContainer, Paper, Table, TableRow, TableBody, TableHead, FormControl, InputLabel, Select } from "@mui/material"
import { page } from '../styles/classes'
import { CourseSelect } from '../components/CourseSelect'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { SubmitGolferSelect } from '../components/SubmitGolferSelect'
import { StrokeInput } from '../components/StrokeInput'
import { StrokeInputRow } from '../components/StrokeInputRow'

function PostMatch() {

    const today = new Date()
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const defaultData = [[4,4,5,5,3,4,4,3,4,4,4,3,4,5,5,4,4,3],[13,11,3,9,17,1,5,15,7,12,14,18,6,10,4,2,8,16],[316,338,507,501,141,404,332,139,353,293,335,134,331,525,514,397,372,186]]

    const [loading, setLoading] = React.useState(false)
    const [course, setCourse] = React.useState('Manchester Country Club')
    const [courseData, setCourseData] = React.useState(defaultData)
    const [tee, setTee] = React.useState('White')
    const [courses, setCourses] = React.useState(null)
    const [teeOptions, setTeeOptions] = React.useState(['White', 'Blue'])
    const [date, setDate] = React.useState(today)
    const [golfers, setGolfers] = React.useState(null)
    const [currentStrokes, setCurrentStrokes] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    
    const URL = `http://127.0.0.1:8000/api/coursedata/${course}/${tee}/`
    
    React.useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const result = await fetch(URL)
            result.json().then(json => {
                console.log(json.course_data)
                setCourseData(json.course_data)
                setCourses(json.course_names)
                setTeeOptions(json.tee_options)
                setGolfers(json.golfer_names)
            })
        }
        fetchData();
        setLoading(false)
    }, [URL])


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
        cardYardages.push(<TableCell key={i} sx={{border: '1px solid black'}} align="center">{courseData[2][i]}</TableCell>)
    }
    const courseYardages = courseData[2]
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
        cardHandicaps.push(<TableCell key={i} sx={{border: '1px solid black'}} align="center">{courseData[1][i]}</TableCell>)
    }
    cardHandicaps.splice(9, 0, <TableCell key={'blank3'} sx={{border: '1px solid black'}} align="center"></TableCell>)
    cardHandicaps.push(<TableCell key={'blank'} sx={{border: '1px solid black'}} align="center"></TableCell>)
    cardHandicaps.push(<TableCell key={'blank2'} sx={{border: '1px solid black'}} align="center"></TableCell>)
    // Create Strokes
    // const strokeInputs = []
    // for (let i = 0; i < 18; i++) {
    //     strokeInputs.push(<TableCell key={i} sx={{border: '1px solid black'}} align="center" size="small"><StrokeInput /></TableCell>)
    // }
    // strokeInputs.splice(9, 0, <TableCell key={'blank3'} sx={{border: '1px solid black'}} align="center"></TableCell>)
    // strokeInputs.push(<TableCell key={'blank'} sx={{border: '1px solid black'}} align="center"></TableCell>)
    // strokeInputs.push(<TableCell key={'blank2'} sx={{border: '1px solid black'}} align="center"></TableCell>)
    // Create Pars
    const cardPars = []
    for (let i = 0; i < 18; i++) {
        cardPars.push(<TableCell size="small" key={i} sx={{fontWeight: 'bold', color: 'white'}} align="center">{courseData[0][i]}</TableCell>)
    }
    const coursePars = courseData[0]
    const frontNinePars = coursePars.slice(0, 9)
    const backNinePars = coursePars.slice(9, 18)
    const frontNineParsSum = frontNinePars.reduce((partialSum, a) => partialSum + a, 0)
    const backNineParsSum = backNinePars.reduce((partialSum, a) => partialSum + a, 0)
    cardPars.splice(9, 0, <TableCell key={'frontnine'} sx={{fontWeight: 'bold', color: 'white'}} align="center">{frontNineParsSum}</TableCell>)
    cardPars.push(<TableCell key={'backnine'} sx={{fontWeight: 'bold', color: 'white'}} align="center">{backNineParsSum}</TableCell>)
    cardPars.push(<TableCell key={'total'} sx={{fontWeight: 'bold', color: 'white'}} align="center">{backNineParsSum + frontNineParsSum}</TableCell>)

    function handleCourseChange(course) {
        setCourse(course)
    }


    function handleStrokeChange(stroke, index) {
    setCurrentStrokes(prevStrokes => {
        const currentStrokesBuffer = [...prevStrokes];
        console.log(`stroke is ${stroke}`)
        if (isNaN(stroke)) stroke = 0;
        currentStrokesBuffer[index] = stroke;
        console.log(`changing strokes state to ${currentStrokesBuffer}`);
        return currentStrokesBuffer;
    });
}


    if (!courses) {
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
            <Box display="flex" justifyContent="center" direction="column" alignItems="flex-start" sx={page}>
                <Card variant="outlined" sx={{width: '100%'}}>
                    <Grid container display="flex" direction='row' alignItems="center" justifyContent="center" sx={{marginTop: '10px', marginBottom: '10px'}} spacing={2}>
                        <Grid item md={9}>
                            <Grid container direction='row' alignItems="center" justifyContent="flex-start">
                                <Grid item sx={!isMobile && {marginLeft: '10px'}} >
                                     <CourseSelect course={course} courses={courses} handleChange={handleCourseChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3}>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker label="Date" defaultValue={date} sx={!isMobile && {marginRight: '10px'}} />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                     <Container maxWidth='xl' disableGutters={isMobile ? true : false} sx={{overflow: 'auto'}}>
                        <TableContainer component={Paper} sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                            <Table aria-label='scorecard'>
                                <TableHead>
                                    <TableRow sx={{backgroundColor: 'black'}}>
                                        {headers}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{border: '1px solid black'}}>Select Tees</TableCell>
                                        {cardYardages}
                                    </TableRow>
                                    <TableRow sx={{backgroundColor: 'grey' }}>
                                        <TableCell sx={{border: '1px solid black'}}>Handicap</TableCell>
                                        {cardHandicaps}
                                    </TableRow>
                                    <StrokeInputRow handleChange={handleStrokeChange} strokes={currentStrokes} golfers={golfers} />
                                    <TableRow sx={{backgroundColor: 'black'}}>
                                        <TableCell sx={{fontWeight: 'bold', color: 'white'}}>Par</TableCell>
                                        {cardPars}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                </Card>
            </Box>
        )
    }
}

export default PostMatch;