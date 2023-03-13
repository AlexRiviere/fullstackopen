"use strict"
import { useState, useEffect } from 'react'
import axios from 'axios'
import contactsServices from './services/conatcts'

const PersonItem = ({person, setPersons, setFilteredPersons}) => {
  
  const handleDelete = (event) => {
    let confirmation = confirm(`Delete ${person.name} ?`)
    if (confirmation) {
      let id = event.target.id;
      contactsServices
        .deletePerson(id)
        .then(resp => {
          let newList = persons.filter(person => person.id !== id)
          setPersons(newList);
          setFilteredPersons(newList);
        })
    }
  }
  
  return (
    <p>{person.name} {person.number} <button type="button" onClick={handleDelete} id={person.id}>delete</button></p>
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

const Persons = ({filteredPersons, setFilteredPersons, setPersons}) => {
  
  return (
    <div>
      {filteredPersons.map(person => 
        <PersonItem key={person.name} person={person} setFilteredPersons={setFilteredPersons} setPersons={setPersons} />
      )}
    </div>
  )
}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, setFilteredPersons}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    let newPerson = {name: newName, number: newNumber};
    let id = persons.find(person => person.name === newName).id
    if (id) {
      let confirmation = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmation) {
        contactsServices
          .update(id, newPerson)
          .then(resp => {
            let newList = persons.map(person => person.id === id ? person : newPerson);
            setPersons();
            setFilteredPersons();
          })
          .catch(error => alert(error))
      }
    } else {
      contactsServices
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
          setFilteredPersons(persons.concat(response));      
        })
        .catch(error => {
          alert(error)
        })
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons.concat());
  
  useEffect(() => {
    contactsServices
      .getAll()
      .then(resp => {
        setPersons(resp);
      })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filterValue={filterValue} persons={persons} setFilteredPersons={setFilteredPersons} setFilterValue={setFilterValue} />
      
      <h2>add a new</h2>
      
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setFilteredPersons={setFilteredPersons} />
      
      <h2>Numbers</h2>
      
      <Persons filteredPersons={filteredPersons} setFilteredPersons={setFilteredPersons} setPersons={setPersons}/>
    </div>
  )
}

export default App
