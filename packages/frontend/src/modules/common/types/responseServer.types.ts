import type { ITodo } from './todo.types';
import { IUser } from './user.types';

export interface IResponse {
  code: number;
  message?: string;
}

export interface IResponseTodos extends IResponse {
  data?: ITodo[];
}

export interface IResponseTodo extends IResponse {
  data?: ITodo;
}

export interface IResponseDeleteTodo extends IResponse {
  data: {
    id: string;
  };
}

export interface IResponseUser extends IResponse {
  data: IUser;
}

export interface IResponseUserToken extends IResponse {
  data: {
    user: IUser;
    accessToken: string;
  };
}

export interface IResponseErr {
  response: {
    data: {
      message: string;
      code: number;
    };
  };
}
