import * as React from 'react'
import config from '../config'
import { Typography, Box, Grid, useMediaQuery } from "@mui/material"
import { page } from '../styles/classes'
import { StatTable } from '../components/StatTable'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { MinimizedStatTable } from '../components/MinimizedStatTable'

const URL = `${config.apiUrl}api/home`


function Home() {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [data, setData] = React.useState(null)
    const [birdies, setBirdies] = React.useState('')

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(URL)
            result.json().then(json => {
                setData(json.all_stats)
                setBirdies(json.bart_birdies)
            })
        }
        fetchData();
    }, [])

    if (!data) {
        return(
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
            <Box sx={page} justifyContent="center">
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
                    <Grid item xs={12}>
                        <Typography>Current Green Jacket Holder: <strong>Nick</strong></Typography>
                    </Grid>
                    <Grid item xs={12}>
                    {isMobile ? (
                        <MinimizedStatTable golfer_data={data} />
                    ) : (
                        <StatTable golfer_data={data} />
                    )}
                    </Grid>
                    <Grid item>
                        <Typography>Days since Bart has birdied: {birdies}</Typography>
                    </Grid>
                </Grid>
            </Box>
        );

    }

}

export default Home;