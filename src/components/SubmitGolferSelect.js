import { Select, MenuItem } from "@mui/material"

function SubmitGolferSelect({golfers}) {
    const golferSelects = []
    for (let i = 0; i <golfers.length; i++) {
        golferSelects.push(<MenuItem key={i} value={golfers[i]}>{golfers[i]}</MenuItem>)
    }
    
    return (
        <Select>
            {golferSelects}
        </Select>
    )
}

export { SubmitGolferSelect }