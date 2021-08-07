import React, { Component } from 'react';
import '../../assets/style.css'
import './auth.css'
import axios from 'axios';

export default class App extends Component {

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
    this.setState({username: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  login(event) {
    event.preventDefault();

    axios
    .post('http://127.0.0.1:8000/token/', {'username': this.state.username, 'password': this.state.password})
    .then(respone => {
      localStorage.setItem('token', respone.data.access);
      this.props.history.push('/')
    })
    .catch(err => {console.error(err)})
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