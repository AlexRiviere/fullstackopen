"use strict"
import { useState } from 'react'

const PersonItem = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Filter = ({filterValue, persons, setFilteredPersons, setFilterValue}) => {
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    if (event.target.value) {
      let listOfPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      setFilteredPersons(listOfPersons);
    } else {
      setFilteredPersons(persons);
    }
  }
  
  return (
    <div>
      filter shown with <input value={filterValue} onChange={handleFilterChange}/>
    </div>  
  )
}

const Persons = ({filteredPersons}) => {
  
  return (
    <div>
      {filteredPersons.map(person => 
        <PersonItem key={person.name} person={person} />
      )}
    </div>
  )
}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, setFilteredPersons}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      let newPerson = {name: newName, number: newNumber};
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
      setFilteredPersons(persons.concat(newPerson));
    }   
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons.concat());
  
  
  
  

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filterValue={filterValue} persons={persons} setFilteredPersons={setFilteredPersons} setFilterValue={setFilterValue} />
      
      <h2>add a new</h2>
      
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setFilteredPersons={setFilteredPersons} />
      
      <h2>Numbers</h2>
      
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App
