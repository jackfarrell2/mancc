import * as React from 'react'
import { Typography, Box } from "@mui/material"
import { page } from '../styles/classes'
import { StatTable } from '../components/StatTable'

const URL = 'http://127.0.0.1:8000/api/home'

function Home() {


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


    return (

        <Box sx={page}>
            <Typography>Current Green Jacket Holder: Nick</Typography>
            {data && <StatTable golfer_data={data}/>}
            <Typography>Days since Bart has birdied: {birdies}</Typography>
        </Box>
    );

}

export default Home;