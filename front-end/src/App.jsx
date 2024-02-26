import { useState } from "react";
import './index.css'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonFrom";
import Persons from "./components/Persons";
import { useEffect } from "react";
import { getAllContacts } from "./services/contacts/getAllContacts";
import { createContact } from "./services/contacts/createContact";
import { updateContact } from "./services/contacts/updateContact";
import { searchId, searchName } from "./services/functions";
import Notification from "./components/Notification";




const App = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false)
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personSearch, setPersonSearch] = useState(null);
  const [message, setMessage] = useState(null)

  useEffect( ()=> {
    setLoading(true)
    getAllContacts()
        .then((json) => setPersons(json))
    setLoading(false)
  },[])

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleChangePersonSearch = (e) => {
    const search = e.target.value;
    const personFind = persons.filter((person) =>
      person.name.toLowerCase().includes(search.toLowerCase())
    );
    setPersonSearch(personFind);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numbersObjet = {
      name: newName,
      number: newNumber,
      id: persons.length + 1 
    };
    if (searchName(persons, newName)) {
      if(confirm(`${newName}, already exist, do you want to update`)){
        const id = searchId(persons, newName);
        updateContact(id , numbersObjet)
        setMessage(
          `the contact '${newName}' was already change`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName("");
        setNewNumber("")
      }
    } else {
      createContact(numbersObjet).then(setPersons((contacts) => contacts.concat(numbersObjet)))
      setMessage(
        `the contact '${newName}' was already agree`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName("");
      setNewNumber("")
    }
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Notification message={message} />
        <Filter handle={handleChangePersonSearch} personSearch={personSearch}/>
        <h2>Add a new</h2>
        <PersonForm handlers={{handleChangeName,handleChangeNumber,handleSubmit}} person={{newName,newNumber}}  />
        <h2>Numbers</h2>
        {loading ? "loading..." : 
        <ul>
          {persons.map(person => <Persons key={person.id} {...person} />)}
        </ul>}
      </div>
    </>
  );
};

export default App;
