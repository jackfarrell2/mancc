import GreenJacket from '../util/nick_green_jacket.jpeg'
import { Grid, Typography } from '@mui/material'

function Error({error}) {
    return (
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
                <Typography>{error}</Typography>
            </Grid>
            <Grid item>
                <img src={GreenJacket} width="250px" height="auto" alt="nick-green-jacket"></img>
            </Grid>
        </Grid>  
    )
}

export { Error }