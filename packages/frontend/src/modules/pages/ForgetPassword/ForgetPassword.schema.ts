import * as yup from 'yup';
import { regexMail } from '../../common/consts/regex.const';

export const validationSchema = yup.object({
  email: yup
    .string()
    .matches(regexMail, {
      message: 'Invalid email address'
    })
    .required('Email is required')
});
