import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cashbox from './pages/cashbox/cashbox'
import Auth from './pages/auth/auth'
import Accounting from './pages/accounting/accounting'
import { Component } from "react";
import cashboxSetup from "./pages/cashboxSetup/cashboxSetup";
import { connect } from 'react-redux';
import Payroll from "./pages/payroll/payroll";

class Routers extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props);
        return (
            <BrowserRouter>
                <Switch>
                    {
                        this.props.user != ""
                        ?
                        this.props.user.role == "employee"
                            ?
                            <Route path="/" component={Cashbox} exact />
                            :
                           <>
                                <Route path="/payroll" component={Payroll} exact />
                                <Route path="/" component={Accounting} exact />
                                <Route path="/cashbox-setup" component={cashboxSetup} exact />
                           </>
                        :
                        ''
                    }
                    <Route path="/auth" component={Auth} exact />
                    {/* <Route path="/accounting" component={Accounting} exact /> */}
                    {/* <Route path="/cashbox-setup" component={cashboxSetup} exact /> */}
                </Switch>
            </BrowserRouter>
        )
    }
}

export default connect((state) => state)(Routers)