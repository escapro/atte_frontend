import React, { Component } from 'react';
import '../../../assets/style.css'
import { connect } from 'react-redux';
import StopWatch from '../../../components/utils/stopwatch';

class CashboxHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      work_time: 0,
      break_time: 0,
      current_action: null
    }

    this.date = React.createRef();
    this.start_time = React.createRef();
    this.end_time = React.createRef();
    
    this.updateActiveShiftAction = this.updateActiveShiftAction.bind(this);
  }

  componentDidMount() {
    this.getActiveShift()
  }

  getActiveShift() {
    this.props.adapter.activeShift('get')
      .then((result) => {
        this.setState({
          loading: false,
          work_time: result.data.work_time,
          break_time: result.data.break_time,
          current_action: result.data.current_action,
        })
      })
  }

  updateActiveShiftAction(action) {
    const self = this

    return new Promise(function (resolve, reject) {
      self.props.adapter.activeShift('updateAction', {action: action})
      .then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    });
  }

  render() {
    return (
      <div className="cashbox-header">
        <div>
          {
            !this.state.loading ?
              <StopWatch
                totalSeconds={this.state.work_time}
                isRunning={this.state.current_action == 1 || this.state.current_action == 3 ? true : false}
                changeAction={this.updateActiveShiftAction}
              />
              : <></>
          }
          <div className="cashbox-header-jobshift">
            <div className="cashbox-header-jobshift-closing">
              <button onClick={this.props.closeShift}>Закрыть смену</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect((state) => state)(CashboxHeader)