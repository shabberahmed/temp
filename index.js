const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

todoId = 6;
const hostname = '192.168.1.7'; // Replace with your IP address

let todos = [
  { id: 1, title: "Learn Kheema Pasta", completed: false, category: "food" },
  {
    id: 2,
    title:
      "Make  Chicken Burger for family from chef Ranveer https://www.youtube.com/watch?v=3g3_US1cfhA&t=315s",
    completed: false,
    category: "food",
  },
  {
    id: 3,
    title: "Prepare bint e suhail for homework and exams",
    completed: false,
    category: "children",
  },
  {
    id: 4,
    title: "Shop for Eid clothes bint e suhail",
    completed: false,
    category: "children",
  },
  {
    id: 5,
    title: "We got lot of apis to build for ecommerce plan tasks",
    completed: false,
    category: "work",
  },
  {
    id: 6,
    title: "Prepare presentation Meeting for clients ",
    completed: false,
    category: "work",
  },
];

app.use(bodyParser.json());
app.use(cors());

app.get("/twilio", (req, res) => {
  res.json(process.env.twilio);
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    res
      .status(404)
      .json({ message: "Item you are searching for was not found" });
  } else {
    todos.splice(index, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
  }
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const completed = req.body.completed;
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    res
      .status(404)
      .json({ message: "Item you are searching for was not found" });
  } else {
    todos[todoIndex].completed = completed;
    res.status(200).json({ message: "Todo updated successfully" });
  }
});

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
