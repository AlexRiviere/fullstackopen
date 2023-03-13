import { useState } from 'react'

const PopAnecdote = ({votes, anecdotes}) => {
  let mostVotes = Math.max(...Object.values(votes));
  let allIndexes = Object.keys(votes);
  let mostPopIndex;
  
  if (allIndexes.length === 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[0]}</p>
        <p>has 0 votes</p>
    </div>  
    )
  }
  
  for (let i = 0; i < allIndexes.length; i += 1) {
    if (votes[allIndexes[i]] === mostVotes) {
      mostPopIndex = allIndexes[i];
    }
  }
  
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostPopIndex]}</p>
      <p>has {mostVotes} votes</p>
    </div>
    
      
  )
    
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({});
  
  
  const handleNextClick = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }
  
  const handleVoteClick = () => {
    let newVotes = {...votes};
    if (newVotes[selected]) {
      newVotes[selected] += 1;
    } else {
      newVotes[selected] = 1;
    }
    // debugger;
    setVotes({...newVotes});
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] ? votes[selected] : 0} votes</p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
      <PopAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App