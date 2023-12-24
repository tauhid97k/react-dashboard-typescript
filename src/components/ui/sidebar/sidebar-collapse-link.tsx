import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const SidebarCollapseLink = ({
  href,
  text,
}: {
  href: string
  text: string
}) => {
  const pathName = useLocation().pathname
  const activeLink = pathName === href

  return (
    <NavLink
      to={href}
      className={`relative flex gap-2 items-center py-1 pl-6 before:content-[''] before:absolute before:block before:w-4 before:h-[45px] before:left-0 before:bottom-[calc(50%-2px)] before:border-l-2 before:border-b-2 before:border-gray-300 dark:before:border-gray-700 transition-colors ${
        activeLink
          ? 'text-gray-900 dark:text-gray-200'
          : 'hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
      }`}
    >
      <span>{text}</span>
    </NavLink>
  )
}

export default SidebarCollapseLink
