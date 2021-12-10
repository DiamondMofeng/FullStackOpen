import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }

  const randomSelect = () => {
    setSelected(getRandomInt(0, anecdotes.length))
  }

  //const points = new Array(anecdotes.length)

  const [points, setPoints] = useState(new Uint16Array(anecdotes.length))
  console.log(points)

  const increaseVote = () => {

    const copy = [...points]
    console.log(copy)
    copy[selected] += 1
    setPoints(copy)
    changeTop(selected)
    return
  }

  const [top, setTop] = useState(0)
  const changeTop=(selec)=>{
    if(points[selec]>=points[top])
    setTop(selec)
    return
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <p><button onClick={increaseVote}>vote</button>
          <button onClick={randomSelect}>next anecdotes</button></p>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[top]}</p>
        <p>has {points[top]} votes</p>
      </div>
    </div>
  )
}

export default App