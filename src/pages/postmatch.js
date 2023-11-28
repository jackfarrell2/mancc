import * as React from 'react'
import { Box, Grid, useMediaQuery, TableCell, TableContainer, Paper, Table, TableRow, TableBody, TableHead, Button, IconButton, Select, MenuItem } from "@mui/material"
import { page } from '../styles/classes'
import { CourseSelect } from '../components/CourseSelect'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { StrokeInputRow } from '../components/StrokeInputRow'
import AddIcon from '@mui/icons-material/Add'


function PostMatch() {

    const today = new Date()
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const defaultData = [[4,4,5,5,3,4,4,3,4,4,4,3,4,5,5,4,4,3],[13,11,3,9,17,1,5,15,7,12,14,18,6,10,4,2,8,16],[316,338,507,501,141,404,332,139,353,293,335,134,331,525,514,397,372,186]]
    const emptyStrokes = Array(18).fill(0)
    const defaultStrokes = Array(4).fill(emptyStrokes)

    const [loading, setLoading] = React.useState(false)
    const [course, setCourse] = React.useState('Manchester Country Club')
    const [courseData, setCourseData] = React.useState(defaultData)
    const [courses, setCourses] = React.useState(null)
    const [teeOptions, setTeeOptions] = React.useState(['White', 'Blue'])
    const [tee, setTee] = React.useState('White')
    const [date, setDate] = React.useState(today)
    const [golfers, setGolfers] = React.useState(null)
    const [selectedGolfers, setSelectedGolfers] = React.useState(['', '', '', ''])
    const [currentStrokes, setCurrentStrokes] = React.useState(defaultStrokes)
    const [golferCount, setGolferCount] = React.useState(1)
    
    const URL = `http://127.0.0.1:8000/api/coursedata/${course}/${tee}/`
    
    React.useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const result = await fetch(URL)
            result.json().then(json => {
                if (json.error) {
                    setTeeOptions(json.tee)
                    setTee(json.tee[0])
                } else {
                    setCourseData(json.course_data)
                    setCourses(json.course_names)
                    setTeeOptions(json.tee_options)
                    setGolfers(json.golfer_names)
                }
            })
            setLoading(false)
        }
        fetchData();
    }, [URL])

    function handleCourseChange(course) {
        setCourse(course)
    }

    function handleAdd(){
        setGolferCount(golferCount + 1)
    }


    function handleRemove(num) {
        const currentStrokesCopy = currentStrokes.map((row) => [...row])
        currentStrokesCopy.splice(num, 1)
        currentStrokesCopy.push(emptyStrokes)
        const selectedGolfersCopy = [...selectedGolfers]
        selectedGolfersCopy.splice(num, 1)
        selectedGolfersCopy.push('')
        setCurrentStrokes(currentStrokesCopy)
        setSelectedGolfers(selectedGolfersCopy)
        setGolferCount(golferCount - 1)


    }

    function handleStrokeChange(stroke, index, golferIndex) {
        const currentStrokesCopy = currentStrokes.map((row) => [...row])
        if (isNaN(stroke)) stroke = 0
        currentStrokesCopy[golferIndex][index] = stroke
        setCurrentStrokes(currentStrokesCopy)
    }

    function handleGolferChange(name, index) {
        const selectedGolfersCopy = [...selectedGolfers]
        selectedGolfersCopy[index] = name
        setSelectedGolfers(selectedGolfersCopy)
    }

    function handleTeeChange(event) {
        setTee(event.target.value)
    }

    function handleDateChange(newDate) {
        setDate(newDate)
    }


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
    // Create Stroke Input Rows
    const strokeInputRows = []
    for (let i = 0; i < golferCount; i++) {
        strokeInputRows.push(<StrokeInputRow key={i} handleStrokeChange={handleStrokeChange} selectedGolfers={selectedGolfers} handleGolferChange={handleGolferChange} handleChange={handleStrokeChange} golferIndex={i} handleAdd={handleAdd} handleRemove={handleRemove} strokes={currentStrokes[i]} golfers={golfers} golferCount={golferCount} />)
    }
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

    // Create Tee Selects
    const teeSelects = []
    for (let i = 0; i < teeOptions.length; i++) {
        teeSelects.push(<MenuItem key={i} value={teeOptions[i]}>{teeOptions[i]}</MenuItem>)
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
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={4}> 
                        <Grid item sx={{width: '100%'}}>
                            <Grid container display="flex" direction='row' alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item md={9}>
                                    <Grid container direction='row' alignItems="center" justifyContent="flex-start">
                                        <Grid item >
                                                <CourseSelect course={course} courses={courses} handleChange={handleCourseChange} />
                                        </Grid>
                                        <Grid item>
                                            <IconButton aria-label="add" color="success">
                                                <AddIcon fontSize="medium" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={3}>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item sx={isMobile && {pr: '45px'}}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker sx={{ '& .MuiInputLabel-root': { textAlign: 'right' } }} label="Date" onChange={handleDateChange} value={date}/>
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{width: "100%", overflow: 'auto'}}>
                            <TableContainer component={Paper} sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                                <Table aria-label='scorecard'>
                                    <TableHead>
                                        <TableRow sx={{backgroundColor: 'black'}}>
                                            {headers}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow sx={{backgroundColor: `${tee}`}}>
                                            <TableCell sx={{border: '1px solid black'}}>
                                                <Select value={tee} onChange={handleTeeChange}>{teeSelects}</Select>
                                            </TableCell>
                                            {cardYardages}
                                        </TableRow>
                                        <TableRow sx={{backgroundColor: 'grey' }}>
                                            <TableCell sx={{border: '1px solid black'}}>Handicap</TableCell>
                                            {cardHandicaps}
                                        </TableRow>
                                        {strokeInputRows}
                                        <TableRow sx={{backgroundColor: 'black'}}>
                                            <TableCell sx={{fontWeight: 'bold', color: 'white'}}>Par</TableCell>
                                            {cardPars}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item>
                            <Button variant="contained">Submit Match</Button>
                        </Grid>
                    </Grid>
                </Box>
            )
        }
    }
}

export default PostMatch;