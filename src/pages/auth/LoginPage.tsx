import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema, LoginSchemaTypes } from '@/lib/formValidations'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '@/redux/features/auth/authApi'
import { useAppDispatch } from '@/redux/hooks'
import { setCredentials } from '@/redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [login] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginSchemaTypes) => {
    const loginResponse = await login(values)

    // Login Validation
    if (loginResponse?.error?.data?.validationError) {
      loginResponse.error.data.validationError.forEach(
        ({ feedback: { type, message }, name }) => {
          setError(name, { type, message })
        }
      )
    } else if (loginResponse?.error?.data) {
      console.log(loginResponse.error.data.message) // error toast
    } else if (loginResponse?.data) {
      const accessToken = loginResponse.data.accessToken
      dispatch(
        setCredentials({
          accessToken,
        })
      )
      console.log(loginResponse.data.message) // login successful toast
      navigate('/dashboard')
    }
  }

  return (
    <div className="w-full max-w-sm px-5 py-6 rounded-xl shadow-sm bg-white dark:bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting} className="disabled:opacity-50 mb-4">
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-4 border-b dark:border-gray-800 pb-4">
            Account Login
          </h2>
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
          <div className="mb-5">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              id="password"
              placeholder="Your password"
              className="input"
            />
            {errors?.password && (
              <span className="input-error">{errors.password.message}</span>
            )}
          </div>
          <Button className="w-full">Login</Button>
        </fieldset>
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <Link
            to="/register"
            className="block text-center text-sm hover:underline focus:underline focus:outline-none"
          >
            Do not have an account?
          </Link>
          <Link
            to="/forgot-password"
            className="block text-center text-sm hover:underline focus:underline focus:outline-none"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
