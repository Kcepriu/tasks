import { DeepPartial } from 'typeorm';
import HttpError from '../helpers/HttpError';
import { User } from '../entities/User';
import { IUser } from '../types/users.type';

export default class UserService {
  async findUserById(id: string): Promise<IUser | null> {
    const user = await User.findOneBy({ id });

    return user;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOneBy({ email });

    return user;
  }

  async findUserByVerificationToken(verificationToken: string): Promise<IUser | null> {
    const user = await User.findOneBy({ verificationToken });

    return user;
  }

  async findUserByResetPasswordToken(resetPasswordToken: string): Promise<IUser | null> {
    const user = await User.findOneBy({ resetPasswordToken });

    return user;
  }

  async updateUserById(id: string, data: IUser): Promise<IUser> {
    const user = await User.findOneBy({ id });

    if (!user) {
      throw HttpError(400, 'Unable to find User');
    }

    User.merge(user, data as DeepPartial<User>);
    const updateUser = await User.save(user);

    if (!updateUser) {
      throw HttpError(401, 'Email or password invalid');
    }

    return updateUser;
  }

  async createUser(data: IUser): Promise<IUser> {
    const newUser = await User.create(data as DeepPartial<User>);
    const user = await User.save(newUser);

    if (!user) {
      throw HttpError(400, 'Error create user');
    }

    return user;
  }
}
