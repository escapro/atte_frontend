import React, { Component } from 'react';
import { connect } from 'react-redux';
import './table.scss'

class Table extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="table-component">
                dsaf
            </div>
        )
    }
}

export default connect((state) => state)(Table)