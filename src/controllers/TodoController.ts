import { Request, Response } from 'express';
import * as TodoService from '../services/TodoService';
import { CreateTodoDto } from '../models/todo.model';

export const createTodo = (req: Request, res: Response): void => {
  try {
    const createTodoDto: CreateTodoDto = req.body;
    const todo = TodoService.createTodo(createTodoDto);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
