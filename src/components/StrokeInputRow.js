import { TableCell, FormControl, TableRow } from "@mui/material"
import { StrokeInput } from "./StrokeInput"
import { SubmitGolferSelect } from "./SubmitGolferSelect"

function StrokeInputRow({strokes =  Array(18).fill(0), golfers, handleChange, handleAdd, handleRemove, golferIndex, handleGolferChange, selectedGolfers, golferCount}) {
    const strokeInputs = []
    strokeInputs.push(<TableCell key="golferName" style={{fontFamily: "ink free", border: '1px solid black', minWidth: "250px"}}><FormControl fullWidth id="golfer"><SubmitGolferSelect golferCount={golferCount} selectedGolfers={selectedGolfers} handleChange={handleGolferChange} handleAdd={handleAdd} handleRemove={handleRemove} golferIndex={golferIndex} golfers={golfers} /></FormControl></TableCell>)
    for (let i = 0; i < 18; i++) {
        strokeInputs.push(<TableCell key={i} style={{border: '1px solid black'}} align="center" size="small"><StrokeInput strokes={strokes[i]} handleChange={handleChange} golferIndex={golferIndex} index={i} /></TableCell>)
    }

    const frontNineScores = strokes.slice(0, 9)
    const backNineScores = strokes.slice(9, 18)
    const frontNineSum = frontNineScores.reduce((partialSum, a) => partialSum + a, 0)
    const backNineSum = backNineScores.reduce((partialSum, a) => partialSum + a, 0)
    strokeInputs.splice(10, 0, <TableCell key={'blank3'} style={{border: '1px solid black'}} align="center">{(frontNineSum !== 0) && frontNineSum}</TableCell>)
    strokeInputs.push(<TableCell key={'blank'} style={{border: '1px solid black'}} align="center">{(backNineSum !== 0) && backNineSum}</TableCell>)
    strokeInputs.push(<TableCell key={'blank2'} style={{border: '1px solid black'}} align="center">{((frontNineSum + backNineSum) !== 0) && (frontNineSum + backNineSum)}</TableCell>)
    return (
        <TableRow>
            {strokeInputs}
        </TableRow>
    )
}

export { StrokeInputRow }