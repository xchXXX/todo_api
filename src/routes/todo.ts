import { Router } from 'express';
import * as TodoController from '../controllers/TodoController';

const router = Router();

// Get all todos
router.get('/todos', TodoController.getAllTodos);

// Get a single todo by ID
router.get('/todos/:id', TodoController.getTodoById);

// Create a new todo
router.post('/todos', TodoController.createTodo);

// Update a todo
router.put('/todos/:id', TodoController.updateTodo);

// Delete a todo
router.delete('/todos/:id', TodoController.deleteTodo);

export default router;
