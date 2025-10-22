import { Request, Response } from 'express';
import * as TodoService from '../services/TodoService';
import { CreateTodoDto, UpdateTodoDto } from '../models/todo.model';

export const getAllTodos = (req: Request, res: Response): void => {
  try {
    const todos = TodoService.getAllTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTodoById = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const todo = TodoService.getTodoById(id);

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTodo = (req: Request, res: Response): void => {
  try {
    const createTodoDto: CreateTodoDto = req.body;

    if (!createTodoDto.title || createTodoDto.title.trim() === '') {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const todo = TodoService.createTodo(createTodoDto);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTodo = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const updateTodoDto: UpdateTodoDto = req.body;

    const todo = TodoService.updateTodo(id, updateTodoDto);

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTodo = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const deleted = TodoService.deleteTodo(id);

    if (!deleted) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
