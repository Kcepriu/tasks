export interface IUser {
  id: string;
  email: string;
  password: string;
  accessToken: string;
  verify: boolean;
  verificationToken: string;
  resetPasswordToken: string;
}
