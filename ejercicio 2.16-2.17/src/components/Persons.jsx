import { deleteContact } from "../services/contacts/deleteContact";

const Persons = ({ name, number , id}) => {
  const handleDelete = () => {
    if(confirm(`Delete ${name}?`)){
      deleteContact(id)
    }
  }
  return (
    <li>
      {name}/{number} <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default Persons;
