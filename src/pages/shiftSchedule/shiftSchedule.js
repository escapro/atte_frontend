import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/style.css'
import './shiftSchedule.scss'
import Header from '../../components/header/header'
import DailySchedule from './components/daily_schedule'
import WishesDailyShift from './components/wishes_daily_shift'

class ShiftSchedule extends Component {

    constructor(props) {
        super(props)

        this.state = {
            shift_types: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getShiftTypes()
    }

    getShiftTypes() {
        this.props.adapter.shiftTypes('get')
            .then((result) => {
                this.setState({
                    shift_types: result.data,
                    loading: false
                })
            })
    }

    render() {
        return (
            <div className="shift_schedule">
                <Header />
                <div className="container">
                    <div className="flex">
                        {
                            this.state.shift_types.length > 0 ?
                                <DailySchedule
                                    shift_types={this.state.shift_types}
                                />
                                : ''
                        }
                        <WishesDailyShift />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(ShiftSchedule)