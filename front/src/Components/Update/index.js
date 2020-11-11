import React, {useState, useEffect} from 'react'
import "./style.css"
import {MainContext} from "./../Context"
import MdAdd from 'react-ionicons/lib/MdAdd'

function Update() {
    let [firstPlayerId, setFirstPlayerId] = useState("")
    let [secondPlayerId, setSecondPlayerId] = useState("")
    let [firstPlayerScore, setFirstPlayerScore] = useState("")
    let [secondPlayerScore, setSecondPlayerScore] = useState("")

    function clearInputs() {
        setFirstPlayerId("")
        setSecondPlayerId("")
        setFirstPlayerScore("")
        setSecondPlayerScore("")

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
        if ((firstPlayerId === "" || secondPlayerId === "") || (firstPlayerScore === "" || secondPlayerScore === "")) {
            console.log("Wrong Inputs")
            return
        }

        clearInputs()
        document.body.scrollIntoView({behavior: "smooth"})
        console.log("Update the server")
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
                    setSecondPlayerId("")
                }

                return item.id === target.id ? item.classList.add("form__item--hidden") : item.classList.remove("form__item--hidden")
            })
            
            setFirstPlayerId(target.id)

        } else {
            let currentSelected = secondList.querySelector(".form__item--selected")

            if (currentSelected !== null) {
                currentSelected.classList.remove("form__item--selected")
            }

            target.classList.add("form__item--selected")
            
            setSecondPlayerId(target.id)
        }
    }

    function playerScore(e) {
        let target = e.target

        if (target.id === "first_player_score") {
            if (!isNaN(target.value)) {
                setFirstPlayerScore(target.value)
            } else {
                setFirstPlayerScore("")
            }
        } else {
            if (!isNaN(target.value)) {
                setSecondPlayerScore(target.value)
            } else {
                setSecondPlayerScore("")
            }
        }
    }

    function showHideSubmitBtn() {
        let submitBtn = document.getElementById("submit-btn")
        if ((firstPlayerId === "" || secondPlayerId === "") || (firstPlayerScore === "" || secondPlayerScore === "")) {
            submitBtn.classList.add("form__item--hidden")
        } else {
            submitBtn.classList.remove("form__item--hidden")
        }
    }

    useEffect(() => {
        showHideSubmitBtn()
    })

    return (
        <MainContext.Consumer>
            {value => {
                const {users} = value
                const usersArray = users.map(item => {
                    const {id, name} = item
                    return (
                        <li key={id} id={id} className="form__item" onClick={selectUser}>{name}</li>
                    )
                })

                return (
                    <section className="Update">
                        <div className="container">
                            <form onSubmit={submitForm} className="form">
                                <div className="row">
                                    <div className="form__fieldset row__col">
                                        <ul id="first_list" className="form__select">
                                            {usersArray}
                                        </ul>
                                        
                                        <hr />

                                        <div className="form__fieldset form__fieldset--number row__col">
                                            <input id="first_player_score" className="" type="text" name="first_player_score" value={firstPlayerScore} maxLength="2" placeholder="0" onChange={playerScore} autoComplete="off"/>
                                        </div>
                                    </div>

                                    <span className="form__hr">VS</span>
                                    
                                    <div className="form__fieldset row__col">
                                        <ul id="second_list" className="form__select form__item--hidden">
                                            {usersArray}
                                        </ul>
                                        
                                        <hr />

                                        <div className="form__fieldset form__fieldset--number row__col">
                                            <input id="second_player_score" className="" type="text" name="second_player_score" value={secondPlayerScore} maxLength="2" placeholder="0" onChange={playerScore} autoComplete="off"/>
                                        </div>
                                    </div>
                                </div>

                                <button id="submit-btn" type="submit" className="btn btn--center form__item--hidden">
                                    <MdAdd className="btn__icon" fontSize="16px" color="#ffffff"/>
                                    <span className="btn__text">Update</span>
                                </button>
                            </form>
                        </div> 
                    </section>
                )
            }}
        </MainContext.Consumer>
    )
}

export default Update
