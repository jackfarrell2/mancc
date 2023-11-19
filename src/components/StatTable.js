import * as React from 'react'
import { useTable } from 'react-table'
import { statsHeader } from '../styles/classes'



function StatTable({golfer_data}) {

    const data = golfer_data
    const columns = React.useMemo(() => [
        {
            Header: "Golfer",
            accessor: "Golfer",
        },
        {
            Header: "Rounds",
            accessor: "Rounds",
        },
        {
            Header: "Avg Score",
            accessor: "Avg Score",
        },
        {
            Header: "Avg Par",
            accessor: "Avg Par",
        },
        {
            Header: "Best Score",
            accessor: "Best Score",
        },
        {
            Header: "Birdies Per",
            accessor: "Birdies Per",
        },
        {
            Header: "Pars Per",
            accessor: "Pars Per",
        },
        {
            Header: "Bogeys Per",
            accessor: "Bogeys Per",
        },
        {
            Header: "Doubles Per",
            accessor: "Doubles Per",
        },
        {
            Header: "Triples Per",
            accessor: "Triples Per",
        },
        {
            Header: "Maxes Per",
            accessor: "Maxes Per",
        },
        {
            Header: "Par 3 Avg",
            accessor: "Par 3 Avg",
        },
        {
            Header: "Par 4 Avg",
            accessor: "Par 4 Avg",
        },
        {
            Header: "Par 5 Avg",
            accessor: "Par 5 Avg",
        },
        {
            Header: "Eagles",
            accessor: "Eagles",
        },
    ], [])
    
    const tableInstance = useTable({
        columns: columns,
        data: data,
    })

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance
    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup, i) => (
                            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column, i) => (
                                        <th key={i} {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr key={i} {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell, i) => {
                                            return <td key={i} {...cell.getCellProps}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
)

}
    

export {StatTable}