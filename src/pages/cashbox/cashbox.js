import React, { Component } from 'react';
import '../../assets/style.css'
import './cashbox.css'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import CashboxHeader from './cashbox-header'

export default class Cashbox extends Component {
  render() {
    return (
      <>
        <Header/>
        <div className="page-wrapper">
          <CashboxHeader/>
          <div className="mt_mb"></div>
          <div className="table">
            <div className="table-header">
              <span className="table-title">Учет денег</span>
            </div>
            <div className="table-column-header">
              <div className="table-column-header-item">
                <span>Смена</span>
              </div>
              <div className="table-column-header-item">
                <span>Сотрудник</span>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </>
    )
  }
}