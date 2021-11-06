import React, { Component } from 'react';
import '../../assets/style.css'
import './auth.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeToken } from '../../store/actions'
import logo from '../../assets/icons/logo_large.png'
import authButton from '../../assets/icons/auth-button.svg'

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
      <div className="auth">
        <div className="container">
          <img src={logo} alt={"logo"} />
          <div className="auth-form">
            <form onSubmit={this.login}>
              <div className="flex-row ai-center">
                <div className="flex-column">
                  <input type="text" placeholder="Имя пользователя" value={this.state.username} onChange={this.handleChangeUsername} ></input>
                  <input type="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChangePassword}></input>
                </div>
                <button className="auth-button" onClick={(e) => this.login(e)}>
                  <img src={authButton} alt={"logo"} />
                </button>
              </div>
            </form>
            <div className="auth-description">
              <p>Инфа про то что это за платформа для чего она нужна если что звоните по номеру</p>
              <br/>
              <p>+79818655655</p>
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