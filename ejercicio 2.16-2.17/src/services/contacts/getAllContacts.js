export const getAllContacts = () => {
    return fetch('/api/persons')
    .then(response => response.json())
}