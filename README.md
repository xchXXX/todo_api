# Todo API

A RESTful API for managing todos, built with Node.js, Express, and TypeScript following Test-Driven Development (TDD) principles.

## Features

- ✅ RESTful API design
- ✅ TypeScript for type safety
- ✅ Functional programming style
- ✅ Comprehensive test coverage (Unit + Integration tests)
- ✅ CORS enabled for frontend integration
- ✅ In-memory storage (ready for database integration)

## Tech Stack

- **Runtime:** Node.js (>=18.0.0)
- **Framework:** Express.js
- **Language:** TypeScript
- **Testing:** Jest + Supertest
- **Architecture:** Layered (Models → Services → Controllers → Routes)

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Health Check
```
GET /
```
Returns API information and available endpoints.

#### Create Todo
```
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "completed": false
}
```

Response (201 Created):
```json
{
  "id": "1729508400000-abc123def",
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2025-10-21T09:00:00.000Z",
  "updatedAt": "2025-10-21T09:00:00.000Z"
}
```

## Development

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd test

# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.example .env
```

### Running the Application

```bash
# Development mode with auto-reload
npm run dev

# Build TypeScript
npm run build

# Production mode
npm start
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Project Structure

```
src/
├── models/              # TypeScript interfaces and types
│   └── todo.model.ts
├── services/            # Business logic (functional style)
│   ├── TodoService.ts
│   └── TodoService.test.ts
├── controllers/         # Request/response handlers
│   └── TodoController.ts
├── routes/              # API route definitions
│   ├── todo.ts
│   └── todo.test.ts
├── utils/               # Helper functions
│   └── uuid.ts
└── index.ts             # Application entry point
```

## Deployment

This application is deployment-ready for multiple platforms:

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts and your API will be live!

### Railway.app

1. Connect your GitHub repository to Railway
2. Railway will auto-detect the Node.js project
3. Deploy with one click

### Render.com

1. Create a new Web Service
2. Connect your GitHub repository
3. Build Command: `npm run build`
4. Start Command: `npm start`

### Environment Variables

For production deployment, set:
- `PORT` - Server port (auto-set by most platforms)
- `NODE_ENV` - Set to `production`

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## Contributing

This project follows TDD principles. Before making changes:

1. Write failing tests
2. Implement minimal code to pass tests
3. Refactor
4. Run `npm test` to ensure all tests pass

See [CLAUDE.md](./CLAUDE.md) for project-specific rules.

## License

ISC
