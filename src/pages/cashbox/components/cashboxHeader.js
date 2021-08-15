import React, { Component } from 'react';
import '../../../assets/style.css'

export default class CashboxHeader extends Component {

  constructor(props) {
    super(props)

    this.date = React.createRef();
    this.start_time = React.createRef();
    this.end_time = React.createRef();
  }

  render() {
    return (
      <div className="cashbox-header">
        <div className="cashbox-header-jobshift">
          <input type="date" onChange={(event) => this.props.handleChangeData('date', event.target.value)}/>
          <div className="cashbox-header-jobshift-time">
            <input type="time" onChange={(event) => this.props.handleChangeData('shift_start_time', event.target.value)}/>
            <input type="time" onChange={(event) => this.props.handleChangeData('shift_end_time', event.target.value)}/>
          </div>
        </div>
        <div className="cashbox-header-jobshift-closing">
          <button onClick={this.props.closeShift}>Закрыть смену</button>
        </div>
      </div>
    )
  }
}