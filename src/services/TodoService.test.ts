import * as TodoService from './TodoService';
import { CreateTodoDto } from '../models/todo.model';

describe('TodoService', () => {
  beforeEach(() => {
    // Clear all todos before each test
    TodoService.clearAllTodos();
  });

  describe('createTodo', () => {
    it('should create a todo', () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Test Todo',
        completed: false,
      };

      const createdTodo = TodoService.createTodo(createTodoDto);

      expect(createdTodo).toBeDefined();
      expect(createdTodo.id).toBeDefined();
      expect(typeof createdTodo.id).toBe('string');
      expect(createdTodo.title).toBe('Test Todo');
      expect(createdTodo.completed).toBe(false);
      expect(createdTodo.createdAt).toBeInstanceOf(Date);
      expect(createdTodo.updatedAt).toBeInstanceOf(Date);
    });

    it('should create a todo with default completed status as false', () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Test Todo Without Completed',
      };

      const createdTodo = TodoService.createTodo(createTodoDto);

      expect(createdTodo.completed).toBe(false);
    });

    it('should add the created todo to the todos list', () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Test Todo',
      };

      const createdTodo = TodoService.createTodo(createTodoDto);
      const allTodos = TodoService.getAllTodos();

      expect(allTodos).toHaveLength(1);
      expect(allTodos[0]).toEqual(createdTodo);
    });
  });
});
