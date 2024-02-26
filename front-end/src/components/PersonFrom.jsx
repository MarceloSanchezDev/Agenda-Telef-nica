const PersonForm = ({handlers, person}) => {
    return(
        <form onSubmit={handlers.handleSubmit}>
          <div>
            name: <input onChange={handlers.handleChangeName} value={person.newName} />
          </div>
          <div>
            number: <input onChange={handlers.handleChangeNumber} value={person.newNumber} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
}

export default PersonForm