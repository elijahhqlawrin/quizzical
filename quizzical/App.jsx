import React, { useState, useEffect } from "react"
import Start from "./Start"
import Quiz from "./Quiz"
import Blobs from "./Blobs"
import { nanoid } from "nanoid"
import { decode } from "html-entities"

function App() {
  const [session, setSession] = useState(false)
  const [quiz, setQuiz] = useState()
  const [reset, setReset] = useState(false)

  function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const swapIndex = Math.floor(Math.random() * (i + 1))
        const currentItem = arr[i]
        const itemToSwap = arr[swapIndex]
        arr[i] = itemToSwap
        arr[swapIndex] = currentItem
    }
    return arr
  }

  useEffect(() => {
    async function getTrivia() {
      const res = await fetch("https://opentdb.com/api.php?amount=5")
      const data = await res.json()
      const triviaData = data.results.map(result => {
        const answersArr = result.incorrect_answers.concat(result.correct_answer)
        const shuffledAnswers = fisherYatesShuffle(answersArr)
        return {
            id: nanoid(),
            question: decode(result.question),
            answers: (shuffledAnswers),
            correctAns: result.correct_answer 
          }
      })
      setQuiz(triviaData)
    }
    getTrivia()
  }, [reset])

  function startSession() {
    setSession(prevSession => !prevSession)
  }
  
    function tryAgain() {
        setSession(prevSession => !prevSession)
        setReset(prev => !prev)
    }

  return (
      <main>
        <Blobs />
        { session ? 
          <Quiz quiz={quiz} tryAgain={tryAgain} /> :
          <Start startSession={startSession} />
        }
    </main>
  )
}

export default App

    // <main>
    //     <Blobs />
    //     { session ? 
    //       <div className="form">
    //         {triviaPrompt}
    //         <div className="form-bottom">
    //           <button className="btn check-ans-btn">
    //             {showResults ? "Try again" : "Check answers"}
    //           </button>
    //         </div>
    //       </div> :
    //       <Start startSession={startSession} />
    //     }
    // </main>