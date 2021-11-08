import React, { Component } from 'react';
import '../../assets/style.css'
import './auth.scss'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeToken } from '../../store/actions'
import logo from '../../assets/icons/logo_large.png'
import authButton from '../../assets/icons/auth-button.svg'
import rightBackground from '../../assets/images/auth_page_gradient.png'

class Auth extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.login = this.login.bind(this);

  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  login(event) {
    event.preventDefault();

    this.props.adapter.getToken(this.state.username, this.state.password)
      .then(response => {
        this.props.changeToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        window.location.pathname = '/'
      })
      .catch(error => {
        alert("Неправильный логин или пароль")
      })
  }

  render() {
    return (
      <div className="auth-page">
        <div className="right-background ">
          {/* <img src={rightBackground} alt={"rightBackground"} /> */}
        </div>
        <div className="wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-12 auth-left">
                <div className="logo">
                  <img className="col-7 col-sm-6 col-md-4 col-lg-9 col-xl-6" src={logo} alt={"logo"} />
                </div>
                <div className="auth-form">
                  <form className="d-flex flex-sm-row" onSubmit={this.login}>
                    <div className="d-flex flex-column inputs-block">
                      <input type="text" placeholder="Введите логин" value={this.state.username} onChange={this.handleChangeUsername} ></input>
                      <input type="password" placeholder="Введите пароль" value={this.state.password} onChange={this.handleChangePassword}></input>
                    </div>
                    <button className="auth-button" onClick={(e) => this.login(e)}>
                      <img src={authButton} alt={"logo"} />
                    </button>
                  </form>
                  <div className="auth-description col-xl-8 col-lg-12 col-md-7 col-sm-8 col-12">
                    <p>Инфа про то что это за платформа для чего она нужна если что звоните по номеру</p>
                    <br />
                    <p className="text-decoration-underline">+79818655655</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const putActionsToProps = (dispatch) => {
  return {
    changeToken: bindActionCreators(changeToken, dispatch),
  }
}

export default connect((state) => state, putActionsToProps)(Auth)