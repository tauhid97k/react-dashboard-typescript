import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IoPerson } from 'react-icons/io5'
import { LuLogOut, LuUser2 } from 'react-icons/lu'
import { RxMoon, RxSun, RxHamburgerMenu } from 'react-icons/rx'
import { selectDarkMode, toggleDarkMode } from '@/redux/features/darkModeSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

const Header = () => {
  const isDarkMode = useAppSelector(selectDarkMode)
  const dispatch = useAppDispatch()

  const handleDarkMode = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <header className="flex items-center justify-between px-5 shadow-sm bg-white dark:bg-gray-900 border-y dark:border-gray-800">
      <Button variant="ghost" size="icon">
        <RxHamburgerMenu className="header-icon" />
      </Button>

      <div className="flex gap-4 items-center">
        <Button variant="ghost" size="icon" onClick={handleDarkMode}>
          {isDarkMode ? (
            <RxSun className="header-icon" />
          ) : (
            <RxMoon className="header-icon" />
          )}
        </Button>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="outline-none focus:ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-gray-300 dark:ring-gray-700/60 rounded-full">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/40?img=12" alt="avatar" />
              <AvatarFallback>
                <IoPerson className="icon" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <LuUser2 className="dropdown-icon" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LuLogOut className="dropdown-icon" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
