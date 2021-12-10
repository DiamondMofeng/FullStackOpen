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
      <Sum text="good" var={good} />
      <Sum text="neutral" var={neutral} />
      <Sum text="bad" var={bad} />
      <Statis good={good} neutral={neutral} bad={bad} />
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

const Sum = (props) => {
  return (
    <p>{props.text} {props.var}</p>
  )
}

const Statis = ({good,neutral,bad}) => {
  return (
    <div>
    <p>average {(good-bad)/(good+neutral+bad)}</p>
    <p>positive {good/(good+neutral+bad)}</p>
    </div>
  )
}

export default App