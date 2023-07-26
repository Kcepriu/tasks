export interface ITodo {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  private: boolean;
}

export enum StatusTodo {
  Empty = '',
  All = 'all',
  Private = 'private',
  Public = 'public',
  Completed = 'completed'
}
