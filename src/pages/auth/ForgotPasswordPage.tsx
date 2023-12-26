import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaTypes,
} from '@/lib/formValidations'
import { Link } from 'react-router-dom'

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: ForgotPasswordSchemaTypes) => {
    console.log(values)
  }

  return (
    <div className="w-full max-w-sm px-5 py-6 rounded-xl shadow-sm bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <fieldset disabled={isSubmitting} className="disabled:opacity-50 mb-4">
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-4 border-b dark:border-gray-800 pb-4">
            Request Password Reset
          </h2>
          <div className="mb-5">
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
          <Button className="w-full">Send password reset link</Button>
        </fieldset>
        <Link
          to="/"
          className="block text-center text-sm hover:underline focus:underline focus:outline-none"
        >
          Go back to login?
        </Link>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
