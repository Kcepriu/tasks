import Joi from 'joi';
import { emailRegExp } from '../constants/regExp.constants';

export const schemaAuthorize = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(5).max(15).required()
});

export const schemaChangePassword = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(5).max(15).required(),
  oldPassword: Joi.string().min(5).max(15).required()
});

export const schemaSendVerificationToken = Joi.object({
  email: Joi.string().pattern(emailRegExp).required()
});

export const schemaSendResetPasswordToken = Joi.object({
  email: Joi.string().pattern(emailRegExp).required()
});

export const schemaResetPassword = Joi.object({
  password: Joi.string().min(5).max(15).required(),
  confirmPassword: Joi.string().min(5).max(15).required()
});
