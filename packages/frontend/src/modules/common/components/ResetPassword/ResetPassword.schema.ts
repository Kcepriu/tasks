import * as yup from 'yup';

function testPasswords(value: string) {
  // @ts-ignore
  return value === this.parent.password;
}

export const validationSchema = yup.object({
  password: yup.string().min(5).max(15).required('Password is required'),
  confirmPassword: yup
    .string()
    .min(5)
    .max(15)
    .required('Password confirmation is required')
    .test('passwords-match', 'Passwords must match', testPasswords)
});
