// const express = require("express");
// const app = express();
// const todosArr = [
//   {
//     id: 1,
//     task: "create all api for project1",
//     tags: ["javaScript", "HTML", "CSS", "typeScript", "Angular"],
//     status: "todo",
//   },
//   {
//     id: 2,
//     task: "create all api for project2",
//     tags: ["javaScript", "HTML"],
//     status: "doing",
//   },
//   {
//     id: 3,
//     task: "create all api for project3",
//     tags: ["typeScript", "Angular"],
//     status: "done",
//   },
//   {
//     id: 4,
//     task: "create all api for project4",
//     tags: ["Angular"],
//     status: "todo",
//   },
//   {
//     id: 5,
//     task: "create all api for project5",
//     tags: ["javaScript", "typeScript", "Angular"],
//     status: "creating",
//   },
// ];

// app.use(express.json()); //middleware to convert frontend post (json)data into javaScript at backend.

// app.get("/", (req, res) => {
//   res.send("taskTrek project");
// });

// app.get("/todos", (req, res) => {
//   res.send(todosArr);
// });

// app.get("/todos/:id", (req, res) => {
//   const todoId = parseInt(req.params.id);
//   const todoData = todosArr.find((data) => data.id === todoId);
//   res.send(todoData);
//   // res.send(req.params)
//   // res.send(req.query)
// });

// app.post("/todos", (req, res) => {
//   const todoData = req.body;

//   // joi, yup, validator.js are data validation library.

//   if (!todoData.task) {
//     return res.status(400).json({ message: "task is reuired." });
//   }

//   if (!todoData.tags) {
//     return res.status(400).json({ message: "tags are required." });
//   }
//   if (!todoData.status) {
//     return res.status(400).json({ message: "status is required." });
//   }

//   const newTodo = {
//     id: todosArr[todosArr.length - 1].id + 1,
//     task: todoData.task,
//     tags: todoData.tags,
//     status: todoData.status,
//   };

//   todosArr.push(newTodo);
//   res.status(200).json(newTodo);
// });

// app.put("/todos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const { task, tags, status } = req.body;
//   const todoIndex = todosArr.findIndex((data) => data.id === id);

//   if (todoIndex === -1) {
//     return res.status(404).json({ message: "Todo not found" });
//   }
//   if (task) {
//     todosArr[todoIndex].task = task;
//   }
//   if (tags) {
//     todosArr[todoIndex].tags = tags;
//   }
//   if (status) {
//     todosArr[todoIndex].status = status;
//   }
//   res.status(200).json({ message: todosArr[todoIndex] });
// });

// app.delete("/todos/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const todoIndex = todosArr.findIndex((data) => data.id === id);
//   if (todoIndex === -1) {
//     return res.status(404).json({ message: "Todo not found" });
//   }
//   todosArr.splice(todoIndex, 1);
//   res.status(200).json({ message: "Todo deleted successfully." });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`server is listing on port ${PORT}`);
// });
