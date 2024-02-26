export const deleteContact = (id) => {
    return fetch(`/api/persons/${id}`,{
        method: 'DELETE',
      })
}