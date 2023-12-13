import * as React from 'react'
import { useTable, useSortBy } from 'react-table'
import '../styles/table.css';
import { useNavigate } from 'react-router-dom'



function MinimizedStatTable({golfer_data}) {
    const navigate = useNavigate()
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
            Header: "Best Score",
            accessor: "Best Score",
        },
    ], [])
    
    const tableInstance = useTable({
        columns: columns,
        data: data,
    }, useSortBy)

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    React.useEffect(() => {
        const handleRowClick = (golferName) => {
        navigate(`/golfers/${golferName}`);
        };

        rows.forEach((row) => {
        row.onClick = () => handleRowClick(row.original.Golfer);
        });
    }, [navigate, rows]);

    return (
        <div>
            <table className="main-table" {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup, i) => (
                            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column, i) => (
                                        <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</th>
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
                                <tr key={i} {...row.getRowProps()} onClick={row.onClick} style={{cursor: 'pointer'}}>
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
    

export {MinimizedStatTable}