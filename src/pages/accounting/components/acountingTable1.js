import React from 'react'
import { useTable } from 'react-table'

export default function AccountingTable(props) {

  const data = React.useMemo(
    () => props.data,
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Общий',
        columns: [
          {
            Header: 'День',
            accessor: 'date.week',
          },
          {
            Header: 'Дата',
            accessor: 'date.day',
          },
          {
            Header: 'Доход',
            accessor: 'total_income',
          },
          {
            Header: 'Доход налом',
            accessor: 'cash_income',
          },
          {
            Header: 'Доход картой',
            accessor: 'noncash_income',
          },
          {
            Header: 'Расходы',
            accessor: 'total_expenses',
          }
        ]
      },
      {
        Header: 'Кассы',
        columns: props.headers.cashboxes.map((cashbox) => {
          return {
            id: `${cashbox.id}`,
            Header: cashbox.name,
            columns: props.headers.shift_types.map((shift_type) => {
              return {
                id: `${cashbox.id}.${shift_type.id}`,
                Header: shift_type.name,
                columns: [
                  {
                    id: `${cashbox.id}.${shift_type.id}.shift_income`,
                    Header: 'Доход',
                    accessor: `cashboxes[${cashbox.id}].shifts[${shift_type.id}].total_income`,
                    className: 'user',
                    style: {
                      fontWeight: 'bolder',
                      backgroundColor: 'red'
                    },
                  },
                  {
                    id: `${cashbox.id}.${shift_type.id}.cash_income`,
                    Header: 'Доход налом',
                    accessor: `cashboxes[${cashbox.id}].shifts[${shift_type.id}].cash_income`,
                  },
                  {
                    id: `${cashbox.id}.${shift_type.id}.noncash_income`,
                    Header: 'Доход картой',
                    accessor: `cashboxes[${cashbox.id}].shifts[${shift_type.id}].noncash_income`,
                  },
                  {
                    id: `${cashbox.id}.${shift_type.id}.total_expenses`,
                    Header: 'Расходы',
                    accessor: `cashboxes[${cashbox.id}].shifts[${shift_type.id}].total_expenses`,
                  },
                ]
              }
            })
          }
        })
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: [],
    },
    showPagination: true
  })

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    // borderBottom: 'solid 3px red',
                    // background: 'aliceblue',
                    // color: 'black',
                    // fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        // padding: '10px',
                        // border: 'solid 1px gray',
                        // background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}