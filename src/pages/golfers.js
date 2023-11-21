import * as React from 'react'
import { Box, Grid, useMediaQuery, Pagination } from "@mui/material"
import { page } from '../styles/classes'
import { StatTable } from '../components/StatTable'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { MinimizedStatTable } from '../components/MinimizedStatTable'
import { GolferSelect } from '../components/GolferSelect'
import { Scorecard } from '../components/Scorecard'

function Golfers() {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [data, setData] = React.useState(null)
    const [golfers, setGolfers] = React.useState(null)
    const [golfer, setGolfer] = React.useState('Nick')
    const [scorecards, setScorecards] = React.useState(null)
    const [scorecard, setScorecard] = React.useState(0)

     const URL = `http://127.0.0.1:8000/api/golfer/${golfer}`
    
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(URL)
            result.json().then(json => {
                setScorecards(json.scorecards)
                setScorecard(0)
                setData(json.stats)
                setGolfers(json.all_golfers)
            })
        }
        fetchData();
    }, [URL, golfer])

    function handleChange(golfer) {
        setGolfer(golfer)
    }

    function handleScorecardChange(num) {
        setScorecard(num)
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
    } else {
        return (
            <Box display="flex" justifyContent="center" direction="column" alignItems="flex-start" sx={page}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={5} width="100%">
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
                                <Scorecard round={scorecards[scorecard]} golfer={golfer} handleScorecardChange={handleScorecardChange}></Scorecard>
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
}

Golfers.defaultProps = {
    golfer: 'Nick'
}


export default Golfers;