export interface ITodo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  private: boolean;
}

export const emptyTodo: ITodo = {
  id: '',
  title: '',
  description: '',
  completed: false,
  private: false
};

export interface IParamsTodo {
  [key: string]: string;
}

export interface ITodosWithCount {
  todos: ITodo[];
  totalCount: number;
  currentPage?: number;
}

export enum StatusTodo {
  Empty = '',
  All = 'all',
  Private = 'private',
  Public = 'public',
  Completed = 'completed'
}

export const EmptyTodosWithCount = {
  todos: [],
  totalCount: 0
};
