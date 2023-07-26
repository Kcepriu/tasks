import { Router } from 'express';
import isExist from '../../middlewares/isExist';
import validateBody from '../../middlewares/validateBody';
import tryCatch from '../../helpers/tryCatch';
import { schemaAddTodo } from '../../schemas/todoSchema';
import { Todo } from '../../entities/Todo';
import todoController from '../../controllers/todo.controller';
import { auth } from '../../middlewares/auth';

const todosRouter: Router = Router();

todosRouter.get('', auth, tryCatch(todoController.getAllTodo.bind(todoController)));
todosRouter.get(
  '/:id',
  auth,
  isExist(Todo),
  tryCatch(todoController.getTodoById.bind(todoController))
);
todosRouter.post(
  '/',
  auth,
  validateBody(schemaAddTodo),
  tryCatch(todoController.addTodo.bind(todoController))
);
todosRouter.put(
  '/:id',
  auth,
  isExist(Todo),
  tryCatch(todoController.changeTodo.bind(todoController))
);
todosRouter.delete(
  '/:id',
  auth,
  isExist(Todo),
  tryCatch(todoController.deleteTodo.bind(todoController))
);

export default todosRouter;
