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
                        <span>Продажи</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>В кассе</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Возврат налом</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Возврат картой</span>
                    </div>
                    <div className="table-column-title-item">
                        <span>Разница</span>
                    </div>
                </div>
                <div className="table-body">
                    <div className="table-body-row">
                        <div className="table-body-row-item">
                            <input name="sales" type="number" style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('sales', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <input name="cashbox_fact" type="number" style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('cashbox_fact', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <input name="cash_refund" type="number" style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('cash_refund', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <input name="noncash_refund" type="number" style={{ color: 'grey' }} onChange={(event) => this.props.handleChangeData('noncash_refund', parseInt(event.target.value))} />
                        </div>
                        <div className="table-body-row-item">
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <div style={{display: 'flex', flexDirection: 'column', marginRight: 10}}>
                                    <span style={{ color: 'grey' }}><b>Налом: </b>{this.props.difference.cash}</span>
                                    <span style={{ color: 'grey' }}><b>Картой: </b>{this.props.difference.noncash}</span>
                                </div>
                                {
                                    this.props.difference.cash != 0 || this.props.difference.noncash !=0 ?
                                    <b style={{color: 'red'}}>⚠</b> 
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(OnlineCashbox)