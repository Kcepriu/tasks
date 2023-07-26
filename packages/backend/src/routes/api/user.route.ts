import { Router } from 'express';
import validateBody from '../../middlewares/validateBody';
import tryCatch from '../../helpers/tryCatch';
import {
  schemaAuthorize,
  schemaChangePassword,
  schemaSendVerificationToken,
  schemaSendResetPasswordToken,
  schemaResetPassword
} from '../../schemas/userSchema';
import userController from '../../controllers/user.controller';
import { auth } from '../../middlewares/auth';

const userRouter: Router = Router();

userRouter.get('/current', auth, tryCatch(userController.currentUser.bind(userController)));

// * Login
userRouter.post(
  '/login',
  validateBody(schemaAuthorize),
  tryCatch(userController.login.bind(userController))
);

// * Register
userRouter.post(
  '/register',
  validateBody(schemaAuthorize),
  tryCatch(userController.register.bind(userController))
);

// *Logout
userRouter.post('/logout', auth, tryCatch(userController.logout.bind(userController)));

// * Change pass
userRouter.post(
  '/change_pass',
  auth,
  validateBody(schemaChangePassword),
  tryCatch(userController.updateUser.bind(userController))
);

// * Send Verification Email Token
userRouter.post(
  '/verify',
  validateBody(schemaSendVerificationToken),
  tryCatch(userController.sendVerificationToken.bind(userController))
);

// * Verification Email Token
userRouter.get(
  '/verify/:verificationToken',
  tryCatch(userController.verificationToken.bind(userController))
);

// * Send Reset password
userRouter.post(
  '/reset_password',
  validateBody(schemaSendResetPasswordToken),
  tryCatch(userController.sendResetPassword.bind(userController))
);

// * Reset password
userRouter.post(
  '/reset_password/:resetPasswordToken',
  validateBody(schemaResetPassword),
  tryCatch(userController.resetPassword.bind(userController))
);

export default userRouter;
