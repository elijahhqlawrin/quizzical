import React from "react";

function Start(props) {
    return (
        <div className="start-page">
            <h1 className="start-title">Quizzical</h1>
                <h4 className="start-subtitle">
                    How much do you know?
                </h4>
            <button
            className="btn start-btn"
            onClick={() => props.startSession()}>
                Start quiz
            </button>
        </div>
    )
}

export default Start