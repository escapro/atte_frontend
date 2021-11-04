import React, { Component } from 'react';
import '../../assets/style.css'
import './auth.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeToken } from '../../store/actions'

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
        <h1>Вход в систему</h1>
        <div className="auth-form">
          <form onSubmit={this.login}>
            <input type="text" placeholder="Имя пользователя" value={this.state.username} onChange={this.handleChangeUsername} ></input>
            <input type="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChangePassword}></input>
            <input type="submit"></input>
          </form>
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