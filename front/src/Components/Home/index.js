import React, {useState, useEffect, useContext} from 'react'
import "./style.css"
import crown from "./../../assets/crown.png"
import { Link } from "react-router-dom"
import MdAdd from 'react-ionicons/lib/MdAdd'
import { MainContext } from "./../Context"
const axios = require("axios").default

function Home() {
    let {users, setUsers, loggedIn} = useContext(MainContext)
    const [loaded, setLoaded] = useState(false)
    const [sortedUsers, setSortedUsers] = useState([])
    const [fixUpdateBtn, setFixUpdateBtn] = useState({justifyContent: "flex-end"})

    useEffect(() => {
        if (users.length > 2) {
            setFixUpdateBtn({})
        }
    }, [users])

    useEffect(() => {
        if (loaded === false) {
            axios.get("/all-players").then(res => {
                setLoaded(true)
                setUsers(res.data.allPlayers)
            }).catch(err => {
                console.log("can't fetch all players:", err)
            })
        }
    })

    useEffect(() => {
        setSortedUsers(() => {
            function sortByPoints(a, b) {
                if (a.points > b.points) {
                    return -1;
                }
                if (a.points < b.points) {
                    return 1;
                }
                return 0;
            }

            function sortByGd(a, b) {
                if ((a.gf - a.ga) > (b.gf - b.ga)) {
                    return -1;
                }
                if ((a.gf - a.ga) < (b.gf - b.ga)) {
                    return 1;
                }
                return 0;
            }
            
            return users.slice().sort(sortByGd).sort(sortByPoints)
        })
    }, [users])

    return (
        <section className="Home">
            <div className="container">
                { !loaded ? (
                    ""
                ) : (
                    (users.length < 2) ? (
                        <h1 style={{textAlign: "center", fontSize: "42px"}}>No enogh data!</h1>
                    ) : (
                        <table className="table">
                            <thead className="table__haed">
                                <tr className="table__row table__row--head">
                                    <th className="table__title table__title--md"></th>
                                    <th className="table__title table__title--md"></th>
                                    <th title="Rank" className="table__title table__title--cursor table__item--rank table__item--black">#</th>
                                    <th className="table__title table__item--name table__item--black">Name</th>
                                    <th title="Played" className="table__title table__title--cursor">P</th>
                                    <th title="Won" className="table__title table__title--cursor">W</th>
                                    <th title="Draw" className="table__title table__title--cursor">D</th>
                                    <th title="Loss" className="table__title table__title--cursor">L</th>
                                    <th title="Goal For" className="table__title table__title--cursor">GF</th>
                                    <th title="Goal Against" className="table__title table__title--cursor">GA</th>
                                    <th title="Goal Difference" className="table__title table__title--cursor">GD</th>
                                    <th title="Points" className="table__title table__title--cursor">PT</th>
                                    {/* TBD */}
                                    {/* <th className="table__title">L5</th> */}
                                </tr>
                            </thead>
                            <tbody className="table__body">
                                {sortedUsers.map((item, index) => {
                                    const { _id, name, played, won, draw, loss, gf, ga, points} = item

                                    // TBD
                                    // let tableLastFive = last_f.map((item, index) => {
                                    //     item = String(item).toLocaleLowerCase()
                                    //     return <div key={index} className={`table__l5-value table__l5-value--${item}`}></div>
                                    // })

                                    return (
                                        <tr key={_id} className="table__row">
                                            <td className="table__title table__title--md"></td>
                                            <td className="table__title table__title--md"></td>
                                            <td className="table__item table__item--rank">
                                                {index === 0 ? <img src={crown} alt="Crown" /> : index + 1}
                                            </td>
                                            <td className="table__item table__item--name">{name}</td>
                                            <td className="table__item">{played}</td>
                                            <td className="table__item win">{won}</td>
                                            <td className="table__item draw">{draw}</td>
                                            <td className="table__item lose">{loss}</td>
                                            <td className="table__item">{gf}</td>
                                            <td className="table__item">{ga}</td>
                                            <td className="table__item">{gf - ga}</td>
                                            <td className="table__item">{points}</td>
                                            {/* TBD */}
                                            {/* <td className="table__item table__l5-wrapper">
                                                <div className="table__l5">
                                                    TBD
                                                    {tableLastFive.length < 5 ? "TBD" : tableLastFive}
                                                    TBD
                                                </div>
                                            </td> */}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )
                )}
            </div>

            <nav className="nav">
                <div className="container">
                    <div className="nav__list" style={fixUpdateBtn}>
                        {(users.length >= 2) &&
                            <Link to="/update" className="btn">
                                <MdAdd className="btn__icon" fontSize="16px" color="#ffffff" />
                                <span className="btn__text">Update</span>
                            </Link>
                        }
                        {loggedIn &&
                            <Link to="/add-player" className="btn">
                                <MdAdd className="btn__icon" fontSize="16px" color="#ffffff" />
                                <span className="btn__text">Add Player</span>
                            </Link>
                        }
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default Home
