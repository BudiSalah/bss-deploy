import React, { useState } from 'react'
import "./style.css"
import MdUnlock from 'react-ionicons/lib/MdUnlock'

function Login() {
    let [username, setUsername] = useState("")
    let [pass, setPass] = useState("")

    function loginForm(e) {
        let target = e.target
        if (e.target.id === "username") {
            setUsername(target.value)
        } else {
            setPass(target.value)
        }
    }

    function clearInputs() {
        setUsername("")
        setPass("")
    }

    function submitLogin(e) {
        e.preventDefault()
        console.log("username:", username)
        console.log("pass:", pass)
        clearInputs()
    }

    return (
        <div className="Login">
            <div className="container container--sign-form">
                <form className="form form--sign" onSubmit={submitLogin}>
                    <div className="fieldset">
                        <label htmlFor="username" className="fieldset__label">Username</label>
                        <input type="text" id="username" className="fieldset__input" value={username} onChange={loginForm} />
                    </div>
                    <div className="fieldset">
                        <label htmlFor="password" className="fieldset__label">Password</label>
                        <input type="password" id="password" className="fieldset__input" value={pass} onChange={loginForm} />
                    </div>
                    <div className="fieldset">
                        <button className="btn btn--text-center fieldset__input">
                            <MdUnlock className="btn__icon" fontSize="16px" color="#ffffff" />
                            <span className="btn__text">Login</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
