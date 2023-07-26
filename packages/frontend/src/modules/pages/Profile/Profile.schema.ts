import * as yup from 'yup';

function testPasswords(this: yup.TestContext, value: string) {
  return value !== this.parent.password;
}

export const validationSchema = yup.object({
  password: yup.string().min(5).max(15).required('Password is required'),
  oldPassword: yup
    .string()
    .min(5)
    .max(15)
    .required('New password is required')
    .test('passwords-match', 'The new password must not be the same as the old one', testPasswords)
});
