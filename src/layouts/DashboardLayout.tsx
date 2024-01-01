import Header from '@/components/ui/header'
import Sidebar from '@/components/ui/sidebar/sidebar'
import { ScrollArea } from '@/components/scroll-area'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-[270px_1fr] h-screen bg-stone-100 dark:bg-gray-950">
      <Sidebar />
      <div className="grid grid-rows-[70px_1fr] overflow-hidden">
        <Header />
        <ScrollArea>
          <div className="p-5">
            <Outlet />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default DashboardLayout
