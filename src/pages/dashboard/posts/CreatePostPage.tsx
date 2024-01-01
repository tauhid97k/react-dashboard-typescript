import PageHeader from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { GoArrowLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

const CreatePostPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader>
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
          <GoArrowLeft className="btn-icon" />
          <span>Go Back</span>
        </Button>
      </PageHeader>
      <div className="card"></div>
    </>
  )
}

export default CreatePostPage
