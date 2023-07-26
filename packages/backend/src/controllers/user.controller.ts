import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import HttpError from '../helpers/HttpError';
import UserService from '../services/user.service';
import { createToken } from '../helpers/crypto';
import { RequestType } from '../types/servises.type';
import { IUser } from '../types/users.type';
import mailServices from '../services/email.service';

export class UserController {
  constructor(private userService: UserService) {}

  private getUserToReply(user: IUser) {
    const {
      password: userPass,
      verify,
      verificationToken,
      resetPasswordToken,

      ...updateUser
    } = user;
    return updateUser;
  }

  // * currentUser
  async currentUser(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, 'Not authorized');
    }
    const { password, verify, verificationToken, resetPasswordToken, ...foundUser } = user;

    res.status(200).json({ code: 200, data: foundUser });
  }

  // * Login
  async login(req: Request, res: Response) {
    const { email = '', password = '' } = req.body;

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw HttpError(401, 'Email or password invalid');
    }

    if (!user?.verify) {
      throw HttpError(401, 'Email not confirmed');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw HttpError(401, 'Email or password invalid');
    }

    const accessToken = createToken({ id: user.id });

    const newUser = await this.userService.updateUserById(user.id, {
      ...user,
      accessToken,
      resetPasswordToken: ''
    });

    const updateUser = this.getUserToReply(newUser);

    res.status(200).json({ code: 200, data: { accessToken, user: updateUser } });
  }

  // * Logout
  async logout(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, 'Not authorized');
    }

    await this.userService.updateUserById(user.id, {
      ...user,
      accessToken: ''
    });

    res.status(200).json({ code: 200, message: 'Successful logout' });
  }

  // * Register
  async register(req: Request, res: Response) {
    const { email = '', password = '' } = req.body;

    const user = await this.userService.findUserByEmail(email);

    if (user) {
      throw HttpError(409, 'Email already in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    const newUser = await this.userService.createUser({
      ...req.body,
      password: hashPassword,
      verificationToken
    });

    mailServices.sendVerificateToken(newUser);

    res.status(200).json({ code: 200, message: 'Verification email sent' });
  }

  // * Update User
  async updateUser(req: Request, res: Response) {
    const { password = '', oldPassword = '' } = req.body;

    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, 'Not authorized');
    }

    const passwordCompare = await bcrypt.compare(oldPassword, user.password);

    if (!passwordCompare) {
      throw HttpError(401, 'Password invalid');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const accessToken = createToken({ id: user.id });

    const newUser = await this.userService.updateUserById(user.id, {
      ...user,
      accessToken,
      password: hashPassword
    });

    const updateUser = this.getUserToReply(newUser);

    res.status(200).json({ code: 200, data: { accessToken, user: updateUser } });
  }

  // * Send Verification Token
  async sendVerificationToken(req: Request, res: Response) {
    const { email } = req.body;
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw HttpError(401, 'Email invalid');
    }

    if (user.verify) {
      throw HttpError(400, 'Verification has already been passed');
    }

    mailServices.sendVerificateToken(user);
    res.status(200).json({ code: 200, message: 'Verification email sent' });
  }

  // * Verification Token
  async verificationToken(req: Request, res: Response) {
    const user = await this.userService.findUserByVerificationToken(req.params.verificationToken);

    if (!user || user.verify) {
      throw HttpError(404, 'User not found');
    }

    const accessToken = createToken({ id: user.id });

    const newUser = await this.userService.updateUserById(user.id, {
      ...user,
      verify: true,
      accessToken,
      resetPasswordToken: ''
    });

    const updateUser = this.getUserToReply(newUser);

    res.status(200).json({ code: 200, data: { accessToken, user: updateUser } });
  }

  // * Send Reset Password
  async sendResetPassword(req: Request, res: Response) {
    const { email } = req.body;
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw HttpError(401, 'Email invalid');
    }

    if (!user.verify) {
      throw HttpError(400, 'The user is not yet authorized');
    }

    const resetPasswordToken = uuidv4();

    const newUser = await this.userService.updateUserById(user.id, {
      ...user,
      resetPasswordToken
    });

    mailServices.sendResetPasswordToken(newUser);

    res.status(200).json({ code: 200, message: 'Reset password sent' });
  }

  // ! reset Password
  async resetPassword(req: Request, res: Response) {
    const user = await this.userService.findUserByResetPasswordToken(req.params.resetPasswordToken);
    const { password = '' } = req.body;

    if (!user) {
      throw HttpError(404, 'User not found');
    }

    const accessToken = createToken({ id: user.id });
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.updateUserById(user.id, {
      ...user,
      accessToken,
      password: hashPassword,
      resetPasswordToken: ''
    });

    const updateUser = this.getUserToReply(newUser);

    res.status(200).json({ code: 200, data: { accessToken, user: updateUser } });
  }
}

const userController = new UserController(new UserService());
export default userController;
