import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../shiftSchedule.scss'

class DailySchedule extends Component {

    constructor(props) {
        super(props)

        this.state = {
            last_week: [],
            current_week: [],
            next_week: [],
            loading: true
        }
    }

    componentDidMount() {
        this.getDailyShiftSchedule()
    }

    getDailyShiftSchedule() {
        this.props.adapter.dailyShiftSchedule('get')
            .then((result) => {
                this.setState({
                    last_week: result.data.last_week,
                    current_week: result.data.current_week,
                    next_week: result.data.next_week,
                    loading: false
                })
            })
        // .catch((result) => {
        //     if (result.response.data.error != undefined) {
        //         this.setState({
        //             accoutingHeaderLoading: false,
        //         })
        //         alert(result.response.data.error)
        //     }
        // })
    }

    render() {
        return (
            <div className="section_dailyschedule">
                <table>
                    <thead>
                        <tr>
                            Расписание по дням
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !this.state.loading ?
                                this.state.last_week.map((value, index) => {
                                    return (
                                        <tr>
                                            <td>{value.date}</td>
                                            <td>{value.week}</td>
                                            <td>
                                                {
                                                    this.props.shift_types.map((st_value, st_index) => {
                                                        return (
                                                            <tr>{st_value.name}</tr>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    this.props.shift_types.map((st_value, st_index) => {
                                                        if (st_value.id == value.shift_type) {
                                                            return (
                                                                <tr>{value.employee}</tr>
                                                            )
                                                        }
                                                    })
                                                }
                                            </td>
                                        </tr>
                                    )
                                }) : ''
                        }

                        {
                            !this.state.loading ?
                                this.state.current_week.map((value, index) => {
                                    return (
                                        <tr>
                                            <td>{value.date}</td>
                                            <td>{value.week}</td>
                                            <td>
                                                {
                                                    this.props.shift_types.map((st_value, st_index) => {
                                                        return (
                                                            <tr>{st_value.name}</tr>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    this.props.shift_types.map((st_value, st_index) => {
                                                        if (st_value.id == value.shift_type) {
                                                            return (
                                                                <tr>{value.employee}</tr>
                                                            )
                                                        }
                                                    })
                                                }
                                            </td>
                                        </tr>
                                    )
                                }) : ''
                        }

                        {
                            !this.state.loading ?
                                this.state.next_week.map((value, index) => {
                                    return (
                                        <tr>
                                            <td>{value.date}</td>
                                            <td>{value.week}</td>
                                            <td>
                                                {
                                                    this.props.shift_types.map((st_value, st_index) => {
                                                        return (
                                                            <tr>{st_value.name}</tr>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                {
                                                    this.props.shift_types.map((st_value, st_index) => {
                                                        if (st_value.id == value.shift_type) {
                                                            return (
                                                                <tr>{value.employee}</tr>
                                                            )
                                                        }
                                                    })
                                                }
                                            </td>
                                        </tr>
                                    )
                                }) : ''
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect((state) => state)(DailySchedule)