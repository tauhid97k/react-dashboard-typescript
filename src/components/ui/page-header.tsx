import BreadCrumbs from './breadcrumbs'

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between items-center gap-4 mb-5">
      <BreadCrumbs />
      {children}
    </div>
  )
}

export default PageHeader
