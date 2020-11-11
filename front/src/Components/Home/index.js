import React from 'react'
import "./style.css"
import crown from "./../../assets/crown.png"
import {Link} from "react-router-dom"
import MdAdd from 'react-ionicons/lib/MdAdd'
import {MainContext} from "./../Context"

function Home() {
    function compare(a, b) {
        if ( a.points > b.points ){
            return -1;
        }
        if ( a.points < b.points ){
            return 1;
        }
        return 0;
    }

    return (
        <MainContext.Consumer>
            {value => {
                let {users} = value
                users = users.sort(compare)

                return (
                    <section className="Home">
                        <div className="container">
                            <table className="table">
                                <thead className="table__haed">
                                    <tr className="table__row table__row--head">
                                        <th className="table__title table__title--md"></th>
                                        <th className="table__title table__title--md"></th>
                                        <th className="table__title table__item--rank table__item--black">#</th>
                                        <th className="table__title table__item--name table__item--black">Name</th>
                                        <th className="table__title">P</th>
                                        <th className="table__title">W</th>
                                        <th className="table__title">D</th>
                                        <th className="table__title">L</th>
                                        <th className="table__title">GF</th>
                                        <th className="table__title">GA</th>
                                        <th className="table__title">GD</th>
                                        <th className="table__title">PT</th>
                                        <th className="table__title">L5</th>
                                    </tr>
                                </thead>
                                <tbody className="table__body">
                                    {users.map((item, index) => {
                                        const {id, name, played, win, draw, lose, gf, ga, points, lastFive} = item
                                        
                                        let tableLastFive = lastFive.map((item, index) => {
                                            item = String(item).toLocaleLowerCase()
                                            return <div key={index} className={`table__l5-value table__l5-value--${item}`}></div>
                                        })
                                        
                                        return (
                                            <tr key={id} className="table__row">
                                                <td className="table__title table__title--md"></td>
                                                <td className="table__title table__title--md"></td>
                                                <td className="table__item table__item--rank">
                                                    {index === 0 ? <img src={crown} alt="Crown"/> : index + 1}
                                                </td>
                                                <td className="table__item table__item--name">{name}</td>
                                                <td className="table__item">{played}</td>
                                                <td className="table__item win">{win}</td>
                                                <td className="table__item draw">{draw}</td>
                                                <td className="table__item lose">{lose}</td>
                                                <td className="table__item">{gf}</td>
                                                <td className="table__item">{ga}</td>
                                                <td className="table__item">{gf - ga}</td>
                                                <td className="table__item">{points}</td>
                                                <td className="table__item table__l5-wrapper">
                                                    <div className="table__l5">
                                                        {tableLastFive}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <nav className="nav">
                            <div className="container">
                                <div className="nav__list">
                                    <Link to="/update" className="btn">
                                        <MdAdd className="btn__icon" fontSize="16px" color="#ffffff"/>
                                        <span className="btn__text">Update</span>
                                    </Link>
                                    <Link to="/add-player" className="btn">
                                        <MdAdd className="btn__icon" fontSize="16px" color="#ffffff"/>
                                        <span className="btn__text">Add Player</span>
                                    </Link>
                                </div>
                            </div>
                        </nav>
                    </section>
                )
            }}
        </MainContext.Consumer>
    )
}

export default Home
