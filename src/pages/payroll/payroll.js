import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import '../../assets/style.css'
import './payroll.css'
import PayrollHeader from './components/payrollHeader';
import PayrollTable from './components/PayrollTable'
import PaidSalariesTable from './components/paidSalariesTable';

class Payroll extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="cashbox_setup">
                <Header />
                <div>
                    <PayrollHeader/>
                    <PayrollTable/>
                    <br/>
                    <PaidSalariesTable/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect((state) => state)(Payroll)