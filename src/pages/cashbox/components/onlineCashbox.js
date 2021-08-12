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
                                <option>Утро</option>
                                <option>День</option>
                                <option>Ночь</option>
                            </select>
                        </div>
                        <div className="table-body-row-item">
                            <input style={{ color: 'grey' }} />
                        </div>
                        <div className="table-body-row-item">
                            <input style={{ color: 'grey' }} />
                        </div>
                        <div className="table-body-row-item">
                            <input style={{ color: 'grey' }} />
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