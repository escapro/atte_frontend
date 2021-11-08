import React, { Component } from 'react';
import { connect } from 'react-redux';
import './checkbox.scss'

class Checkbox extends Component {

    constructor(props) {
        super(props)

        this.state = {
            checked: false
        }
    }

    componentDidMount() {
        this.setState({
            checked: this.props.checked
        })
    }

    render() {
        return (
            <div className={"control-checkbox d-flex align-items-end " + this.props.class}>
                <input
                    type="checkbox"
                    checked={this.state.checked ? true : false}
                    className="custom-checkbox" id={this.props.name}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={(value) => {
                        this.setState({
                            checked: !this.state.checked
                        })
                        this.props.onChange(this.props.value)
                    }}
                />
                <label className="checkbox-title" htmlFor={this.props.name}>{this.props.title}</label>
            </div>
        )
    }
}

export default connect((state) => state)(Checkbox)