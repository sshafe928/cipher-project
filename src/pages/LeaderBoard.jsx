import React from 'react'
import Board from '../components/board'

const LeaderBoard = () => {
  return (
    <>
    <div>LeaderBoard</div>
    <a href="/Levels"><button className="btn">Back</button></a>
    <a href="/Cipher-game"><button className="btn">Next</button></a>
    <Board/>
    </>
  )
}

export default LeaderBoard