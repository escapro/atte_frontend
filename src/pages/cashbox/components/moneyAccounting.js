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
                            <input name="cash_start" style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('cash_start', parseInt(event.target.value))} type="number" />
                        </div>
                        <div className="table-body-row-item">
                            <input name="cash_end" style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('cash_end', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <input name="noncash_start" style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('noncash_start', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <input name="noncash_end" style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('noncash_end', parseInt(event.target.value))} />
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