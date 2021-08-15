import React, { Component } from 'react';
import '../../assets/style.css'
import './cashbox.css'
import { connect } from 'react-redux';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import CashboxHeader from './components/cashboxHeader'
import MoneyAccounting from './components/moneyAccounting'
import OnlineCashbox from './components/onlineCashbox';
import CostsTable from './components/expensesTable';

class Cashbox extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      shifts: [],
      employees: [],
      expenseCategories: [],
      accounting: {
        shift_start_time: null,
        shift_end_time: null,
        shift_type: null,
        employee: null,
        cash_start: null,
        cash_end: null,
        noncash_start: null,
        noncash_end: null,
        sales: null,
        cashbox_fact: null,
        refund: null,
        date: null,
      }
    }

    this.handleChangeData = this.handleChangeData.bind(this);
    this.closeShift = this.closeShift.bind(this);
  }

  componentDidMount() {

    this.getShifts()
    this.getEmployees()
    this.getExpenseCategories()
  }

  getShifts() {
    this.props.adapter.getShiftTypes()
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

  getExpenseCategories() {
    this.props.adapter.getExpenseCategories()
      .then((result) => {
        this.setState({
          expenseCategories: result.data,
          loading: false
        })
      })
  }

  closeShift() {
    this.props.adapter.closeShift(this.state.accounting)
      .then((result) => {
        console.log(result);
      })
  }

  handleChangeData(key, value) {
    this.setState(prevState => ({
      accounting: {
        ...prevState.accounting,
        [key]: value
      }
    }))
  }

  render() {
    return (
      <>
        <Header />
        <div className="page-wrapper">
          <CashboxHeader
            closeShift={this.closeShift}
            handleChangeData={this.handleChangeData}
          />
          <div className="mt_mb"></div>

          {
            !this.state.loading && this.state.shifts.length > 0
              && this.state.employees.length > 0 ?
              <>
                <div className="tables_wrapper">
                  <MoneyAccounting
                    shifts={this.state.shifts}
                    employees={this.state.employees}
                    handleChangeData={this.handleChangeData}
                  />
                  <OnlineCashbox
                    shifts={this.state.shifts}
                    handleChangeData={this.handleChangeData}
                  />
                </div>
                <div className="mt_mb"></div>
                <div className="tables_wrapper">
                  <CostsTable
                    shifts={this.state.shifts}
                    expenseCategories={this.state.expenseCategories}
                  />
                </div>
              </>
              :
              <>
              </>
          }
        </div>
        <Footer />
      </>
    )
  }
}

export default connect((state) => state)(Cashbox)