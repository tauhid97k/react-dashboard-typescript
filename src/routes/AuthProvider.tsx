import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  selectIsAuthenticated,
  setCredentials,
} from '../redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useRefreshTokenQuery } from '../redux/features/auth/authApi'

export const AuthContext = createContext(false)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, isSuccess, data } = useRefreshTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  })
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const [hasNavigation, setHasNavigation] = useState(false)

  useEffect(() => {
    const handleNavigation = () => {
      if (isLoading) {
        return
      }

      if (isSuccess) {
        dispatch(setCredentials({ accessToken: data.accessToken }))
      }

      if (isAuthenticated) {
        navigate('/dashboard')
      } else {
        navigate('/')
      }

      setHasNavigation(true)
    }

    handleNavigation()
  }, [isLoading, isSuccess, data, isAuthenticated, navigate, dispatch])

  if (!hasNavigation) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
