import React, { Component } from 'react';
import '../../../assets/style.css'
import '../cashbox.css'

export default class MoneyAccounting extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="table" style={{ width: '60%' }}>
                <div className="table-header">
                    <span className="table-title">Учет денег</span>
                </div>
                <div className="table-column-title">
                    <div className="table-column-title-item">
                        <span>Смена</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Сотрудник</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Наличные начало</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Наличные конец</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Карта начало</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Карта конец</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Доход наличные</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Доход по карте</span>
                    </div>
                </div>
                <div className="table-body">
                    <div className="table-body-row">
                        <div className="table-body-row-item">
                            <select style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('shift_type', parseInt(event.target.value))}>
                                <option value="0">Выбор</option>
                                {
                                    this.props.shifts.map((shift) => {
                                        return <option key={shift.id} value={shift.id}>{shift.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="table-body-row-item">
                            <select style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('employee', parseInt(event.target.value))}>
                                <option value="0">Выбор</option>
                                {
                                    this.props.employees.map((employee) => {
                                        return <option key={employee.id} value={employee.id}>{employee.user.username}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="table-body-row-item">
                            <input style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('cash_start', parseInt(event.target.value))} type="number" />
                        </div>
                        <div className="table-body-row-item">
                            <input style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('cash_end', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <input style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('noncash_start', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <input style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('noncash_end', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <span style={{ color: 'grey' }}>12300</span>
                        </div>
                        <div className="table-body-row-item">
                            <span style={{ color: 'grey' }}>12300</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}