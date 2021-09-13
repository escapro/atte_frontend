import React, { Component } from 'react';
import { connect } from 'react-redux';

class PermissibleCashDifference extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            differencePlus: null,
            differenceMinus: null,
        }

        this.new_difference_plus = React.createRef();
        this.new_difference_minus = React.createRef();

    }

    componentDidMount() {
        this.getDifferences()
    }

    getDifferences() {
        this.props.adapter.client('get')
            .then((result) => {
                this.setState({
                    differencePlus: result.data.permissible_cash_difference_plus,
                    differenceMinus: result.data.permissible_cash_difference_minus,
                    loading: false
                })
            })
    }

    handleChanges(field, value) {
        if (field == 'plus') {
            this.setState({
                differencePlus: this.new_difference_plus.current.value
            })
        } else if(field == 'minus') {
            this.setState({
                differenceMinus: this.new_difference_minus.current.value
            })
        }
    }

    saveDifferences() {
        let data = {}
        data['permissible_cash_difference_plus'] = this.state.differencePlus
        data['permissible_cash_difference_minus'] = this.state.differenceMinus

        this.props.adapter.client('put', data)
            .then((result) => {
                this.new_difference_plus.current.value = null
                this.new_difference_minus.current.value = null

                this.getDifferences()
            })
    }

    render() {
        return (
            <div className="cashbox-settings">
                <div className="setting-section">
                    <div className="setting-section__item">
                        <div className="setting-section__item-title">Допустимая разница по кассе: </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
                                <span>В плюс</span>
                                <span><input onChange={(value) => this.handleChanges('plus', value.target.value)} value={this.state.differencePlus} ref={this.new_difference_plus} type="number" /></span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span>В минус</span>
                                <span><input onChange={(value) => this.handleChanges('minus', value.target.value)} value={this.state.differenceMinus} ref={this.new_difference_minus} type="number" /></span>
                            </div>
                            <button onClick={() => this.saveDifferences()}>✔</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(PermissibleCashDifference)