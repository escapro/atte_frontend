import React, { Component } from 'react';
import { connect } from 'react-redux';

class EmployeeBonuses extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            bonuses: [],
            shift_types: [],
            new_bonuse: {
                shift_type: '',
                revenue_to: '',
                rate: '',
            }
        }

        this.new_revenue_to = React.createRef();
        this.new_rate = React.createRef();

    }

    componentDidMount() {
       this.getBonuses()
       this.getShiftTypes()
    }

    getShiftTypes() {
        this.props.adapter.shiftTypes('get')
        .then((result) => {
            this.setState({
                shift_types: result.data,
            })
        })
    }

    getBonuses() {
        this.props.adapter.bonuses('get')
        .then((result) => {
            this.setState({
                bonuses: result.data,
                loading: false
            })
        })
    }

    handleChanges(field, value) {
        this.setState(prevState => ({
            new_bonuse: {
                ...prevState.new_bonuse,
                [field]: value
            }
        }))
    }

    createBonuse() {
        this.props.adapter.bonuses('create', this.state.new_bonuse)
            .then((result) => {
                this.new_revenue_to.current.value = null
                this.new_rate.current.value = null

                this.getBonuses()
            })
    }

    render() {
        return (
            <div className="cashbox-settings">
                <div className="setting-section">
                    <div className="setting-section__item">
                        <div className="setting-section__item-title">Бонусы сотрудников: </div>
                        <table>
                            <tr>
                                <th>Тип смены</th>
                                <th>Выручка до</th>
                                <th>Ставка%</th>
                                <th></th>
                            </tr>
                            {
                                this.state.bonuses.map((bonuse) => {
                                    return (
                                        <tr>
                                            <td>{bonuse.shift_type.name}</td>
                                            <td>{bonuse.revenue_to}</td>
                                            <td>{bonuse.rate}</td>
                                            <td>
                                                <button>✎</button>
                                                <button>🗑</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <th>
                                    <select onChange={(e) => this.handleChanges('shift_type', parseInt(e.target.selectedIndex))}>
                                        <option value='0'>Выберите смену</option>
                                        {
                                            this.state.shift_types.map(value => 
                                            <option value={value.name}>{value.name}</option>
                                            )}
                                    </select>
                                </th>
                                <th><input ref={this.new_revenue_to} onChange={(value) => this.handleChanges('revenue_to', parseInt(value.target.value))} type="number" /></th>
                                <th><input ref={this.new_rate} onChange={(value) => this.handleChanges('rate', parseInt(value.target.value))} type="number" /></th>
                                <td><button onClick={() => this.createBonuse()}>✔</button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(EmployeeBonuses)