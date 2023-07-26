import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string().min(5).max(50).required('Title is required'),
  description: yup.string().min(5).max(1000).required('Description is required')
});
