import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShiftTypes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            shift_types: [],
            new_shift_type: {
                index: '',
                name: '',
                hourly_rate: '',
                is_active: false,
            }
        }

        this.new_index = React.createRef();
        this.new_name = React.createRef();
        this.new_hourly_rate = React.createRef();
        this.new_is_active = React.createRef();
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

    handleChanges(field, value) {
        this.setState(prevState => ({
            new_shift_type: {
                ...prevState.new_shift_type,
                [field]: value
            }
        }))
    }

    createShiftType() {
        this.props.adapter.shiftTypes('create', this.state.new_shift_type)
            .then((result) => {
                this.new_index.current.value = null
                this.new_name.current.value = null
                this.new_hourly_rate.current.value = null
                this.new_is_active.current.value = null

                this.getShiftTypes()
            })
    }

    render() {
        return (
            <div className="cashbox-settings">
                <div className="setting-section">
                    <div className="setting-section__item">
                        <div className="setting-section__item-title">Типы смен: </div>
                        <table>
                            <tr>
                                <th>Индекс</th>
                                <th>Название</th>
                                <th>Почасовая ставка</th>
                                <th>Активный</th>
                                <th></th>
                            </tr>
                            {
                                this.state.shift_types.map((st) => {
                                    return (
                                        <tr>
                                            <td>{st.index}</td>
                                            <td>{st.name}</td>
                                            <td>{st.hourly_rate}</td>
                                            <td>{st.is_active ? '✔' : '✖'}</td>
                                            <td>
                                                <button>✎</button>
                                                <button>🗑</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <th><input ref={this.new_index} onChange={(value) => this.handleChanges('index', parseInt(value.target.value))} type="number" /></th>
                                <th><input ref={this.new_name} onChange={(value) => this.handleChanges('name', value.target.value)} type="text" /></th>
                                <th><input ref={this.new_hourly_rate} onChange={(value) => this.handleChanges('hourly_rate', value.target.value)} type="number" /></th>
                                <th><input ref={this.new_is_active} onChange={(value) => this.handleChanges('is_active', value.target.checked)} type="checkbox" /></th>
                                <td><button onClick={() => this.createShiftType()}>✔</button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(ShiftTypes)