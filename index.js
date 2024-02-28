require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/persons')

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan("common"))
app.use(cors())

app.get('/api/persons',( req,res )=>{
    Person.find({}).then(persons=>{
        res.json(persons)
      })
})
app.get('/info', (req, res) => {
    res.send('<h1>Phone book has info for 2 people</h1><br/>')
})
app.get('/api/persons/:id', (req,res)=>{
    Person.findById(req.params.id).then(person => {
        res.json(person)
      })
})
app.delete('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons',(req,res)=> {
    const body = req.body
    if (body.content === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
  
    const person = new Person({
      content: body.content,
      important: body.important || false,
    })
  
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})