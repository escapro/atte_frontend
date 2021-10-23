import React, { Component } from 'react';
import { connect } from 'react-redux';

class PayrollTable extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            headers: [],
            payrolls: []
        }
    }

    componentDidMount() {
        this.getPayrollData()
    }

    getPayrollData() {
        this.props.adapter.payrolls('get')
            .then(result => {
                this.setState({
                    headers: result.data.headers,
                    payrolls: result.data.payrolls,
                    loading: false
                })
            })
    }

    render() {
        return (
            <div className="payroll-table">
                {
                    !this.state.loading ?
                        <table>
                            <thead>
                                <tr>
                                    <th>Сотрудник</th>
                                    {
                                        this.state.headers.map((groups, groupsInd) => {
                                            return (
                                                <>
                                                    {groups.map((value, valueInd) => {
                                                        return (
                                                            <th className={`payroll-paeriod-header ${valueInd == 0 ? 'table_row_bold_border' : ''}`}>{value}</th>
                                                        )
                                                    })}
                                                </>
                                            )
                                        })
                                    }
                                    <th className="table_row_bold_border">Итого</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.payrolls.map((payroll, payrollInd) => {
                                        return (
                                            <tr>
                                                <td>{payroll.employee}</td>
                                                {Object.keys(payroll.periods).map((key, value) => (
                                                    <>
                                                        <td className="table_row_bold_border">{payroll.periods[key].from_shift}</td>
                                                        <td>{payroll.periods[key].from_interest}</td>
                                                        <td>{payroll.periods[key].summary}</td>
                                                        <td>{payroll.periods[key].paid_salary}</td>
                                                    </>
                                                )
                                                )}
                                                <td className="table_row_bold_border">{payroll.total}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        : null
                }
            </div>
        )
    }
}

export default connect((state) => state)(PayrollTable)