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
  }

  componentDidMount() {
    console.log(this.props.adapter);
  }

  render() {
    return (
      <>
        <Header />
        <div className="page-wrapper">
          <CashboxHeader />
          <div className="mt_mb"></div>
          <div className="tables_wrapper">
            <MoneyAccounting/>
            <OnlineCashbox/>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default connect((state) => state)(Cashbox)