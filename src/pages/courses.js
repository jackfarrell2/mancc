import * as React from 'react'
import { Grid, Box } from "@mui/material"
import { page } from '../styles/classes'
import { GolferSelect } from "../components/GolferSelect"
import { LoadingSpinner } from '../components/LoadingSpinner'

function Courses() {

    const [golfer, setGolfer] = React.useState('Nick')
    const [course, setCourse] = React.useState('Manchester Country Club')
    const [tees, setTees] = React.useState('White')
    const [golfers, setGolfers] = React.useState(null)

    const URL = `http://127.0.0.1:8000/api/courses/${course}/${tees}/${golfer}`

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(URL)
            result.json().then(json => {
                console.log(json)
            })
        }
        fetchData();
    }, [])

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
    } else {
         return (
            <Box sx={page}>
                <Grid container direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
                    <Grid item>
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item>
                                <GolferSelect golfer={golfer} golfers={golfers}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

export default Courses;