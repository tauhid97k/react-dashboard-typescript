import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main>
      <div className="bg-stone-100 dark:bg-gray-950">
        <div className="container min-h-screen py-4 grid place-items-center">
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default AuthLayout
