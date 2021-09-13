import React, { Component } from 'react';
import { connect } from 'react-redux';
import profileImg from '../../assets/icons/profile.png'
import settingsImg from '../../assets/icons/settings.png'
import './header.css'

class Header extends Component {

    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this)
    }

    logout() {
        this.props.adapter.logout()
        .then((result) => {
            localStorage.setItem('token', '')
            window.location.pathname = '/auth'
        })
        .catch((result) => {

        })
    }

    render() {
        return (
            <div className="header">
                <div className="logo">
                    <h1>atte</h1>
                    <h3>{this.props.client.name}</h3>
                    <span>{this.props.user.role}</span>
                </div>
                <div className="header-menu">
                    <div onClick={() => window.location = '/'} className="header-menu-item">Касса</div>
                    <div className="header-menu-item">График</div>
                    <div onClick={() => window.location = '/accounting'} className="header-menu-item">Отчетность</div>
                    <div onClick={() => window.location = '/cashbox-setup'} className="header-menu-item">Настройка кассы</div>
                </div>
                <div className='header-rightMenu'>
                    <div className='header-rightMenu-item' onClick={this.logout}>
                        <span>{this.props.user.username}</span>
                        <img src={profileImg} alt={"logo"} />
                    </div>
                    <div className='header-rightMenu-item'>
                        <img src={settingsImg} alt={"logo"} />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(Header)