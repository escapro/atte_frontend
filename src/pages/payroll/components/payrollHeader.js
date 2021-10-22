import React, { Component } from 'react';
import '../../../assets/style.css'
import { connect } from 'react-redux';
import moment from 'moment'

class PayrollHeader extends Component {

    constructor(props) {
        super(props)

        this.state = {
            months: [
                ['Январь', 1],
                ['Февраль', 2],
                ['Март', 3],
                ['Апрель', 4],
                ['Май', 5],
                ['Июнь', 6],
                ['Июль', 7],
                ['Август', 8],
                ['Сентябрь', 9],
                ['Октябрь', 10],
                ['Ноябрь', 11],
                ['Декабрь', 12],
            ]
        }
    }

    onMonthFilterChange(e) {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]

        this.props.onUrlParamsChange('date_month', optionElement.getAttribute('date_month'))
        this.props.onUrlParamsChange('date__year', optionElement.getAttribute('date__year'), true)
    }

    render() {
        return (
            <div className="payroll-header">
                <select onChange={(e) => this.onMonthFilterChange(e)}>
                    {this.state.months.map((value, index) => {
                        return (
                            <option
                                key={index}
                                date_month={value[0]}
                                value={value[1]}
                                selected={moment(new Date().setDate(1)).format('M') == value[1] ? true : false}>
                                {value[0]}</option>
                        )
                    })
                    }
                </select>
            </div>
        )
    }
}

export default connect((state) => state)(PayrollHeader)