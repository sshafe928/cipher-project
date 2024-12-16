import React from 'react'

const Name = () => {
    return (
        <>
        <div>
            <h1>Name Your Detective</h1>
        </div>
        <div>
            <a href="/"><button className="btn">Back</button></a>
        
            <input type="text" placeholder="Enter your name" />
            <a href = '/Levels'><button>Done</button></a>
        </div>
        </>
    )
}

export default Name