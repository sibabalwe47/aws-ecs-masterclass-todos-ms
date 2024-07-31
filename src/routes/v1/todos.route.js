import express from "express";
import TodosController from "../../controllers/todos.controller.js";
import { sessionValidator } from '../../middleware/session-validator.js'
const route = express.Router();

route.post("/create", sessionValidator, TodosController.createUserTodo);

route.get("/all", sessionValidator, TodosController.getAllUserTodos);

route.get("/:id", sessionValidator, TodosController.getUserTodoByID);

route.put("/:id", sessionValidator, TodosController.updateUserTodo);

route.delete("/:id", sessionValidator, TodosController.removeUserTodoByID);

route.get("/health", TodosController.healthCheck)

export default route;
