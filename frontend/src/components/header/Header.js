import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom'
import './header.css'
import {AppContext} from '../../pages/app/App'

function Header(props) {
    
    const [active, setActive] = useState(false);
    const app = useContext(AppContext)

    const regularMenu = [
        <li key='1'><Link to="/login"> Login </Link></li>,
    ]

    const loggedInMenu = [
        <li key='1'><Link to="/admin"> Admin </Link></li>,
        <li key='4'><Link to onClick={logOut}> Logout </Link></li>,
    ]

    function logOut() {
        localStorage.setItem("loggedIn", false)
        app.setLoggedIn(false)
    }

    function openMenu(e) {
        if (active) 
            setActive(false)
        else
            setActive(true)
    }

    function createMenu() {
        if (app.loggedIn) {
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