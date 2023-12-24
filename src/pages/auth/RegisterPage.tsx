import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema, RegisterSchemaTypes } from '@/lib/formValidations'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  })

  const onSubmit = async (values: RegisterSchemaTypes) => {
    console.log(values)
  }

  return (
    <div className="w-full max-w-sm p-5 rounded-xl shadow-sm bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <fieldset disabled={isSubmitting} className="disabled:opacity-50 mb-4">
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-4 border-b dark:border-gray-800 pb-4">
            Account Register
          </h2>
          <div className="mb-3">
            <label htmlFor="name" className="input-label">
              Name
            </label>
            <input
              type="text"
              {...register('name')}
              id="name"
              placeholder="Your full name"
              className="input"
            />
            {errors?.name && (
              <span className="input-error">{errors.name.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              id="email"
              placeholder="Your email"
              className="input"
            />
            {errors?.email && (
              <span className="input-error">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              id="password"
              placeholder="Set password"
              className="input"
            />
            {errors?.password && (
              <span className="input-error">{errors.password.message}</span>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="confirm_password" className="input-label">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirm_password')}
              id="confirm_password"
              placeholder="Confirm password"
              className="input"
            />
            {errors?.confirm_password && (
              <span className="input-error">
                {errors.confirm_password.message}
              </span>
            )}
          </div>
          <Button className="w-full">Register</Button>
        </fieldset>
        <Link
          to="/"
          className="block text-center text-sm hover:underline focus:underline focus:outline-none"
        >
          Already have an account?
        </Link>
      </form>
    </div>
  )
}

export default RegisterPage
