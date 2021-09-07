import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import '../../assets/style.css'
import '../accounting/accounting.css'
import AccountingTable from './components/acountingTable';

class Accounting extends Component {

    constructor(props) {
        super(props)

        this.state = {
            detail: [],
            headers: []
        }
    }

    componentDidMount() {
        this.getAccounting()
    }

    getAccounting() {
        this.props.adapter.getAccounting()
            .then((result) => {
                this.setState({
                    detail: result.data.detail,
                    headers: result.data.headers
                })
            })
    }

    render() {
        return (
            <div className="accouting">
                <Header></Header>
                {   
                    this.state.detail.length > 0 ?
                        // <AccountingTable
                        //     data={this.state.accountingData}
                        //     headers={this.state.headers}
                        // />
                        <AccountingTable
                        detail={this.state.detail}
                            headers={this.state.headers}
                        />
                        : null
                }
                <Footer></Footer>
            </div>
        )
    }
}

export default connect((state) => state)(Accounting)