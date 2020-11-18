import React, {useState, useEffect} from "react"
import "./style.css"
import {useParams} from "react-router-dom"
const axios = require("axios").default

function Matches() {
    const [matches, setMatches] = useState([])
    const [playerName, setPlayerName] = useState("")
    const {id} = useParams()

    useEffect(() => {
        axios.get(`/matches/${id}`).then(res => {
            if (res.data.matches[0].playerOne.id === id) {
                setPlayerName(res.data.matches[0].playerOne.name)
            } else {
                setPlayerName(res.data.matches[0].playerTwo.name)
            }
            setMatches(res.data.matches)
        }).catch(e => {
            alert("can't fetch matches!")
        })
    }, [id, setMatches, setPlayerName])

    return (
        <section className="Matches">
            <div className="container">
                <div className="headline">
                    <h1 className="headline__text">{playerName}</h1>
                </div>

                {matches.length > 0 &&
                    <ul className="matches__list">
                        {matches.map(item => {
                            const {_id, playerOne, playerTwo} = item

                            return (
                                <li key={_id} id={_id} className="matches__item">
                                    <div className={`matches__firstplayer matches__firstplayer--single ${playerOne.game_status}`}>{playerOne.name}</div>
                                    <div className={`matches__result ${playerOne.id === id ? playerOne.game_status : playerTwo.game_status}`}>{playerOne.gf} - {playerTwo.gf}</div>
                                    <div className={`matches__secondplayer matches__secondplayer--single ${playerTwo.game_status}`}>{playerTwo.name}</div>
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