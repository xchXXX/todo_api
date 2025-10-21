# Todo API Architecture

This document describes the architecture and design patterns for the Todo API application.

## Overview

This is a RESTful API for managing todo items, built with Node.js, Express, and TypeScript. The application follows a layered architecture pattern with clear separation of concerns.

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Testing:** Jest with ts-jest
- **Data Storage:** In-memory array (temporary)

## Project Structure

```
src/
├── models/              # Data models and TypeScript interfaces
│   └── todo.model.ts    # Todo interface and types
├── services/            # Business logic layer
│   └── todo.service.ts  # Todo CRUD operations and data access
├── controllers/         # Request/response handlers
│   └── todo.controller.ts
├── routes/              # API route definitions
│   └── todo.routes.ts   # Todo endpoints configuration
├── middleware/          # Custom middleware functions
│   └── error.middleware.ts  # Global error handler
├── utils/               # Utility functions
│   └── uuid.ts          # UUID generation helper
└── index.ts             # Application entry point
```

## Architecture Layers

### 1. Models Layer (`src/models/`)

Defines the data structures and TypeScript interfaces used throughout the application.

**Todo Model Interface:**

```typescript
interface Todo {
  id: string;           // Unique identifier (UUID)
  title: string;        // Todo title/description
  completed: boolean;   // Completion status
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}

interface CreateTodoDto {
  title: string;
  completed?: boolean;  // Optional, defaults to false
}

interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
}
```

### 2. Services Layer (`src/services/`)

Contains the business logic and data access operations. This layer is responsible for:
- Managing the in-memory data store
- Implementing CRUD operations
- Data validation and business rules
- Generating unique IDs and timestamps

**In-Memory Data Store:**

```typescript
// Stored as a private array within the service
let todos: Todo[] = [];
```

**Service Methods:**
- `getAllTodos()` - Retrieve all todos
- `getTodoById(id: string)` - Find a specific todo
- `createTodo(data: CreateTodoDto)` - Create a new todo
- `updateTodo(id: string, data: UpdateTodoDto)` - Update existing todo
- `deleteTodo(id: string)` - Remove a todo
- `clearAllTodos()` - Clear all todos (useful for testing)

### 3. Controllers Layer (`src/controllers/`)

Handles HTTP request/response logic. Controllers are responsible for:
- Extracting data from requests (body, params, query)
- Calling appropriate service methods
- Formatting responses
- Handling errors and sending appropriate HTTP status codes

**Controller Methods:**
- `getTodos` - GET /api/todos
- `getTodoById` - GET /api/todos/:id
- `createTodo` - POST /api/todos
- `updateTodo` - PUT /api/todos/:id
- `deleteTodo` - DELETE /api/todos/:id

### 4. Routes Layer (`src/routes/`)

Defines the API endpoints and maps them to controller methods.

**API Endpoints:**

```
GET    /api/todos       - Get all todos
GET    /api/todos/:id   - Get a single todo by ID
POST   /api/todos       - Create a new todo
PUT    /api/todos/:id   - Update an existing todo
DELETE /api/todos/:id   - Delete a todo
```

### 5. Middleware Layer (`src/middleware/`)

Custom middleware for cross-cutting concerns:
- Error handling middleware
- Request validation (future enhancement)
- Logging (future enhancement)

## Data Flow

```
Client Request
    ↓
Express Router (routes/)
    ↓
Controller (controllers/)
    ↓
Service (services/)
    ↓
In-Memory Store (Array)
    ↓
Service (services/)
    ↓
Controller (controllers/)
    ↓
Express Response
    ↓
Client Response
```

## API Response Format

### Success Response

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Complete the project",
  "completed": false,
  "createdAt": "2025-10-21T10:30:00.000Z",
  "updatedAt": "2025-10-21T10:30:00.000Z"
}
```

### Error Response

```json
{
  "error": "Error message here",
  "statusCode": 404
}
```

## HTTP Status Codes

- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Todo not found
- `500 Internal Server Error` - Server error

## Development Commands

```bash
# Start development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run production build
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## Testing Strategy

- **Unit Tests:** Test individual functions in services and controllers
- **Integration Tests:** Test API endpoints end-to-end
- **Test Files:** Place tests alongside source files with `.test.ts` extension

Example: `src/services/todo.service.test.ts`

## Future Enhancements

### Short Term
- Input validation middleware using a library like `express-validator`
- Request logging middleware
- API documentation with Swagger/OpenAPI

### Long Term
- Replace in-memory storage with a real database (MongoDB, PostgreSQL)
- Add authentication and authorization
- Implement pagination for todo lists
- Add filtering and sorting capabilities
- Support for todo categories/tags
- User-specific todos (multi-tenancy)

## Design Principles

1. **Separation of Concerns:** Each layer has a specific responsibility
2. **Single Responsibility:** Each module does one thing well
3. **Dependency Injection:** Services are injected into controllers (loose coupling)
4. **DRY (Don't Repeat Yourself):** Shared logic is extracted into utilities
5. **Type Safety:** Leverage TypeScript for compile-time type checking
6. **Testability:** Layered architecture makes unit testing easier

## Error Handling

- Controllers catch errors from services
- Global error middleware handles uncaught errors
- All errors include meaningful messages and appropriate status codes
- Validation errors return 400 with descriptive messages
- Not found errors return 404
- Server errors return 500

## Notes on In-Memory Storage

**Advantages:**
- Simple to implement
- Fast access
- No external dependencies
- Perfect for prototyping and testing

**Limitations:**
- Data is lost when server restarts
- Not suitable for production
- No persistence
- Limited scalability
- No concurrent access control

**Migration Path:**
When ready to add persistence, only the service layer needs to be modified. The controllers and routes remain unchanged, demonstrating the benefit of layered architecture.
