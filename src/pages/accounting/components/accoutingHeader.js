import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from '../../../components/controls/checkbox/checkbox';

class AccountingHeader extends Component {

    constructor(props) {
        super(props)

        this.state = {
            active_month: '',
            dateRangeStart: null,
            dateRangeEnd: null,
            startDate: this.dateRangeStart,
            endDate: this.dateRangeEnd
        }

        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

    }

    componentDidMount() {
        // this.updateTitle()
    }

    componentDidUpdate() {
        // this.updateTitle()
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

    handleChange(date) {
        var range = date;

        this.setState({
            dateRangeStart: range[0],
            dateRangeEnd: range[1]
        })

        if (range[0] != null && range[1] != null) {
            this.props.onUrlParamsChange('from_date', moment(range[0]).format('YYYY-MM-DD'))
            this.props.onUrlParamsChange('to_date', moment(range[1]).format('YYYY-MM-DD'), true)
        }

        console.log(range);
    }

    onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.startDate)
    }

    render() {
        return (
            <div className="accounting-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-12 d-flex flex-sm-row flex-column align-items-center">
                            <span className="reporting-text me-3">ОТЧЕТНОСТЬ:</span>
                            {/* <span className="accounting-header-month_name"></span> */}
                            {/* <select onChange={(e) => this.onMonthFilterChange(e)}>
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
                            </select> */}
                            <DatePicker
                                onChange={(date) => this.handleChange(date)}
                                // selected={this.state.startDate}
                                startDate={this.state.dateRangeStart}
                                endDate={this.state.dateRangeEnd}
                                selectsRange={true}
                                dateFormat="dd/MM/yyyy"
                                peekNextMonth={true}
                                showMonthDropdown={true}
                                showYearDropdown={true}
                                dropdownMode="select"
                                placeholderText="Нажмите для выбора даты"
                                shouldCloseOnSelect={true}
                                defaultValue={null}
                            />
                        </div>
                        <div className="col-xl-8 col-12 d-flex align-items-center cashbox-checkboxes flex-wrap">
                            {
                                this.props.cashboxes.map((value, index) => {
                                    return (
                                        <Checkbox
                                            title={value.name}
                                            name={value.name}
                                            checked={true}
                                            value={value.id}
                                            onChange={() => { }}
                                            class="cashbox-checkboxes-item"
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(AccountingHeader)