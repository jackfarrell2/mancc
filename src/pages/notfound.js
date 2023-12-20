import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import { page } from '../styles/classes'
import GreenJacket from '../util/nick_green_jacket.jpeg'


function NotFound() {

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const picWidth = isMobile ? '200px' : '400px';

    return (
        <Box sx={page}>
            <Grid container direction='column' justifyContent='flex-start' alignItems='center' spacing={4}>
                <Grid item>
                    <Typography variant='h4'>404 - No Tee Times Available</Typography>
                </Grid>
                <Grid item>
                    <img src={GreenJacket} width={picWidth} height="auto" alt="nick-green-jacket"></img>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NotFound