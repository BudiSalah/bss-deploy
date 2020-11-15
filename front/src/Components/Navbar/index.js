import React, {useContext} from 'react'
import "./style.css"
import {Link} from "react-router-dom"
import logo from "./../../assets/logo.png"
import MdKey from 'react-ionicons/lib/MdKey'
import MdUnlock from 'react-ionicons/lib/MdUnlock'
import IosClipboard from 'react-ionicons/lib/IosClipboard'
import {MainContext} from "./../Context"
const axios = require("axios").default

function Navbar() {
    let {loggedIn, setLoggedIn} = useContext(MainContext)

    function logout() {
        axios.get("/logout").then(res => {
            setLoggedIn(false)
        }).catch(err => {
            console.log("Logout error:", err)
        })
    }
    
    return (
        <header className="header">
            <div className="container header__container">
                <div className="logo" title="Budi, Sharkawy, Samir">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo__img"/>
                    </Link>
                </div>
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item">
                            {loggedIn ? (
                                <Link to="/login" className="btn" onClick={logout}>
                                    <MdUnlock className="btn__icon" fontSize="16px" color="#ffffff"/>
                                    <span className="btn__text">
                                        Logout
                                    </span>
                                </Link>
                            ) : (
                                <div className="logins__wrapper">
                                    <Link to="/login" className="btn">
                                        <MdKey className="btn__icon" fontSize="16px" color="#ffffff"/>
                                        <span className="btn__text">
                                            Login
                                        </span>
                                    </Link>
                                    
                                    <Link to="/signup" className="btn">
                                        <IosClipboard className="btn__icon" fontSize="16px" color="#ffffff"/>
                                        <span className="btn__text">
                                            Signup
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
