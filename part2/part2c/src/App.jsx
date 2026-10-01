import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import personService from "./services/persons";
const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <br />
        number:
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }
    personService.remove(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        !window.confirm(
          `${newName} is already in the phonebook. Do you want to replace the old number with a new one?`,
        )
      ) {
        return;
      }
      personService
        .update(existingPerson.id, personObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) =>
              p.id === existingPerson.id ? returnedPerson : p,
            ),
          );
          setNewName("");
          setNewNumber("");
        });
      return;
    }

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewNumber("");
      setNewName("");
    });
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
