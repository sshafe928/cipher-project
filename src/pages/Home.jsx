import React from 'react'
import '../css/home.css'

const Home = () => {

  return (
    <>
    <div className='parchment'>
      <div className="cover">
          <h1 className='title'>Code Breakers</h1>
          <h4 className='edition'>Transposition Edition</h4>
          
      </div>
      <div>
          <a href="/Name"><button id ="play" className="btn">Enter the Lab</button></a>
          <a href="/HTP"><button id='mini' className="btn">How to play..</button></a>
      </div>
    </div>
    </>
  )
}

export default Home