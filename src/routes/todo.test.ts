import request from 'supertest';
import express, { Express } from 'express';
import todoRoutes from './todo';
import * as TodoService from '../services/TodoService';

describe('POST /todos', () => {
  let app: Express;

  beforeEach(() => {
    // Create a fresh Express app for each test
    app = express();
    app.use(express.json());
    app.use('/api', todoRoutes);

    // Clear all todos before each test
    TodoService.clearAllTodos();
  });

  it('should create a new todo and return 201 status', async () => {
    const newTodo = {
      title: 'Test Todo',
      completed: false,
    };

    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(response.body.title).toBe('Test Todo');
    expect(response.body.completed).toBe(false);
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
  });

  it('should create a todo with default completed status when not provided', async () => {
    const newTodo = {
      title: 'Test Todo Without Completed',
    };

    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .expect(201);

    expect(response.body.completed).toBe(false);
  });

  it('should return the created todo with all required fields', async () => {
    const newTodo = {
      title: 'Complete Project',
      completed: true,
    };

    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('completed');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.title).toBe('Complete Project');
    expect(response.body.completed).toBe(true);
  });
});
