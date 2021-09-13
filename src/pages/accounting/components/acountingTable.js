import React, { cloneElement } from 'react'
import { useTable } from 'react-table'

let headerGroupColumnsId = {}
headerGroupColumnsId['cashboxes'] = {}

// Create a default prop getter
const defaultPropGetter = () => ({})

// Expose some prop getters for headers, rows and cells, or more if you want!
function Table({
  columns,
  data,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    allColumns,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  const getColumnById = (id) => {
    let result = null
    allColumns.map((column) => {
      if (column.id == id) {
        result = column
        return
      }
    })
    return result
  }

  const toggleColumnVisibility = (key) => {
    headerGroupColumnsId.cashboxes[key].map((column_id) => {
      let column = getColumnById(column_id)
      if (column) column.toggleHidden()
    })
  }

  const isColumnVisible = (key) => {
    let result = false
    headerGroupColumnsId.cashboxes[key].map((column_id) => {
      let column = getColumnById(column_id)
      // if (column.isVisible) {
      //   result = true
      //   return
      // }
    })
    return result
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {Object.keys(headerGroupColumnsId.cashboxes).map((key, index) =>
        (
          <div key={key}>
            <label>
              <input type="checkbox" onChange={() => toggleColumnVisibility(key)} />
              {key}
            </label>
          </div>
        )
        )}
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  // Return an array of prop objects and react-table will merge them appropriately
                  {...column.getHeaderProps([
                    {
                      className: column.className,
                      style: column.style,
                    },
                    getColumnProps(column),
                    getHeaderProps(column),
                  ])}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              // Merge user row props in
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map(cell => {
                  return (
                    <td
                      // Return an array of prop objects and react-table will merge them appropriately
                      {...cell.getCellProps([
                        {
                          className: cell.column.className,
                          style: cell.column.style,
                        },
                        getColumnProps(cell.column),
                        getCellProps(cell),
                      ])}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        {/* <tfoot>
          {footerGroups.map(group => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map(column => (
                <td {...column.getFooterProps()}>{ typeof column.Footer == 'object' ? column.render('Footer') : ''}</td>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
    </div>
  )
}

const generateQwe = (shift_types, cashbox) => {
  let result = []

  headerGroupColumnsId['cashboxes'][cashbox.name] = []

  result.push(
    {
      id: `${cashbox.id}.total_income`,
      Header: 'Доход',
      accessor: `cashboxes[${cashbox.id}].total_income`
    }
  )

  result.push(
    {
      id: `${cashbox.id}.cash_income`,
      Header: 'Доход налом',
      accessor: `cashboxes[${cashbox.id}].cash_income`
    }
  )

  result.push(
    {
      id: `${cashbox.id}.noncash_income`,
      Header: 'Доход картой',
      accessor: `cashboxes[${cashbox.id}].noncash_income`
    }
  )

  result.push(
    {
      id: `${cashbox.id}.total_expenses`,
      Header: 'Расходы',
      accessor: `cashboxes[${cashbox.id}].total_expenses`
    }
  )

  shift_types.map((shift_type) => {

    headerGroupColumnsId['cashboxes'][cashbox.name].push(`${cashbox.id}.${shift_type.id}`)

    result.push({
      id: `${cashbox.id}.${shift_type.id}`,
      Header: shift_type.name,
      columns: [
        {
          id: `${cashbox.id}.${shift_type.id}.shift_income`,
          Header: 'Доход',
          accessor: `cashboxes[${cashbox.id}].shifts[${shift_type.id}].total_income`,
          style: {
            fontWeight: 'bolder'
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
        }
      ]
    })

    headerGroupColumnsId['cashboxes'][cashbox.name].push(`${cashbox.id}.${shift_type.id}.shift_income`)
    headerGroupColumnsId['cashboxes'][cashbox.name].push(`${cashbox.id}.${shift_type.id}.cash_income`)
    headerGroupColumnsId['cashboxes'][cashbox.name].push(`${cashbox.id}.${shift_type.id}.noncash_income`)
  })

  return result
}

const generateColumn = (headers) => {
  let result = []

  result.push(
    {
      Header: 'Общий',
      columns: [
        {
          id: 'total__day',
          Header: 'День',
          accessor: 'date.week',
        },
        {
          id: 'total__date',
          Header: 'Дата',
          accessor: 'date.day',
        },
        {
          id: 'total__total_income',
          Header: 'Доход',
          accessor: 'total_income',
        },
        {
          id: 'total__cash_income',
          Header: 'Доход налом',
          accessor: 'cash_income',
        },
        {
          id: 'total__noncash_income',
          Header: 'Доход картой',
          accessor: 'noncash_income',
        },
        {
          id: 'total__total_expenses',
          Header: 'Расходы',
          accessor: 'total_expenses',
        }
      ]
    }
  )

  headers.cashboxes.map((cashbox) => {
    result.push({
      id: `${cashbox.id}`,
      Header: cashbox.name,
      columns: generateQwe(headers.shift_types, cashbox)
    })
  })

  return result

}

export default function AccountingTable(props) {
  const columns = React.useMemo(
    () => generateColumn(props.headers),
    []
  )

  // const data = React.useMemo(() => props.detail, [])

  return (
    <Table
      columns={columns}
      data={props.detail}
      getHeaderProps={column => ({
        onClick: () => {
          console.log(column);
        },
      })}
      getColumnProps={column => ({
        onClick: () => {
          console.log(column);
        },
      })}
      getRowProps={row => ({
        style: {
          background: row.index % 2 === 0 ? 'rgba(0,0,0,.1)' : 'white',
        },
      })}
      getCellProps={cellInfo => ({
        style: {

        },
      })}
    />
  )
}