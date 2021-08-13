import React, { Component } from 'react';
import '../../assets/style.css'
import './cashbox.css'
import { connect } from 'react-redux';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import CashboxHeader from './components/cashboxHeader'
import MoneyAccounting from './components/moneyAccounting'
import OnlineCashbox from './components/onlineCashbox';

class Cashbox extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      shifts: [],
      employees: []
    }
  }

  componentDidMount() {

    this.getShifts()
    this.getEmployees()
  }

  getShifts() {
    this.props.adapter.getShifts()
      .then((result) => {
        this.setState({
          shifts: result.data,
          loading: false
        })
      })
  }

  getEmployees() {
    this.props.adapter.getEmployees()
      .then((result) => {
        this.setState({
          employees: result.data,
          loading: false
        })
      })
  }

  render() {
    return (
      <>
        <Header />
        <div className="page-wrapper">
          <CashboxHeader />
          <div className="mt_mb"></div>
          <div className="tables_wrapper">
            {
              !this.state.loading && this.state.shifts.length > 0 && this.state.employees.length > 0 ?
                <>
                  <MoneyAccounting
                    shifts={this.state.shifts}
                    employees={this.state.employees}
                  />
                  <OnlineCashbox
                    shifts={this.state.shifts}
                  />
                </>
                :
                <>
                </>
            }
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default connect((state) => state)(Cashbox)