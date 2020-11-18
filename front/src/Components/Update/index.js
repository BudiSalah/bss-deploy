import React, { useState, useEffect, useContext } from 'react'
import "./style.css"
import { MainContext } from "./../Context"
import MdAdd from 'react-ionicons/lib/MdAdd'
import Notification from "./../Feedback/Notification"
const axios = require("axios").default

function Update() {
    let {users, setUsers} = useContext(MainContext)
    let [loaded, setLoaded] = useState(false)
    let [showNoti, setShowNoti] = useState([false, {mesg: "", status: ""}])
    let [players, setPlayers] = useState("")
    let [firstPlayer, setFirstPlayer] = useState({id: "", name: "", score: ""})
    let [secondPlayer, setSecondPlayer] = useState({id: "", name: "", score: ""})
    let [submited, setSubmited] = useState(false)

    function clearInputs() {
        setFirstPlayer({id: "", name: "", score: "", pints: 0})
        setSecondPlayer({id: "", name: "", score: "", pints: 0})

        let secondListHiddenInput = document.querySelector("#second_list .form__item--hidden")
        secondListHiddenInput.classList.remove("form__item--hidden")

        let selectedPlayers = document.querySelectorAll(".form__item--selected")
        for (let item of selectedPlayers) {
            item.classList.remove("form__item--selected")
        }

        let submitBtn = document.getElementById("submit-btn")
        submitBtn.classList.add("form__item--hidden")

        let secondList = document.getElementById("second_list")
        secondList.classList.add("form__item--hidden")
    }

    function submitForm(e) {
        e.preventDefault()
        
        setSubmited(true)

        if ((firstPlayer.id === "" || secondPlayer.id === "") || (firstPlayer.score === "" || secondPlayer.score === "")) {
            alert("Wrong Inputs")
            setSubmited(false)
            return
        }

        let firstPlayerObJ = {
            id: firstPlayer.id,
            name: firstPlayer.name,
            gf: firstPlayer.score,
            ga: secondPlayer.score,
            game_status: (firstPlayer.score > secondPlayer.score ? "won" : firstPlayer.score < secondPlayer.score ? "loss" : "draw"),
            points: firstPlayer.score > secondPlayer.score ? 3 : firstPlayer.score < secondPlayer.score ? 0 : 1
        }

        let secondPlayerObJ = {
            id: secondPlayer.id,
            name: secondPlayer.name,
            gf: secondPlayer.score,
            ga: firstPlayer.score,
            game_status: (secondPlayer.score > firstPlayer.score ? "won" : secondPlayer.score < firstPlayer.score ? "loss" : "draw"),
            points: secondPlayer.score > firstPlayer.score ? 3 : secondPlayer.score < firstPlayer.score ? 0 : 1
        }

        axios.post("/matches/update", {
            playerOne: firstPlayerObJ,
            playerTwo: secondPlayerObJ
        }).then(res => {
            clearInputs()
            document.body.scrollIntoView({ behavior: "smooth" })
        }).catch(err => {
            setShowNoti([true, {mesg: "Can't update match. Try again!", status: "faild"}])
            setSubmited(false)
            return
        })
        
        // update users
        axios.post("/update-players", {
            playerOne: firstPlayerObJ,
            playerTwo: secondPlayerObJ
        }).then(res => {
            setShowNoti([true, {mesg: "Table has updated!", status: "success"}])
            setSubmited(false)
        }).catch(err => {
            setShowNoti([true, {mesg: "Can't update players", status: "faild"}])
            setSubmited(false)
        })
    }

    function selectUser(e) {
        e.stopPropagation()
        let target = e.target
        let firstList = document.getElementById("first_list")
        let secondList = document.getElementById("second_list")
        let secondListItems = Array.from(secondList.childNodes)

        if (target.parentElement.id === "first_list") {
            secondList.classList.remove("form__item--hidden")

            let currentSelected = firstList.querySelector(".form__item--selected")

            if (currentSelected !== null) {
                currentSelected.classList.remove("form__item--selected")
            }

            target.classList.add("form__item--selected")

            secondListItems.filter(item => {
                if (target.id === item.id && item.classList.contains("form__item--selected")) {
                    item.classList.remove("form__item--selected")
                    setSecondPlayer({...secondPlayer, id: ""})
                }

                return item.id === target.id ? item.classList.add("form__item--hidden") : item.classList.remove("form__item--hidden")
            })

            setFirstPlayer({...firstPlayer, id: target.id, name: target.innerText.toLowerCase()})

        } else {
            let currentSelected = secondList.querySelector(".form__item--selected")

            if (currentSelected !== null) {
                currentSelected.classList.remove("form__item--selected")
            }

            target.classList.add("form__item--selected")

            setSecondPlayer({...secondPlayer, id: target.id, name: target.innerText.toLowerCase()})
        }
    }

    function playerScore(e) {
        let target = e.target

        if (target.id === "first_player_score") {
            if (!isNaN(target.value)) {
                setFirstPlayer({...firstPlayer, score: target.value})
            } else {
                setFirstPlayer({...firstPlayer, score: ""})
            }
        } else {
            if (!isNaN(target.value)) {
                setSecondPlayer({...secondPlayer, score: target.value})
            } else {
                setSecondPlayer({...secondPlayer, score: ""})
            }
        }
    }

    function showHideSubmitBtn() {
        let submitBtn = document.getElementById("submit-btn")
        if ((firstPlayer.id === "" || secondPlayer.id === "") || (firstPlayer.score === "" || secondPlayer.score === "")) {
            submitBtn.classList.add("form__item--hidden")
        } else {
            submitBtn.classList.remove("form__item--hidden")
        }
    }

    useEffect(() => {
        if (loaded === false && users.length < 2) {
            axios.get("/all-players").then(res => {
                setUsers(res.data.allPlayers)
            }).catch(err => {
                setShowNoti([true, {mesg: "Error. Try again!", status: "faild"}])
            })
            setLoaded(true)
        }
    }, [loaded, users.length, setUsers])

    useEffect(() => {
        showHideSubmitBtn()
    })

    useEffect(() => {
        let playersMap = users.map(item => {
            const {_id, name} = item
            return <li key={_id} id={_id} className="form__item" onClick={selectUser}>{name}</li>
        })
        setPlayers(playersMap)
    
    // eslint-disable-next-line
    }, [users])

    useEffect(() => {
        let timeId = null

        if (showNoti[0] === true) {
            timeId = setTimeout(() => setShowNoti([false]), 5000)
        }

        return () => {
            clearTimeout(timeId)
        }
    }, [showNoti])

    return (
        <section>
            <section className="Update">
                <div className="container">
                    <form onSubmit={submitForm} className="form">
                        <div className="row">
                            <div className="form__fieldset row__col">
                                <ul id="first_list" className="form__select">
                                    {players}
                                </ul>

                                <hr />

                                <div className="form__fieldset form__fieldset--number row__col">
                                    <h5 className="form__label form__label--score">Score</h5>
                                    <input id="first_player_score" className="" type="text" name="first_player_score" value={firstPlayer.score} maxLength="2" placeholder="0" onChange={playerScore} autoComplete="off" />
                                </div>
                            </div>

                            <span className="form__hr">VS</span>

                            <div className="form__fieldset row__col">
                                <ul id="second_list" className="form__select form__item--hidden">
                                    {players}
                                </ul>

                                <hr />

                                <div className="form__fieldset form__fieldset--number row__col">
                                    <h5 className="form__label form__label--score">Score</h5>
                                    <input id="second_player_score" className="" type="text" name="second_player_score" value={secondPlayer.score} maxLength="2" placeholder="0" onChange={playerScore} autoComplete="off" />
                                </div>
                            </div>
                        </div>

                        <button id="submit-btn" type="submit" className={`btn btn--center form__item--hidden ${submited ? "fieldset__input--hidden" : ""}`} disabled={submited}>
                            <MdAdd className="btn__icon" fontSize="16px" color="#ffffff" />
                            <span className="btn__text">Update</span>
                        </button>
                    </form>
                </div>
            </section>

            {showNoti[0] && <Notification msg={showNoti[1].mesg} status={showNoti[1].status} />}
        </section>
    )
}

export default Update
