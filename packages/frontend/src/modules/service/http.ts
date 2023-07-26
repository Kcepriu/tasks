import axios, { AxiosInstance } from 'axios';
import type { ITodo, IParamsTodo, ITodosWithCount } from '../common/types/todo.types';
import type { IUser, IRequestUser, IRequestChangePassword } from '../common/types/user.types';
import { BACKEND_KEYS, STORAGE_KEYS } from '../common/consts/app-keys.const';

class HttpService {
  private accessToken: string = '';

  private instance: AxiosInstance;

  constructor() {
    const baseUrl = process.env.REACT_APP_BASE_URL || '';
    this.instance = axios.create({ baseURL: baseUrl });
    this.setAuthHeader(this.readTokenFromLocalSrorage());
  }

  private readTokenFromLocalSrorage(): string {
    try {
      const data: string = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN_AUTH) || '';
      return data;
    } catch {
      return '';
    }
  }

  private saveTokenToLocalStorage(token: string) {
    localStorage.setItem(STORAGE_KEYS.JWT_TOKEN_AUTH, token);
  }

  setAuthHeader = (accessToken: string) => {
    this.accessToken = accessToken;
    this.instance.defaults.headers.common.Authorization = accessToken
      ? `Bearer ${accessToken}`
      : '';
    this.saveTokenToLocalStorage(this.accessToken);
  };

  // * Todo
  async fetchAllTodos(params: IParamsTodo): Promise<ITodosWithCount> {
    const { data: responsData } = await this.instance.get(BACKEND_KEYS.TODOS, {
      params
    });

    const { code, data: todos, total_count: totalCount } = responsData;
    if (code !== 200) return { todos: [], totalCount: 0 };

    return { todos, totalCount };
  }

  async fetchTodoById(id: string): Promise<ITodo | null> {
    const { data: responsData } = await this.instance.get(`${BACKEND_KEYS.TODOS}/${id}`);

    const { code, data } = responsData;
    if (code !== 200) return null;

    return data;
  }

  async deleteTodo(id: string): Promise<string | null> {
    const { data: responsData } = await this.instance.delete(`${BACKEND_KEYS.TODOS}/${id}`);

    const { code, data } = responsData;
    if (code !== 200) return null;

    return data.id;
  }

  async updateTodo(id: string, todo: ITodo): Promise<ITodo | null> {
    const { data: responsData } = await this.instance.put(`${BACKEND_KEYS.TODOS}/${id}`, todo);

    const { code, data } = responsData;
    if (code !== 200) return null;

    return data;
  }

  async createTodo(todo: ITodo): Promise<ITodo | null> {
    const { id, ...newTodo } = todo;

    const { data: responsData } = await this.instance.post(BACKEND_KEYS.TODOS, newTodo);

    const { code, data } = responsData;
    if (code !== 201) return null;

    return data;
  }

  // *  Authorization
  async getCurrentUser(): Promise<IUser | null> {
    if (!this.accessToken) return null;

    const { data: responsData } = await this.instance.get(BACKEND_KEYS.CURRENT_USER);

    const { code, data } = responsData;
    if (code !== 200) return null;

    return data;
  }

  async login(user: IRequestUser): Promise<IUser> {
    const { data: responsData } = await this.instance.post(BACKEND_KEYS.LOGIN, user);

    const { code, data } = responsData;
    if (code !== 200) throw new Error();

    return data.user;
  }

  async register(user: IRequestUser): Promise<string> {
    const { data: responsData } = await this.instance.post(BACKEND_KEYS.REGISTER, user);

    const { code, message } = responsData;
    if (code !== 200) throw new Error();

    return message;
  }

  async logout(): Promise<boolean> {
    const { data: responsData } = await this.instance.post(BACKEND_KEYS.LOGOUT);

    const { code } = responsData;
    if (code !== 200) return false;

    return true;
  }

  async changePassword(user: IRequestChangePassword): Promise<IUser> {
    const { data: responsData } = await this.instance.post(BACKEND_KEYS.CHANGE_PASSWORD, user);

    const { code, data } = responsData;
    if (code !== 200) throw new Error();

    return data.user;
  }

  async sendVerify(user: IRequestUser): Promise<boolean> {
    const { data: responsData } = await this.instance.post(BACKEND_KEYS.SEND_VERIFY, user);

    const { code } = responsData;
    if (code !== 200) return false;

    return true;
  }

  async sendResetPassword(user: IRequestUser): Promise<string> {
    const { data: responsData } = await this.instance.post(BACKEND_KEYS.SENT_RESET_PASWORD, user);

    const { code, message } = responsData;
    if (code !== 200) throw new Error();

    return message;
  }

  async verify(token: string): Promise<IUser> {
    if (!token) throw new Error();

    const { data: responsData } = await this.instance.get(`${BACKEND_KEYS.SEND_VERIFY}/${token}`);

    const { code, data } = responsData;
    if (code !== 200) throw new Error();

    return data.user;
  }

  async resetPassword(user: IRequestUser, token: string): Promise<IUser> {
    const { data: responsData } = await this.instance.post(
      `${BACKEND_KEYS.SENT_RESET_PASWORD}/${token}`,
      user
    );

    const { code, data } = responsData;
    if (code !== 200) throw new Error();

    return data.user;
  }
}

const httpServises = new HttpService();

export default httpServises;
