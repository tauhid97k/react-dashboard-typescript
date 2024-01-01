import { useLocation } from 'react-router-dom'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/collapsible'
import { useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi'

type SidebarCollapseProps = {
  children: React.ReactNode
  icon: React.ReactNode
  text: string
  basePath: string
}

const SidebarCollapse = ({
  children,
  icon,
  text,
  basePath,
}: SidebarCollapseProps) => {
  const [open, setOpen] = useState(false)
  const pathName = useLocation().pathname
  const activePath = pathName.startsWith(basePath)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          className={`w-full font-medium flex justify-between items-center gap-2 rounded-lg py-2 px-4 mb-2 ${
            activePath
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100 dark:hover:bg-white/5'
          }`}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-base tracking-wide">{text}</span>
          </div>
          <HiOutlineChevronDown
            className={`w-5 h-5 transition ${open ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-[1.6rem] mb-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default SidebarCollapse
