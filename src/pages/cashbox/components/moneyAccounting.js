import React, { Component } from 'react';
import '../../../assets/style.css'
import '../cashbox.css'
import { connect } from 'react-redux';

class MoneyAccounting extends Component {

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
                            <select style={{color: 'grey'}}>
                                <option>Утро</option>
                                <option>День</option>
                                <option>Ночь</option>
                            </select>
                        </div>
                        <div className="table-body-row-item">
                            <select style={{color: 'grey'}}>
                                <option>Даниил</option>
                                <option>Влад</option>
                                <option>Дима</option>
                            </select>
                        </div>
                        <div className="table-body-row-item">
                            <input style={{color: 'grey'}}/>
                        </div>
                        <div className="table-body-row-item">
                            <input style={{color: 'grey'}}/>
                        </div>
                        <div className="table-body-row-item">
                            <input style={{color: 'grey'}}/>
                        </div>
                        <div className="table-body-row-item">
                            <input style={{color: 'grey'}}/>
                        </div>
                        <div className="table-body-row-item">
                            <span style={{color: 'grey'}}>12300</span>
                        </div>
                        <div className="table-body-row-item">
                            <span style={{color: 'grey'}}>12300</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(MoneyAccounting)