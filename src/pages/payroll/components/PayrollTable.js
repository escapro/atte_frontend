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
                                                            <th className={`payroll-paeriod-header ${valueInd == 0 ? 'payroll-period-header__bold_border' : ''}`}>{value}</th>
                                                        )
                                                    })}
                                                </>
                                            )
                                        })
                                    }
                                    <th className="payroll-period-header__bold_border">Итого</th>
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
                                                        <td>{payroll.periods[key].from_shift}</td>
                                                        <td>{payroll.periods[key].from_interest}</td>
                                                        <td>{0}</td>
                                                        <td>{0}</td>
                                                    </>
                                                )
                                                )}
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