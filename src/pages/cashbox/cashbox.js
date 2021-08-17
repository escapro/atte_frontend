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
import Modal from 'react-modal';

Modal.setAppElement('#root')

class Cashbox extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      shifts: [],
      employees: [],
      expenseCategories: [],
      modalIsOpen: false,
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
        cash_refund: null,
        noncash_refund: null,
        date: null,
        difference_report: null
      },
      difference: {
        cash: 0,
        noncash: 0,
      }
    }

    this.handleChangeData = this.handleChangeData.bind(this);
    this.closeShift = this.closeShift.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
        if (!result.data.success) {
          this.setState(prevState => ({
            difference: {
              ...prevState.difference,
              cash: result.data.data.cash_difference,
              noncash: result.data.data.noncash_difference
            }
          }))

          this.openModal()
        }else {
          alert("Свобода!\nВаша смена закрыта")
          this.logout()
        }
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

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  logout() {
    this.props.adapter.logout()
    .then((result) => {
        localStorage.setItem('token', '')
        window.location.pathname = '/auth'
    })
    .catch((result) => {

    })
}

  render() {
    return (
      <>
          <Modal
            isOpen={this.state.modalIsOpen}
            contentLabel="Example Modal"
            style={{
              content: {
                width: 200,
                height: 200,
                transform: 'translate(-50%, -20%)',
                top: '20%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
              }
            }}
          >
            <h3>Откуда разница?</h3>
            <small style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{ color: 'grey' }}><b>Налом: </b>{this.state.difference.cash}</span>
              <span style={{ color: 'grey' }}><b>Картой: </b>{this.state.difference.noncash}</span>
            </small>
            <div className="mt_mb"></div>
            <textarea onChange={(event) => this.handleChangeData('difference_report', event.target.value)} />
            <div className="mt_mb"></div>
            <button onClick={this.closeModal}>Закрыть</button> <button onClick={this.closeShift}>Отправить</button>
          </Modal>
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
                    difference={this.state.difference}
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