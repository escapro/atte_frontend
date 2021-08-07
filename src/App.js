import React, { Component } from 'react';
import { Router , Route, Switch, BrowserRouter } from "react-router-dom";
import './assets/style.css';
import Auth from './pages/auth/auth'
import Cashbox from './pages/cashbox/cashbox'

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLogin: false
    }
  }

  qwe() {
    alert("asdsa")
  }

  render() {
    return (
      <div className="App">
        <div className="main">
          <BrowserRouter>
          <div className="root">
            <Switch>
              <Route path="/" component={Cashbox} exact />
              <Route path="/auth" component={Auth} exact />
            </Switch>

          </div>
        </BrowserRouter >
           <div style={{width: 500}}>
            {/* <Auth/> */}
           </div>
          {/* <Cashbox/> */}
        </div>
      </div>
    )
  }
}