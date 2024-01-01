import { GoHome } from 'react-icons/go'
import { Link, useLocation } from 'react-router-dom'

const BreadCrumbs = () => {
  const location = useLocation()
  const pathNames = location.pathname.split('/').filter((crumb) => crumb !== '')

  let currentLink = ``
  const links = pathNames.map((link, index) => {
    currentLink += `/${link}`
    const isFirstChild = index === 0
    const isLastChild = index === pathNames.length - 1

    return (
      <Link to={currentLink} key={link} className="flex items-center">
        <span className="capitalize hover:text-gray-800 dark:hover:text-gray-300">
          {isFirstChild ? (
            <span className="flex items-center gap-1">
              <GoHome className="icon" />
              {link}
            </span>
          ) : (
            <span>{link}</span>
          )}
        </span>
        {isLastChild ? '' : <span className="ms-2">/</span>}
      </Link>
    )
  })

  return <ol className="flex items-center gap-2">{links}</ol>
}

export default BreadCrumbs
