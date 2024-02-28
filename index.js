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
    Person.findById(req.params.id)
    .then(person => {
        if(person){
            res.json(person)
        }else{
            res.status(404).end()
        }
      })

      .catch(error => next(error))
})
app.delete('/api/persons/:id',(req,res, next) => {
    Person.findByIdAndDelete(req.params.id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons',(req,res)=> {
    const body = req.body
    if (body.name === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
  
    const person = new Person({
        name: body.name,
        number: body.number,
    })
  
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
        name: body.name,
        number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

  app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})