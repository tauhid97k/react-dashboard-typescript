import { ScrollArea } from '@/components/scroll-area'
import SidebarCollapse from '@/components/ui/sidebar/sidebar-collapse'
import SidebarCollapseLink from '@/components/ui/sidebar/sidebar-collapse-link'
import SidebarLink from '@/components/ui/sidebar/sidebar-link'
import { GoHome, GoPerson, GoPencil, GoGear } from 'react-icons/go'

const SidebarMenu = () => {
  return (
    <ScrollArea>
      <SidebarLink
        text="Dashboard"
        href="/dashboard"
        icon={<GoHome className="icon" />}
      />
      <SidebarCollapse
        text="Users"
        icon={<GoPerson className="icon" />}
        basePath="/dashboard/users"
      >
        <SidebarCollapseLink text="All Users" href="/dashboard/users" />
        <SidebarCollapseLink
          text="Create User"
          href="/dashboard/users/create"
        />
      </SidebarCollapse>
      <SidebarCollapse
        text="Posts"
        icon={<GoPencil className="icon" />}
        basePath="/dashboard/posts"
      >
        <SidebarCollapseLink text="All Posts" href="/dashboard/posts" />
        <SidebarCollapseLink
          text="Create Post"
          href="/dashboard/posts/create"
        />
      </SidebarCollapse>
      <SidebarLink
        text="Settings"
        href="/dashboard/settings"
        icon={<GoGear className="icon" />}
      />
    </ScrollArea>
  )
}

export default SidebarMenu
