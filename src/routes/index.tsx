import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import OverviewPage from '@/pages/dashboard/OverviewPage'
import UsersPage from '@/pages/dashboard/users/UsersPage'
import CreateUserPage from '@/pages/dashboard/users/CreateUserPage'
import PostsPage from '@/pages/dashboard/posts/PostsPage'
import CreatePostPage from '@/pages/dashboard/posts/CreatePostPage'
import SettingsPage from '@/pages/dashboard/settings/SettingsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'users/create',
        element: <CreateUserPage />,
      },
      {
        path: 'posts',
        element: <PostsPage />,
      },
      {
        path: 'posts/create',
        element: <CreatePostPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
])

export default router
