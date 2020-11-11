import React from 'react'
import "./style.css"
import {Link} from "react-router-dom"
import logo from "./../../assets/logo.png"
import MdKey from 'react-ionicons/lib/MdKey'

function Navbar() {
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
                            <Link to="/login" className="btn">
                                <MdKey className="btn__icon" fontSize="16px" color="#ffffff"/>
                                <span className="btn__text">
                                    Login
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
