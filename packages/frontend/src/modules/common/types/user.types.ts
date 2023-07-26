export interface IUser {
  id: string;
  email: string;
  accessToken?: string;
}

export interface IRequestUser {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IRequestChangePassword {
  oldPassword: string;
  password: string;
  email?: string;
}
