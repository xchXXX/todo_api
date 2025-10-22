import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import todoRoutes from './routes/todo';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', todoRoutes);

// API info endpoint
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Todo API Server',
    version: '1.0.0',
    endpoints: {
      todos: '/api/todos'
    }
  });
});

// Start server only if not in Vercel environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
