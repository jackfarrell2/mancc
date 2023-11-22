import * as React from 'react'
import { Grid, Box, useMediaQuery, Pagination } from "@mui/material"
import { page } from '../styles/classes'
import { CompareHeader } from '../components/CompareHeader'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { StatTable } from '../components/StatTable'
import { MinimizedStatTable } from '../components/MinimizedStatTable'
import { Scorecard } from '../components/Scorecard'
import { Error } from '../components/Error'

function Vs() {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [golfers, setGolfers] = React.useState(['Quincy', 'Bart'])
    const [golfersList, setGolfersList] = React.useState(null)
    const [record, setRecord] = React.useState(null)
    const [stats, setStats] = React.useState(null)
    const [scorecards, setScorecards] = React.useState(null)
    const [scorecard, setScorecard] = React.useState(0)
    const [error, setError] = React.useState({'error': false, 'message': 'No Error'})
    const [loading, setLoading] = React.useState(false)

    const URL = `http://127.0.0.1:8000/api/vs/${golfers[0]}/${golfers[1]}`

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await fetch(URL)
            result.json().then(json => {
                if (json.error === true) {
                    setError({'error': true, 'message': json.result['Message']})
                } else {
                    setGolfersList(json.all_golfers)
                    setGolfers([json.stats_one['Golfer'], json.stats_two['Golfer']])
                    setRecord(json.record)
                    setStats([json.stats_one, json.stats_two])
                    setScorecards(json.scorecards)
                    setError({'error': false, 'message': 'No Error'})
                }
                setLoading(false)
            })
        }
        fetchData();
    }, [URL])

    function handleChange(golfer, index) {
        let currentGolfers = [golfers[0], golfers[1]]
        currentGolfers[index] = golfer
        setGolfers(currentGolfers)
    }

    if (!golfersList) {
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
                <Box sx={page}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                        <Grid item>
                            <CompareHeader golfers={golfersList} golfer1={golfers[0]} golfer2={golfers[1]} handleChange={handleChange}></CompareHeader>
                        </Grid>
                        <Grid item>
                            <LoadingSpinner />
                        </Grid>
                    </Grid>
                </Box>
            )
        } else {
            return (
                <Box sx={page}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
                        <Grid item>
                            <CompareHeader golfers={golfersList} golfer1={golfers[0]} golfer2={golfers[1]} handleChange={handleChange}></CompareHeader>
                        </Grid>
                        <Grid item><strong>{record}</strong></Grid>
                        <Grid item>
                            {isMobile ? <MinimizedStatTable golfer_data={stats} /> : <StatTable golfer_data={stats} />}
                        </Grid>
                        <Grid item>
                            <Scorecard variant="double" round={scorecards[scorecard]} golfer={golfers[0]} golferTwo={golfers[1]}></Scorecard>
                        </Grid>
                        <Grid item xs={12}>
                            <Pagination size={isMobile ? 'small' : 'medium'} count={scorecards.length} onChange={(e, value) => setScorecard(value - 1)} color='primary' />
                        </Grid>
                    </Grid>
                </Box>
        )
        }
    } else {
        return (
            <Box sx={page}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item>
                        <CompareHeader golfers={golfersList} golfer1={golfers[0]} golfer2={golfers[1]} handleChange={handleChange}></CompareHeader>
                    </Grid>
                    <Grid item>
                        {error['error'] && <Error error={error['message']}></Error>}
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Vs;