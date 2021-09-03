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
      activeShiftPage: false,
      activeWorkDay: false,
      shift_types: [],
      cashboxes: [],
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
      },
      shift_data: {
        work_time: 0,
        break_time: 0,
        current_action: null
      }
    }

    this.checking_fields = ['cash_end', 'cash_refund', 'cash_start', 'noncash_start', 'cashbox_fact', 'noncash_end', 'noncash_refund', 'sales']

    this.handleChangeData = this.handleChangeData.bind(this);
    this.closeShift = this.closeShift.bind(this);
    this.closeWorkingDay = this.closeWorkingDay.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openShift = this.openShift.bind(this);

    this.selected_shift = React.createRef();
    this.selected_cashbox = React.createRef();
  }

  componentDidMount() {
    this.checkShift()
    this.getShiftTypes()
    this.getCashboxes()
    this.getEmployees()
    this.getExpenseCategories()
  }

  checkShift() {
    this.props.adapter.checkShift()
      .then((result) => {
        this.setState({activeWorkDay: result.data.active_wd})
        if (result.data.active_shift) this.setState({activeShiftPage: true})
      })
  }

  openShift() {

    const selected_shift = this.selected_shift.current.value
    const selected_cashbox = this.selected_cashbox.current.value

    if (selected_shift == 0) {
      alert("Выберите пожалуйста тип смены")
      return
    }

    if (selected_cashbox == 0) {
      alert("Выберите пожалуйста кассу")
      return
    }

    let data = {}

    data['shift_type'] = selected_shift
    data['cashbox'] = selected_cashbox

    this.props.adapter.openShift(data)
      .then((result) => {
        if (result.data.success) {
          this.setState({
            activeShiftPage: true
          })
        }
      })
  }

  getShiftTypes() {
    this.props.adapter.getShiftTypes()
      .then((result) => {
        this.setState({
          shift_types: result.data,
          loading: false
        })
      })
  }

  getCashboxes() {
    this.props.adapter.getCashboxes()
      .then((result) => {
        this.setState({
          cashboxes: result.data,
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
    console.log(this.checking_fields);
    this.checking_fields.forEach(element => {
      let f = document.getElementsByName(element)[0]
      f.classList.remove("error_field")
    })
    this.props.adapter.activeShift("close", this.state.accounting)
      .then((result) => {
        if (!result.data.success) {
          this.setState(prevState => ({
            difference: {
              ...prevState.difference,
              cash: result.data.cash_difference,
              noncash: result.data.noncash_difference
            }
          }))

          this.openModal()
        } else {
          alert("Свобода!\nВаша смена закрыта")
          window.location.reload()
        }
      })
      .catch((error) => {
        if(typeof error.response.data.error_fields !== 'undefined') {
          let error_fields = error.response.data.error_fields
          for (const [key, value] of Object.entries(error_fields)) {
            let field = document.getElementsByName(key)[0]
            field.classList.add("error_field");
          }
        }
      })
  }

  closeWorkingDay() {
    this.props.adapter.closeWorkingDay(this.state.accounting)
      .then((result) => {
        if (result.data.success) {
          alert("Рабочий день был закрыт")
        }
        this.setState({
          activeWorkDay: false,
        })
      })
      .catch((error) => {
        alert(error.response.data.error_message)
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
    this.setState({ modalIsOpen: true })
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
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
      <div className='cashbox'>
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
          <small style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'grey' }}><b>Налом: </b>{this.state.difference.cash}</span>
            <span style={{ color: 'grey' }}><b>Картой: </b>{this.state.difference.noncash}</span>
          </small>
          <div className="mt_mb"></div>
          <textarea onChange={(event) => this.handleChangeData('difference_report', event.target.value)} />
          <div className="mt_mb"></div>
          <button onClick={this.closeModal}>Закрыть</button> <button onClick={this.closeShift}>Отправить</button>
        </Modal>
        <Header />
        {
          this.state.activeWorkDay ?
            <button onClick={this.closeWorkingDay}>Закрыть рабочий день</button>
            :
            <></>
        }
        {
          !this.state.activeShiftPage ?
            <div>
              <button onClick={this.openShift}>Открыть смену</button>
              <select style={{ color: 'grey' }} ref={this.selected_shift}>
                <option value="0">Выбор</option>
                {
                  this.state.shift_types.map((shift) => {
                    return <option key={shift.id} value={shift.id}>{shift.name}</option>
                  })
                }
              </select>
              <select style={{ color: 'grey' }} ref={this.selected_cashbox}>
                <option value="0">Выбор</option>
                {
                  this.state.cashboxes.map((cashbox) => {
                    return <option key={cashbox.id} value={cashbox.id}>{cashbox.name}</option>
                  })
                }
              </select>
            </div>
            :
            <div className="page-wrapper">
              <CashboxHeader
                closeShift={this.closeShift}
                handleChangeData={this.handleChangeData}
              />
              <div className="mt_mb"></div>

              {
                !this.state.loading ?
                  <>
                    <div className="tables_wrapper">
                      <MoneyAccounting
                        shift_types={this.state.shift_types}
                        employees={this.state.employees}
                        handleChangeData={this.handleChangeData}
                      />
                      <OnlineCashbox
                        shift_types={this.state.shift_types}
                        handleChangeData={this.handleChangeData}
                        difference={this.state.difference}
                      />
                    </div>
                    <div className="mt_mb"></div>
                    <div className="tables_wrapper">
                      <CostsTable
                        shift_types={this.state.shift_types}
                        expenseCategories={this.state.expenseCategories}
                      />
                    </div>
                  </>
                  :
                  <>
                  </>
              }
            </div>
        }
        <Footer />
      </div>
    )
  }
}

export default connect((state) => state)(Cashbox)