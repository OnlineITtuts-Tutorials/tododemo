const Todo = require("../models/todoModel");

exports.getAllTodos = async (req, res) => {
  try {
    const tasks = await Todo.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const tasks = await Todo.findById(req.params.id);
    if (!tasks) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const tasks = new Todo({
      title: req.body.title,
      description: req.body.description || "",
    });

    const savedTasks = await tasks.save();
    res.status(201).json(savedTasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const Task = await Todo.findById(req.params.id);
    if (!Task) {
      return res.status(404).json({ message: "Task not found" });
    }

    Task.title = req.body.title || Task.title;
    Task.description =
      req.body.description !== undefined
        ? req.body.description
        : Task.description;
    Task.completed =
      req.body.completed !== undefined ? req.body.completed : Task.completed;
    Task.updatedAt = new Date();

    const updatedTask = await Task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const Task = await Todo.findByIdAndDelete(req.params.id);
    if (!Task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleComplete = async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    task.updatedAt = new Date();

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
