//IMPORTS
const express = require('express');
const mongoose = require('mongoose')
const Todo = require('./models/todo')

// const serverless = require('serverless-http');


const app = express()

//MIDDLEWARE
app.use(express.json());

require('dotenv').config()
const dbpassword = process.env.DB_PWD

//DB CONNECTION
const MONOGODB_URI = `mongodb+srv://dbUser:${dbpassword}@cluster0.aywwh.mongodb.net/test`
mongoose.connect(process.env.MONGODB_URI || MONOGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to DB"))
    .catch(console.error)


//REQUESTS

//get all tasks
app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

//create new tasks
app.post('/todo/create', (req,res) => {
    const todo = new Todo({
        text : req.body.text
    })
    todo.save()

    res.json(todo)
})

//delete tasks by ID
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})

//update todo
app.put('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    //swaps the complete status between true and false
    todo.complete = !todo.complete
    todo.save()

    res.json(todo)
})

//LISTEN
app.listen(process.env.PORT ||  3001, () => {
    console.log("Server running")
})

// module.exports.handler = serverless(app);