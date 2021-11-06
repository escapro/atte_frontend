import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
// import './assets/style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routers from './routers';
import { changeUserdata, changeClient, setAdapter } from './store/actions';
import Adapter from './api'

const API = new Adapter()

class App extends Component {

  constructor(props) {
    super(props)

    this.allRouterPaths = [
      '/',
      '/auth',
      '/accounting',
      '/cashbox-setup',
      '/payroll'
    ]

    if (!this.allRouterPaths.includes(window.location.pathname)) window.location.href = '/'

    this.state = {
      isLogin: false,
      loading: true
    }

    props.setAdapter(API)

    const domen = window.location.hostname
    const subdomain = domen.split('.')[0]

    API.subdomain = subdomain
    API.token = props.token
  }

  async getProfile() {

    if (localStorage.getItem('token')) {
      return await API.getProfile()
        .then(response => {
          this.props.changeUserdata(response.data)
          this.setState({ isLogin: true })
        })
        .catch(() => {
          localStorage.setItem('token', '')
          window.location = '/auth'
        })
    } else {
      window.location = '/auth'
    }
  }

  getClient() {
    if (this.state.isLogin) {
      API.client('get')
        .then(response => {
          this.props.changeClient(response.data)
          this.setState({loading: false})
        })
        .catch(() => {

        })
    }
  }

  componentDidMount() {

    if (window.location.pathname == '/auth') {
      this.setState({
        loading: false
      })
      return
    }

    this.getProfile()
      .then(() => {
        API.user = this.props.user
        this.getClient()
      })

  }

  render() {

    return (
      <div className="App">
        {
          this.state.loading ?
            <Loader
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
            />
            :
            <div className="main">
              <div className="root"><Routers /></div>
            </div>
        }
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