import * as React from 'react'
import config from '../config'
import { Grid, Box, Tabs, Tab, Pagination, useMediaQuery, } from "@mui/material"
import { page } from '../styles/classes'
import { GolferSelect } from "../components/GolferSelect"
import { CourseSelect } from "../components/CourseSelect"
import { TeeSelect } from "../components/TeeSelect"
import { LoadingSpinner } from '../components/LoadingSpinner'
import { StatTable } from '../components/StatTable'
import { Scorecard } from '../components/Scorecard'
import { Error } from '../components/Error'
import PropTypes from 'prop-types'
import { MinimizedStatTable } from '../components/MinimizedStatTable'

function Courses() {

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [golfer, setGolfer] = React.useState('Nick')
    const [course, setCourse] = React.useState('Manchester Country Club')
    const [tee, setTee] = React.useState('White')
    const [tees, setTees] = React.useState(null)
    const [golfers, setGolfers] = React.useState(null)
    const [courses, setCourses] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [tab, setTab] = React.useState(1)
    const [stats, setStats] = React.useState(null)
    const [scorecards, setScorecards] = React.useState(null)
    const [scorecard, setScorecard] = React.useState(0)
    const [avgScorecard, setAvgScorecard] = React.useState(null)
    const [error, setError] = React.useState({'error': false, 'message': 'No Error'})

    const URL = `${config.apiUrl}api/courses/${course}/${tee}/${golfer}`


    React.useEffect(() => {
        const fetchData = async () => {
            setError(false)
            setLoading(true)
            const result = await fetch(URL)
            result.json().then(json => {
                if (json.error === true) {
                    setTees(json.tees)
                    setTee(json.tees[0])
                    setError({'error': true, 'message': json.result['Message']})
                } else {
                    setGolfers(json.all_golfers)
                    setCourses(json.courses)
                    setTees(json.tees)
                    setStats(json.stats)
                    setScorecards(json.scorecards)
                    setScorecard(0)
                    setAvgScorecard(json.avg_scorecard)
                    setError({'error': false, 'message': 'No Error'})
                }
                setLoading(false)
            })
        }
        fetchData();
    }, [URL, golfer, course, tee])

    function handleGolferChange(golfer) {
        setGolfer(golfer)
    }

    function handleCourseChange(course) {
        setCourse(course)
    }

    function handleTeeChange(tee) {
        setTee(tee)
    }

    function handleTabChange(event, index) {
        setTab(index)
    }

    function a11yProps(index) {
        return {
            id: `course-tab-${index}`,
            'aria-controls': `course-tabpanel-${index}`,
        }
    }

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
            role='tabpanel'
            hidden={tab !== index}
            id={`course-tabpanel-${index}`}
            aria-labelledby={`course-tab-${index}`}
            {...other}
            >
                {value === tab && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        )
    }
    
    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    if (!golfers) {
        return (
            <Box sx={page}>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                        <LoadingSpinner />
                    </Grid>
                </Grid>
            </Box>
        )
    } else if (!error['error']) {
        if (loading) {
            return (
                <Box display="flex" justifyContent="center" direction="column" alignItems="flex-start" sx={page}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2} sx={page}>
                        <Grid item>
                            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                <Grid item>
                                    <GolferSelect golfer={golfer} golfers={golfers} handleChange={handleGolferChange} />
                                </Grid>
                                <Grid item>
                                    <CourseSelect course={course} courses={courses} handleChange={handleCourseChange} />
                                </Grid>
                                <Grid item>
                                    <TeeSelect tee={tee} tees={tees} handleChange={handleTeeChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <LoadingSpinner />
                        </Grid>
                    </Grid>
                </Box>
            )
        } else {
            return (
                <Box display="flex" justifyContent="center" direction="column" alignItems="flex-start" sx={page}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                <Grid item>
                                    <GolferSelect golfer={golfer} golfers={golfers} handleChange={handleGolferChange} />
                                </Grid>
                                <Grid item>
                                    <CourseSelect course={course} courses={courses} handleChange={handleCourseChange} />
                                </Grid>
                                <Grid item>
                                    <TeeSelect tee={tee} tees={tees} handleChange={handleTeeChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container justifyContent="center">
                                <Grid container sx={{ borderBottom: 1, borderColor: 'divider' }} justifyContent="center">
                                    <Grid item>
                                        <Tabs value={tab} onChange={handleTabChange}>
                                            {isMobile ? <Tab label="Stats" {...a11yProps(0)} /> : <Tab label="Statistics" {...a11yProps(0)} />}
                                            {isMobile ? <Tab label="Averages" {...a11yProps(1)} /> :  <Tab label="Hole Averages" {...a11yProps(1)} />}
                                            <Tab label="Rounds" {...a11yProps(2)} />
                                        </Tabs>
                                    </Grid>
                                </Grid>
                                <CustomTabPanel value={tab} index={0}>
                                    {isMobile ? <MinimizedStatTable golfer_data={stats} /> : <StatTable golfer_data={stats} />}
                                </CustomTabPanel>
                                <CustomTabPanel value={tab} index={1}>
                                    <Scorecard round={avgScorecard} golfer={golfer} avgScorecard={true} />
                                </CustomTabPanel>
                                <CustomTabPanel value={tab} index={2}>
                                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                        <Grid item>
                                            <Scorecard round={scorecards[scorecard]} golfer={golfer} />
                                        </Grid>
                                        <Grid item>
                                            <Pagination page={(scorecard + 1)} size={isMobile ? 'small' : 'medium'} count={scorecards.length} onChange={(e, value) => setScorecard(value - 1)} color='primary' />
                                        </Grid>
                                    </Grid>
                                </CustomTabPanel>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            )
        }
    } else {
        return (
            <Box display="flex" justifyContent="center" direction="column" alignItems="flex-start" sx={page}>
                <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2} sx={page}>
                    <Grid item>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item>
                                <GolferSelect golfer={golfer} golfers={golfers} handleChange={handleGolferChange} />
                            </Grid>
                            <Grid item>
                                <CourseSelect course={course} courses={courses} handleChange={handleCourseChange} />
                            </Grid>
                            <Grid item>
                                <TeeSelect tee={tee} tees={tees} handleChange={handleTeeChange} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Error error={error['message']} />
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Courses;