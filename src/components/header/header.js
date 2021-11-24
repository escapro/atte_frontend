import React, { Component } from 'react';
import { connect } from 'react-redux';
import profileImg from '../../assets/icons/profile.svg'
import settingsImg from '../../assets/icons/settings.svg'
import logo from '../../assets/icons/logo_main.png'
import './header.scss'
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

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

    rightMenu(className) {
        return (
            <div className={'header-rightMenu d-flex justify-content-end align-items-center col-6 col-xl-2 ' + className}>
                <div className='header-rightMenu-item' onClick={this.logout}>
                    {/* <span>{this.props.user.username}</span> */}
                    <img src={profileImg} alt={"logo"} />
                </div>
                <div className='header-rightMenu-item'>
                    <img src={settingsImg} alt={"logo"} />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="header-component">
                <div className="container">
                    <div className="row">
                        <div className="logo col-6 col-xl-2">
                            <img onClick={() => window.location = '/'} src={logo} alt={"logo"} />
                            {/* <h3>{this.props.client.name}</h3>
                            <span>{this.props.user.role}</span> */}
                        </div>
                        {this.rightMenu('d-xl-none')}
                        <div className="header-menu col-12 col-xl-8 d-flex justify-content-xl-center align-items-center overflow-auto mt-lx-2">
                            {
                                this.props.user.role == "employee"
                                    ?
                                    <>
                                        <div onClick={() => window.location = '/'} className={"header-menu-item " + (history.location.pathname == "/" ? 'active' : '')}>Касса</div>
                                        <div onClick={() => window.location = '/schedule'} className={"header-menu-item " + (history.location.pathname == "/schedule" ? 'active' : '')}>График</div>
                                    </>
                                    : ''
                            }
                            {
                                this.props.user.role == "manager"
                                    ?
                                    <>
                                        <div onClick={() => window.location = '/payroll'} className={"header-menu-item " + (history.location.pathname == "/payroll" ? 'active' : '')}>Расчёт ЗП</div>
                                        <div onClick={() => window.location = '/'} className={"header-menu-item " + (history.location.pathname == "/" ? 'active' : '')}>Отчетность</div>
                                        <div onClick={() => window.location = '/cashbox-setup'} className={"header-menu-item " + (history.location.pathname == "/cashbox-setup" ? 'active' : '')}>Настройка кассы</div>
                                    </>
                                    : ''
                            }
                        </div>
                        {this.rightMenu('d-none d-xl-flex')}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => state)(Header)