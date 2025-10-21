import express, { Request, Response } from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Todo API Server',
    version: '1.0.0',
    endpoints: {
      todos: '/api/todos'
    }
  });
});

app.use('/api', todoRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
