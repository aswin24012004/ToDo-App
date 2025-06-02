const express = require('express');
const app = express.Router();
const Todo = require('../models/Todo');

app.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/', async (req, res) => {
  // const newTodo = new Todo({
  //   title: req.body.title,
  //   department: req.body.department
  // });
  const { title, description } = req.body;
  const newTodo = new Todo({
    title,
    description
  });
  const savedTodo = await newTodo.save();
  res.json({message:"Added Successfully... ",savedTodo});
});

app.put('/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description
  }, { new: true });
  res.json({message:"Updated successfully", updatedTodo});
  });

app.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted Successfully..' });
});

module.exports = app;
// This code defines the routes for the Todo API. It includes three routes:
// 1. GET /api/todos - Fetches all todos from the database.
// 2. POST /api/todos - Creates a new todo and saves it to the database.            
