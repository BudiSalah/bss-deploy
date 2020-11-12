import React from 'react'
import "./style.css"
import png404 from "./../../assets/404-sailor.png"
import {Link} from "react-router-dom"

function Page404() {
    return (
        <div className="container">
            <div className="fof">
                <div className="fof__col">
                    <img className="fof__img" src={png404} alt="404 Illustrator" />
                </div>
            
                <div className="fof__col">
                    <h1 className="fof__title">404</h1>
                    <p className="fof__text">Page not found!</p>

                    <div className="fof__row">
                        <Link className="btn" to="/">Home</Link>
                        <Link className="btn" to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page404
