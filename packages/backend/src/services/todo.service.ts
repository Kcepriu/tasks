import { DeepPartial, SelectQueryBuilder } from 'typeorm';
import HttpError from '../helpers/HttpError';
import { Todo } from '../entities/Todo';
import { IUser } from '../types/users.type';
import { ITodo, StatusTodo } from '../types/todos.type';
import type { IParams, IRespondTodosWithCount } from '../types/servises.type';

export default class TodoService {
  private addAndWhereStatus(params: IParams, todoQuery: SelectQueryBuilder<ITodo>) {
    const status = params.status ?? '';

    if (!status) return;

    if (status === StatusTodo.Private) {
      todoQuery.andWhere('private = :private', { private: true });
      return;
    }
    if (status === StatusTodo.Public) {
      todoQuery.andWhere('private = :private', { private: false });
      return;
    }
    if (status === StatusTodo.Completed) {
      todoQuery.andWhere('completed = :completed', { completed: true });
    }
  }

  private addAndWhereDescription(params: IParams, todoQuery: SelectQueryBuilder<ITodo>) {
    const search = params.search ?? '';

    if (!search) return;

    todoQuery.andWhere('description like :search', { search: `%${search}%` });
  }

  private addPagination(params: IParams, todoQuery: SelectQueryBuilder<ITodo>) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;

    const skip = (page - 1) * limit;

    todoQuery.skip(skip).take(limit);
  }

  async findAll(user: IUser, params: IParams): Promise<IRespondTodosWithCount> {
    const userId = user.id;

    const todoQuery = Todo.createQueryBuilder('todo')
      .select()
      .where('todo.user = :userId', { userId });

    this.addAndWhereStatus(params, todoQuery);
    this.addAndWhereDescription(params, todoQuery);
    this.addPagination(params, todoQuery);

    todoQuery.orderBy('id');

    const totalCount = await todoQuery.getCount();

    const todos = await todoQuery.getMany();

    if (!todos) {
      throw HttpError(400, 'Unable to fetch Todos');
    }
    return { todos, totalCount };
  }

  async findById(id: string, user: IUser): Promise<ITodo> {
    const todo = await Todo.findOneBy({ id, user });

    if (!todo) {
      throw HttpError(400, 'Unable to find Todo');
    }
    return todo;
  }

  async addTodo(data: ITodo, user: IUser): Promise<ITodo> {
    const newTodo = await Todo.create({ ...data, user } as DeepPartial<Todo>);
    const { user: myUser, ...todo } = await Todo.save(newTodo);

    if (!todo) {
      throw HttpError(400, 'Unable to save in DataBase');
    }

    return todo;
  }

  async changeTodo(id: string, data: ITodo, user: IUser): Promise<ITodo> {
    const todo = await Todo.findOneBy({ id, user });

    if (!todo) {
      throw HttpError(400, 'Unable to find Todo');
    }

    Todo.merge(todo, data as DeepPartial<Todo>);
    const updatedTodo = await Todo.save(todo);

    return updatedTodo;
  }

  async deleteTodo(id: string, user: IUser): Promise<{ id: string }> {
    // const { affected } = await Todo.delete(id);
    const { affected } = await Todo.createQueryBuilder('todo')
      .delete()
      .where('id = :id and user = :userId', { id, userId: user.id })
      .execute();

    if (affected === 0) {
      throw HttpError(400, 'Unable to find Todo');
    }
    return { id };
  }
}
