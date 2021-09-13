import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

class AccountingHeader extends Component {

    constructor(props) {
        super(props)

        this.state = {
            active_month: ''
        }
    }

    componentDidMount() {
        this.updateTitle()
    }

    componentDidUpdate() {
        this.updateTitle()
    }

    updateTitle() {
        this.props.pagination.months.map((value, index) => {
            if (value.is_active) {
                var title = document.getElementsByClassName("accounting-header-month_name")[0]
                title.innerHTML = value.name.toLowerCase()
            }
        })
    }

    onMonthFilterChange(e) {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]

        this.props.onUrlParamsChange('from_date', optionElement.getAttribute('from_date'))
        this.props.onUrlParamsChange('to_date', optionElement.getAttribute('to_date'), true)
    }

    render() {
        return (
            <div className="accounting-header">
                <div className="mh-20">
                    <h1>Отчет за <span className="accounting-header-month_name"></span></h1>
                    <select onChange={(e) => this.onMonthFilterChange(e)}>
                        {this.props.pagination.months.map((value, index) => {
                            return (
                                <option 
                                    key={index} 
                                    from_date={value.url_params.from_date}
                                    to_date={value.url_params.to_date}
                                    selected={value.is_active}>
                                    {value.name}</option>
                            )
                        })
                        }
                    </select>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(AccountingHeader)