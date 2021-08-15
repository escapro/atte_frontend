import React, { Component } from 'react';
import '../../../assets/style.css'
import '../cashbox.css'
import { connect } from 'react-redux';

class OnlineCashbox extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="table" style={{ width: '50%' }}>
                <div className="table-header">
                    <span className="table-title">Эвотор</span>
                </div>
                <div className="table-column-title">
                    <div className="table-column-title-item">
                        <span>Смена</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Продажи</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>В кассе</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Возврат</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Разница</span>
                    </div>
                </div>
                <div className="table-body">
                    <div className="table-body-row">
                        <div className="table-body-row-item">
                            <select style={{ color: 'grey' }}>
                                <option value="0">Выбор</option>
                                {
                                    this.props.shifts.map((shift) => {
                                        return <option key={shift.id} value={shift.id}>{shift.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="table-body-row-item">
                            <input style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('sales', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <input style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('cashbox_fact', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <input style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('refund', parseInt(event.target.value))} />
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

export default connect((state) => state)(OnlineCashbox)