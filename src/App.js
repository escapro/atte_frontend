import React, { Component } from 'react';
import './assets/style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routers from './routers';
import { changeUserdata, changeClient, setAdapter } from './store/actions';
import { Adapter } from './adapters/api'

const API = new Adapter()

class App extends Component {

  constructor(props) {
    super(props)

    this.allRouterPaths = [
      '/',
      '/auth'
    ]

    this.state = {
      isLogin: false
    }

    if (!this.allRouterPaths.includes(window.location.pathname)) window.location.href = '/'

  }

  async getProfile() {
   
    if (localStorage.getItem('token')) {
      await API.getProfile()
        .then(response => {
          this.props.changeUserdata(response.data)
          this.setState({isLogin: true})
        })
        .catch(() => {
          localStorage.setItem('token', '')
          window.location = '/auth'
        })
    }else {
      window.location = '/auth'
    }
  }

  getClient() {
    if(this.state.isLogin) {
      API.getClient()
        .then(response => {
          this.props.changeClient(response.data)
        })
        .catch(() => {
         
        })
    }
  }

  componentDidMount() {

    this.props.setAdapter(API)

    const domen = window.location.hostname
    const subdomain = domen.split('.')[0]

    API.subdomain = subdomain
    API.token = this.props.token

    if (window.location.pathname == '/auth') return

    this.getProfile()
    .then(() => {
      API.user = this.props.user
      this.getClient()
    })

  }

  render() {

    return (
      <div className="App">
        <div className="main">
          <div className="root"><Routers /></div>
        </div>
      </div>
    )
  }
}

const putActionsToProps = (dispatch) => {
  return {
    changeUserdata: bindActionCreators(changeUserdata, dispatch),
    changeClient: bindActionCreators(changeClient, dispatch),
    setAdapter: bindActionCreators(setAdapter, dispatch),
  }
}

export default connect((state) => state, putActionsToProps)(App)