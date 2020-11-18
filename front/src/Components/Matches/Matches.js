import React, {useState, useEffect} from "react"
import "./style.css"
const axios = require("axios").default

function Matches() {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        axios.get("/matches").then(res => {
            setMatches(res.data.matches)
        }).catch(e => {
            alert("can't fetch matches!")
        })
    }, [setMatches])

    return (
        <section className="Matches">
            <div className="container">
                <div className="headline">
                    <h1 className="headline__text">Recent Matches</h1>
                </div>

                {matches.length > 0 &&
                    <ul className="matches__list">
                        {matches.map(item => {
                            const {_id, playerOne, playerTwo} = item
                            return (
                                <li key={_id} id={_id} className="matches__item">
                                    <div className={`matches__firstplayer ${playerOne.game_status}`}>{playerOne.name}</div>
                                    <div className="matches__result">{playerOne.gf} - {playerTwo.gf}</div>
                                    <div className={`matches__secondplayer ${playerTwo.game_status}`}>{playerTwo.name}</div>
                                </li>
                            )
                        })}
                    </ul>
                }
            </div>
        </section>
    )
}

export default Matches