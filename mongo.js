const mongoose = require('mongoose')

if (process.argv.length<4) {
    const password = process.argv[2]

    const url =
    `mongodb+srv://cleytxs:${password}@cluster0.pplk9fu.mongodb.net/personsDB?retryWrites=true&w=majority&appName=Cluster0`
    
    mongoose.set('strictQuery',false)
    mongoose.connect(url)
    
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })
    
    const Person = mongoose.model('Person', personSchema)

    Person.find({}).then(res=>{
        res.forEach(person => {
            console.log(person.name)
        })
        mongoose.connection.close()
    })
}else{

    const password = process.argv[2]
    
    const url =
    `mongodb+srv://cleytxs:${password}@cluster0.pplk9fu.mongodb.net/personsDB?retryWrites=true&w=majority&appName=Cluster0`
    
    mongoose.set('strictQuery',false)
    mongoose.connect(url)
    
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    })
    
    const Person = mongoose.model('Person', personSchema)
    
    const person = new Person({
        name: process.argv[3],
      number: process.argv[4],
    })
    
    person.save().then(result => {
      console.log(`added ${result.name} ${result.number} to phonebook`)
      mongoose.connection.close()
    })

}    
