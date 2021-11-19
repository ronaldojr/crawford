import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './header.css'

function Header(props) {

    const regularMenu = [
        <li key='1'><Link to="/login"> Login </Link></li>,
    ]

    const loggedInMenu = [
        <li key='1'><Link to="/"> Stories </Link></li>,
        <li key='2'><Link to="/"> Categories </Link></li>,
        <li key='3'><Link to="/"> Users </Link></li>,
        <li key='4'><Link to="/"> Logout </Link></li>,
    ]

    const [active, setActive] = useState(false);

    function openMenu(e) {
        if (active) 
            setActive(false)
        else
            setActive(true)
    }

    function createMenu() {
        if (props.logged_in) {
            return loggedInMenu
        } 
        return regularMenu
    }



    return (
        <header>
            <div className="brand">
                <h1 className="header-title">John's Stories</h1>
            </div>
            <nav className="nav" role="navigation" onClick={openMenu}>
                <div id="menu-bars">
                    <span className={ active ? "menu-bar active" : "menu-bar" }></span>
                    <span className={ active ? "menu-bar active" : "menu-bar" }></span>
                    <span className={ active ? "menu-bar active" : "menu-bar" }></span>
                </div>
                <ul className={ active ? "active" : "" }>
                    <li><Link to="/"> Home </Link></li>
                    <li><Link to="/about"> About </Link></li>
                   {createMenu()}
                </ul>
            </nav>        
      </header>
    )

}

export default Header