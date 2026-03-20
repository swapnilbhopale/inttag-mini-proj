const http = require('http')
const server = http.createServer((req, res) => {
    if (req.url === '/') {

        res.write('hi swapnil')
    }
    else if (req.url === '/about') {
        res.write('about page')
    }
    else {
        res.write('route not found')
    }
    res.end()
})

server.listen(3000, () => {

})

// -------------------------------
const express = require('express')
const app = express()
const todosArr = [
    {
        id: 1,
        task: "create all api for project1",
        tags: ["javaScript", "HTML", "CSS", "typeScript", "Angular"],
        status: "todo"
    },
    {
        id: 2,
        task: "create all api for project2",
        tags: ["javaScript", "HTML"],
        status: "doing"
    },
    {
        id: 3,
        task: "create all api for project3",
        tags: ["typeScript", "Angular"],
        status: "done"
    },
    {
        id: 4,
        task: "create all api for project4",
        tags: ["Angular"],
        status: "todo"
    },
    {
        id: 5,
        task: "create all api for project5",
        tags: ["javaScript", "typeScript", "Angular"],
        status: "creating"
    },
]

app.use(express.json())   //middleware to convert frontend post (json)data into javaScript at backend. 

app.get('/', (req, res) => {
    res.send('taskTrek project')
})

app.get('/todos', (req, res) => {
    res.send(todosArr)
})

app.get('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id)
    const todoData = todosArr.find((data) => data.id === todoId)
    res.send(todoData)
    // res.send(req.params)
    // res.send(req.query)
})

app.post('/todos', (req, res) => {
    const todoData = req.body

    // joi, yup, validator.js are data validation library.

    if (!todoData.task) {
        return res.status(400).send('task is reuired.')
    }

    if (!todoData.tags) {
        return res.status(400).send('tags are required.')
    }
    if (!todoData.status) {
        return res.status(400).send('status is required.')
    }

    const newTodo = {
        id: todosArr[todosArr.length - 1].id + 1,
        task: todoData.task,
        tags: todoData.tags,
        status: todoData.status
    }

    todosArr.push(newTodo)
    res.status(200).send('data added.')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is listing on port ${PORT}`)
})

