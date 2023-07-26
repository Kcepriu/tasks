import * as yup from 'yup';
import { regexMail } from '../../common/consts/regex.const';

export const validationSchema = yup.object({
  email: yup
    .string()
    .matches(regexMail, {
      message: 'Invalid email address'
    })
    .required('Email is required'),
  password: yup.string().min(5).max(15).required('Password is required')
});
