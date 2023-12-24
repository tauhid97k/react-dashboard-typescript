import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

type SidebarLinkProps = {
  href: string
  icon: React.ReactNode
  text: string
}

const SidebarLink = ({ href, icon, text }: SidebarLinkProps) => {
  const pathName = useLocation().pathname
  const activeLink = pathName === href

  return (
    <NavLink
      to={href}
      className={`w-full font-medium flex items-center gap-2 rounded-lg py-2 px-4 mb-2 ${
        activeLink
          ? 'bg-blue-500 text-white'
          : 'hover:bg-gray-100 dark:hover:bg-white/5'
      }`}
    >
      <span>{icon}</span>
      <span className="text-base tracking-wide">{text}</span>
    </NavLink>
  )
}

export default SidebarLink
