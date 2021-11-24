import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../shiftSchedule.scss'

class WishesDailyShift extends Component {

    constructor(props) {
        super(props)

        this.state = {
            schedule: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getWishesDailyShift()
    }

    getWishesDailyShift() {
        this.props.adapter.wishesDailyShift('get')
            .then((result) => {
                this.setState({
                    schedule: 'sad',
                    loading: false
                })
            })
    }

    render() {
        return (
            <div className="section_dailyschedule">
                asdsa
            </div>
        )
    }
}

export default connect((state) => state)(WishesDailyShift)