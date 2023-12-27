import * as yup from 'yup'

// Register Schema
export const RegisterSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
})
export type RegisterSchemaTypes = yup.InferType<typeof RegisterSchema>

// Login Schema
export const LoginSchema = yup.object({
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string().required('Password is required'),
})
export type LoginSchemaTypes = yup.InferType<typeof LoginSchema>

// Forgot Password Schema
export const ForgotPasswordSchema = yup.object({
  email: yup.string().required('Email is required').email('Email is invalid'),
})
export type ForgotPasswordSchemaTypes = yup.InferType<
  typeof ForgotPasswordSchema
>

// Posts Schema
export const PostSearchSchema = yup.object({
  search: yup.string().typeError('Search must be string'),
})
