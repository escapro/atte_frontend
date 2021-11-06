import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import '../../assets/style.css'
import '../accounting/accounting.css'
import AccountingTable from './components/acountingTable'
import Summary from './components/summary';
import AdditionalExpenses from './components/additionalExpenses';
import AccoutingHeader from './components/accoutingHeader';

class Accounting extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            detail: [],
            headers: {},
            summary: {},
            expenses: {},
            options: {},
            url_params: {},
            accoutingHeaderLoading: true
        }
    }

    componentDidMount() {
        // this.setState({
        //     url_params: {
        //         to_date: moment(new Date().setDate(1)).format('YYYY-MM-DD'),
        //     }
        // })

        this.updateAccountingData()
    }

    updateAccountingData(params = this.state.url_params) {
        this.props.adapter.getAccounting(params)
            .then((result) => {
                this.setState({
                    detail: result.data.detail,
                    headers: result.data.headers,
                    summary: result.data.summary,
                    expenses: result.data.expenses,
                    options: result.data.options,
                    loading: false,
                    accoutingHeaderLoading: false
                })
            })
            // .catch((result) => {
            //     if (result.response.data.error != undefined) {
            //         this.setState({
            //             accoutingHeaderLoading: false,
            //         })
            //         alert(result.response.data.error)
            //     }
            // })
    }

    onUrlParamsChange(field, value, update = false) {
        this.setState(prevState => ({
            url_params: {
                ...prevState.url_params,
                [field]: value
            }
        }), () => {
            if (update) this.updateAccountingData()
        })
    }

    getUrlParams() {
        return this.state.url_params
    }

    render() {
        return (
            <div className="accouting">
                <Header></Header>
                {!this.state.accoutingHeaderLoading ?
                    <AccoutingHeader
                        pagination={this.state.options.pagination}
                        onUrlParamsChange={(field, value, update) => this.onUrlParamsChange(field, value, update)}
                        getUrlParams={() => this.getUrlParams()}
                        updateAccountingData={() => this.updateAccountingData()}
                    />
                    : null}
                {!this.state.loading ?
                    <div className="mh-20">
                        <AccountingTable
                            detail={this.state.detail}
                            headers={this.state.headers}
                        />
                    </div>
                    : null}
                <div style={{ display: 'flex' }}>
                    {!this.state.loading ?
                        <div className="mh-20">
                            <Summary
                                summary={this.state.summary}
                                expenses={this.state.expenses}
                            />
                        </div>
                        : null}
                    {!this.state.loading ?
                        <div className="mh-20">
                            <AdditionalExpenses
                                expenses={this.state.expenses}
                                updateAccountingData={() => this.updateAccountingData()}
                            />
                        </div>
                        : null}
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default connect((state) => state)(Accounting)