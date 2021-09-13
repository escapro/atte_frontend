import React, { Component } from 'react';
import { connect } from 'react-redux';

class Summary extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="cashbox-settings">
                <div className="setting-section">
                    <div className="setting-section__item">
                        <div className="setting-section__item-title">Сводка: </div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Выручка</th>
                                    <td>{this.props.summary.income}</td>
                                </tr>
                                <tr>
                                    <th>Прибыль</th>
                                    <td>{this.props.summary.net_profit}</td>
                                </tr>
                                <tr>
                                    <th>Расходы</th>
                                    <td>{this.props.summary.expense}</td>
                                    <td>
                                        {
                                            Object.keys(this.props.expenses.shift).map((key, index) =>
                                            (<tr key={key}>
                                                <th>{key}</th>
                                                <td>{this.props.expenses.shift[key]}</td>
                                            </tr>)
                                            )
                                        }
                                        {"total" in this.props.expenses.additional ?
                                                <tr>
                                                    <th>Доп расходы</th>

                                                    <td>{this.props.expenses.additional.total}</td>
                                                </tr> : null
                                            }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(Summary)