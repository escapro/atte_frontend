import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cashbox from './pages/cashbox/cashbox'
import Auth from './pages/auth/auth'
import Accounting from './pages/accounting/accounting'
import { Component } from "react";
import cashboxSetup from "./pages/cashboxSetup/cashboxSetup";

export default class Routers extends Component{

    
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Cashbox} exact />
                    <Route path="/auth" component={Auth} exact />
                    <Route path="/accounting" component={Accounting} exact />
                    <Route path="/cashbox-setup" component={cashboxSetup} exact />
                </Switch>
            </BrowserRouter>
        )
    }
}