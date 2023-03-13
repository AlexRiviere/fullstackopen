import { useState } from 'react'

const Button = ({clickHandle, text}) => {
  
  return (
    <button onClick={clickHandle}>{text}</button>  
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr><td>{text} {value}</td></tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const calcTotal = () => good + neutral + bad
  const calcAverage = () => (good - bad) / calcTotal()
  const calcPercentagePositive = () => good / calcTotal() * 100 
  
  if ([good, bad, neutral].find(count => count > 0)) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good}/>
          <StatisticsLine text="neutral" value={neutral}/>
          <StatisticsLine text="bad" value={bad}/>
          <StatisticsLine text="all" value={calcTotal()}/>
          <StatisticsLine text="average" value={calcAverage()}/>
          <StatisticsLine text="positive" value={calcPercentagePositive() + ' %'}/>
        </tbody>
      </table>
    )
  }
  
  return (
    <p>No feedback given</p>  
  )
    
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const buttonClick = (event) => {
    let button = event.target.innerHTML;
    if (button === 'good') {
      let newCount = good + 1;
      setGood(newCount);
    } else if (button === 'bad') {
      let newCount = bad + 1;
      setBad(newCount);
    } else {
      let newCount = neutral + 1;
      setNeutral(newCount);
    }
  }
  

 
  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandle={buttonClick} text="good"/>
      <Button clickHandle={buttonClick} text="neutral"/>
      <Button clickHandle={buttonClick} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
