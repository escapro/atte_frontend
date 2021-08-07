import React, { Component } from 'react';
import '../../assets/style.css'

export default class CashboxHeader extends Component {
  render() {
    return (
      <div className="cashbox-header">
          <div className="cashbox-header-jobshift">
            <input type="date"/>
            <div className="cashbox-header-jobshift-time">
                <input type="time"/>
                <input type="time"/>
            </div>
          </div>
          <div className="cashbox-header-jobshift-closing">
            <button>Закрыть смену</button>
          </div>
      </div>
    )
  }
}