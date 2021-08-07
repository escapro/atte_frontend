import React, { Component } from 'react';
import profileImg from '../../assets/icons/profile.png'
import settingsImg from '../../assets/icons/settings.png'
import './header.css'

export default class Header extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="header">
                <div className="logo">
                    <h1>atte</h1>
                </div>
                <div className="header-menu">
                    <div className="header-menu-item">Касса</div>
                    <div className="header-menu-item">График</div>
                </div>
                <div className='header-rightMenu'>
                    <div className='header-rightMenu-item'>
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