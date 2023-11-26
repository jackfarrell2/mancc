import { TableCell, FormControl, InputLabel, TableRow } from "@mui/material"
import { StrokeInput } from "./StrokeInput"
import { SubmitGolferSelect } from "./SubmitGolferSelect"

function StrokeInputRow({strokes, golfers, handleChange}) {
    const strokeInputs = []
    console.log(strokes)
    strokeInputs.push(<TableCell sx={{fontFamily: "ink free", border: '1px solid black', minWidth: "175px"}}><FormControl fullWidth id="golfer"><InputLabel id="golfer-select">Golfer</InputLabel><SubmitGolferSelect golfers={golfers} /></FormControl></TableCell>)
    for (let i = 0; i < 18; i++) {
        strokeInputs.push(<TableCell key={i} sx={{border: '1px solid black'}} align="center" size="small"><StrokeInput strokes={strokes[i]} handleChange={handleChange} index={i} /></TableCell>)
    }
    const frontNineScores = strokes.slice(0, 9)
    const backNineScores = strokes.slice(9, 18)
    const frontNineSum = frontNineScores.reduce((partialSum, a) => partialSum + a, 0)
    const backNineSum = backNineScores.reduce((partialSum, a) => partialSum + a, 0)
    strokeInputs.splice(10, 0, <TableCell key={'blank3'} sx={{border: '1px solid black'}} align="center">{(frontNineSum !== 0) && frontNineSum}</TableCell>)
    strokeInputs.push(<TableCell key={'blank'} sx={{border: '1px solid black'}} align="center">{(backNineSum !== 0) && backNineSum}</TableCell>)
    strokeInputs.push(<TableCell key={'blank2'} sx={{border: '1px solid black'}} align="center">{((frontNineSum + backNineSum) !== 0) && (frontNineSum + backNineSum)}</TableCell>)
    return (
        <TableRow>
            {strokeInputs}
        </TableRow>
    )
}

export { StrokeInputRow }