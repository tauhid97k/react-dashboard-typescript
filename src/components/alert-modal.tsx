import * as Dialog from '@radix-ui/react-dialog'
import { Button } from './ui/button'
import { AiOutlineClose } from 'react-icons/ai'
import { useRef } from 'react'

const AlertModal = ({
  type,
  isModalOpen,
  setModalOpen,
  title,
  description,
  actionText,
  actionFn,
}: {
  type: 'ALERT' | 'CONFIRM'
  isModalOpen: boolean
  setModalOpen: () => void
  title: string
  description: string
  actionText?: string
  actionFn: () => void
}) => {
  const initialFocusRef = useRef<HTMLButtonElement>(null)

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setModalOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/60 z-10 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out duration-500" />
      <Dialog.Portal>
        <Dialog.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            initialFocusRef.current?.focus()
          }}
          className="card max-w-xl fixed top-1/4 left-1/2 -translate-y-1/4 -translate-x-1/2 z-20 data-[state=open]:animate-modal-show data-[state=closed]:animate-modal-hide"
        >
          <div className="flex justify-between items-center gap-2">
            <Dialog.Title
              className={`text-xl ${
                type === 'ALERT' ? 'text-red-400' : 'text-gray-600'
              }`}
            >
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="outline" size="icon-sm">
                <AiOutlineClose className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
              </Button>
            </Dialog.Close>
          </div>
          <p className="mt-4 mb-6">{description}</p>
          <div className="flex justify-end items-center gap-2">
            <Dialog.Close asChild>
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              ref={initialFocusRef}
              onClick={() => {
                actionFn()
                setModalOpen()
              }}
              variant={type === 'ALERT' ? 'destructive' : 'default'}
              size="sm"
            >
              {actionText ? actionText : 'Yes, Confirm'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default AlertModal
