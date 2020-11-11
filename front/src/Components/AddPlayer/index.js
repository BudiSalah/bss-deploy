import React, {useState} from 'react'
import "./style.css"
import MdAdd from 'react-ionicons/lib/MdAdd'

function AddPlayer() {
    let [newPlayer, setNewPlayer] = useState("")

    function submitNewPlayer(e) {
        e.preventDefault()
        console.log("newPlayer:", newPlayer)
    }

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
        </div>
    )
}

export default AddPlayer
