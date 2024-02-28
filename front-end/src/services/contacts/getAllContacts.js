export const getAllContacts = () => {
    return fetch('http://localhost:3001/api/persons')
    .then(response => response.json())
}