import React, { useState, useEffect } from "react"
import Prompt from "./Prompt"
import { decode } from "html-entities"

export default function Quiz(props) {
    const [answerKey, setAnswerKey] = useState(getAnswerKey())
    const [showResults, setShowResults] = useState(false)
    const [score, setScore] = useState(0)
        
    const triviaPrompts = props.quiz ? props.quiz.map((prompt, index) => {
    return (
        <Prompt 
            key={prompt.id} 
            id={prompt.id} 
            question={prompt.question} 
            answers={prompt.answers} 
            correctAns={prompt.correctAns} 
            handleChange={handleChange}
            showResults={showResults}
        />
        )
    }) : []
    
    function getAnswerKey() {
        const answerKey = props.quiz ? props.quiz.map(item => {
            return (
                {
                    question: item.question, 
                    correct: item.correctAns, 
                    selectedAns: "", 
                }
            )
        }) : []
        return answerKey
    }
    
    function handleChange(e) {
        e.preventDefault()
        const {name, value, id} = e.target
        setAnswerKey(initAnsKey => initAnsKey.map(item => {
          return item.question === name ?
          {...item, selectedAns: value} :
          {...item}
      }))
        // console.log(`${value} at ${name} changed!`)
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        setShowResults(prev => !prev)
        checkScore()
    }
    
    
    function checkScore() {
        let scoreCount = 0
        answerKey.forEach((ans) => {
            if (ans.selectedAns === ans.correct) {
                scoreCount++
            }
            setScore(scoreCount)
            return scoreCount
        })
    }
    
    return (
        <form onSubmit={handleSubmit}>
            {triviaPrompts}
            <div className="form-bottom">
                {showResults && <h4 className="score">You scored {score}/5 correct answers</h4>}
                <button
                type={showResults ? "button" : "submit"} 
                className="btn check-ans-btn" 
                onClick={showResults ? props.tryAgain : checkScore}
                >
                    {showResults ? "Try again" : "Check answers"}
                </button>
            </div>
        </form>
    )
}