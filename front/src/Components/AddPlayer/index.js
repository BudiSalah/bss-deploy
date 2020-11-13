import React, {useState, useEffect, useContext} from 'react'
import "./style.css"
import MdAdd from 'react-ionicons/lib/MdAdd'
import {MainContext} from "./../Context"
import Notification from "./../Feedback/Notification"
const axios = require("axios").default

function AddPlayer() {
    let {credential} = useContext(MainContext)
    let [newPlayer, setNewPlayer] = useState("")
    let [showNoti, setShowNoti] = useState([false, {mesg: "", status: ""}])

    function clearInputs() {
        setNewPlayer("")
    }

    function submitNewPlayer(e) {
        e.preventDefault()
        axios.post("/add-player", {
            league_id: credential.leauge,
            name: newPlayer
        }).then(res => {
            clearInputs()
            setShowNoti([true, {mesg: `${newPlayer} has added!`, status: "success"}])
        }).catch(err => {
            setShowNoti([true, {mesg: "Player exists. Try new name!", status: "faild"}])
        })
    }

    useEffect(() => {
        if (showNoti[0] === true) {
            setTimeout(() => setShowNoti([false]), 1500)
        }
    }, [showNoti])

    return (
        <div className="Addplayer">
            <div className="container container--sign-form">
                <form className="form form--sign" onSubmit={submitNewPlayer}>
                    <div className="fieldset">
                        <label htmlFor="playername" className="fieldset__label">Player Name</label>
                        <input type="text" id="playername" className="fieldset__input" value={newPlayer} onChange={(e) => setNewPlayer(e.target.value.toLowerCase())} />
                    </div>
                    <div className="fieldset">
                        <button className="btn btn--text-center fieldset__input">
                            <MdAdd className="btn__icon" fontSize="16px" color="#ffffff"/>
                            <span className="btn__text">Add Player</span>
                        </button>
                    </div>
                </form>
            </div>

            {showNoti[0] && <Notification msg={showNoti[1].mesg} status={showNoti[1].status} />}
        </div>
    )
}

export default AddPlayer
