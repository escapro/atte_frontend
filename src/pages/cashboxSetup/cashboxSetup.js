import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/style.css'
import './cashboxSetup.css'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import ShiftTypes from './components/shiftTypes';
import EmployeeBonuses from './components/employeeBonuses';
import Employee from './components/employees';
import PermissibleCashDifference from './components/permissibleCashDifference';
import ExpenseCategories from './components/expenseCategories';

class CashboxSetup extends Component {

    constructor(props) {
        super(props)

        this.state = {
            shiftTypes: []
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="cashbox_setup">
                <Header />
                <div>
                    <ShiftTypes />
                    <EmployeeBonuses/>
                    <Employee/>
                    <PermissibleCashDifference/>
                    <ExpenseCategories/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect((state) => state)(CashboxSetup)