import * as React from 'react'
import config from '../config'
import { Box, Grid, useMediaQuery, Pagination } from "@mui/material"
import { page } from '../styles/classes'
import { StatTable } from '../components/StatTable'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { MinimizedStatTable } from '../components/MinimizedStatTable'
import { GolferSelect } from '../components/GolferSelect'
import { Scorecard } from '../components/Scorecard'
import { Error } from '../components/Error'
import { useParams } from 'react-router-dom'

function Golfers() {
    const { golferName } = useParams()
    const defaultName = golferName || 'Nick'
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [data, setData] = React.useState(null)
    const [golfers, setGolfers] = React.useState(null)
    const [golfer, setGolfer] = React.useState(defaultName)
    const [scorecards, setScorecards] = React.useState(null)
    const [scorecard, setScorecard] = React.useState(0)
    const [error, setError] = React.useState({'error': false, 'message': 'No Error'})
    const [loading, setLoading] = React.useState(false)

    const URL = `${config.apiUrl}api/golfer/${golfer}`
    
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await fetch(URL)
            result.json().then(json => {
                if (json.error === true) {
                    setError({'error': true, 'message': json.result['Message']})
                } else {
                    setScorecards(json.scorecards)
                    setScorecard(0)
                    setData(json.stats)
                    setGolfers(json.all_golfers)
                    setError({'error': false, 'message': 'No Error'})
                }
                setLoading(false)
            })
        }
        fetchData();
    }, [URL, golfer])

    function handleChange(golfer) {
        setGolfer(golfer)
    }

    if (!data) {
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
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} width="100%">
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item>
                                    <GolferSelect golfer={golfer} golfers={golfers} handleChange={handleChange}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingSpinner />
                        </Grid>
                    </Grid>
                </Box>
            )
        } else {
            return (
            <Box display="flex" justifyContent="center" direction="column" alignItems="flex-start" sx={page}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} width="100%">
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>
                                <GolferSelect golfer={golfer} golfers={golfers} handleChange={handleChange}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    {isMobile ? (
                        <MinimizedStatTable golfer_data={data} />
                    ) : (
                        <StatTable golfer_data={data} />
                    )}
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                <Scorecard round={scorecards[scorecard]} golfer={golfer}></Scorecard>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Pagination size={isMobile ? 'small' : 'medium'} count={scorecards.length} onChange={(e, value) => setScorecard(value - 1)} color='primary' />
                    </Grid>
                </Grid>
            </Box>
        );
        }
    } else {
        return(
            <Box sx={page}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={5} width="100%">
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>
                                <GolferSelect golfer={golfer} golfers={golfers} handleChange={handleChange}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Error error={error['message']}></Error>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

Golfers.defaultProps = {
    golfer: 'Nick'
}


export default Golfers;