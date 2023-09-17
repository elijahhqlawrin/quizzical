import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { decode } from "html-entities"

function Prompt(props) {
    const answers = props.answers.map(ans => {
        const decodedAns = decode(ans)
        let styles = {}
        props.showResults ?
            styles = {
                backgroundColor: decodedAns === props.correctAns ? "#94D7A2" : "#F8BCBC",
                border: 0,
                opacity: decodedAns !== props.correctAns ? 0.5 : 1
            } /* : checked === true ? styles = {
                backgroundColor: "#D6DBF5"
            }  */: ""

        return (
            <div key={nanoid()}>
                <input 
                    type="radio" 
                    id={decodedAns + props.id} 
                    name={props.question} 
                    value={decodedAns}
                    onChange={(e) => checkSelected(e)}
                    // checked={false}
                >
                </input>
                <label htmlFor={decodedAns + props.id} style={styles}>
                    {decodedAns}
                </label>
            </div>
        )
    })
    
    function checkSelected(e) {
        props.handleChange(e)
        // console.log(e.target.id)
        // document.getElementById(`${e.target.id}`).style.backgroundColor = "#D6DBF5"
    }

    return (
        <div className="prompt-container">
            <h3 className="prompt-question">{props.question}</h3>
            <div className="answer-options">{answers}</div>
        </div>
    )
}

export default Prompt