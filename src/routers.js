import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cashbox from './pages/cashbox/cashbox'
import Auth from './pages/auth/auth'
import { Component } from "react";

export default class Routers extends Component{

    
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Cashbox} exact />
                    <Route path="/auth" component={Auth} exact />
                </Switch>
            </BrowserRouter>
        )
    }
}