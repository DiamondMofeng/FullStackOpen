import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="give feedback" />
      <Button text="good" var={good} func={setGood} />
      <Button text="neutral" var={neutral} func={setNeutral} />
      <Button text="bad" var={bad} func={setBad} />
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = (props) => {

  const handelClick = () => { props.func(props.var + 1) }

  return (
    <button onClick={handelClick}>{props.text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0)
    return(
      <p>No feedback given</p>
    )


    return (
      <div>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)}/>
        <StatisticLine text="positive" value={good / (good + neutral + bad)}/>
      </div>
    )
}

const StatisticLine = ({text,value})=>{
  return <tr>{text} {value}</tr>
}

export default App