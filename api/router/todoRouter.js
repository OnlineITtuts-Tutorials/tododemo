const express = require("express");
const TodoController = require("../controller/todoController");

const router = express.Router();

router
  .route("/")
  .get(TodoController.getAllTodos)
  .post(TodoController.createTodo);

router
  .route("/:id")
  .get(TodoController.getTodo)
  .put(TodoController.updateTodo)
  .delete(TodoController.deleteTodo);

router.route("/:id/toggle").patch(TodoController.toggleComplete);

module.exports = router;
