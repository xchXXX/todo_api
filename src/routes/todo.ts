import { Router } from 'express';
import * as TodoController from '../controllers/TodoController';

const router = Router();

router.post('/todos', TodoController.createTodo);

export default router;
