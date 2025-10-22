import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/todo.model';
import { generateUuid } from '../utils/uuid';

// In-memory data store
let todos: Todo[] = [];

// Pure function to create a Todo object
const buildTodo = (data: CreateTodoDto): Todo => {
  const now = new Date();
  return {
    id: generateUuid(),
    title: data.title,
    completed: data.completed ?? false,
    createdAt: now,
    updatedAt: now,
  };
};

export const getAllTodos = (): Todo[] => [...todos];

export const getTodoById = (id: string): Todo | undefined =>
  todos.find(todo => todo.id === id);

export const createTodo = (data: CreateTodoDto): Todo => {
  const todo = buildTodo(data);
  todos = [...todos, todo];
  return todo;
};

export const updateTodo = (id: string, data: UpdateTodoDto): Todo | undefined => {
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return undefined;
  }

  const updatedTodo: Todo = {
    ...todos[todoIndex],
    ...data,
    updatedAt: new Date(),
  };

  todos = [
    ...todos.slice(0, todoIndex),
    updatedTodo,
    ...todos.slice(todoIndex + 1),
  ];

  return updatedTodo;
};

export const deleteTodo = (id: string): boolean => {
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);
  return todos.length < initialLength;
};

export const clearAllTodos = (): void => {
  todos = [];
};
