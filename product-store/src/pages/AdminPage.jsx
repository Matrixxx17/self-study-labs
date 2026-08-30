// src/pages/AdminPage.jsx
import { useState } from 'react'
import { Plus } from 'lucide-react'
import Modal from '../component/Modal'
import CreateProductForm from '../component/CreateProductForm'
import { useToggle } from '../hooks/useToggle'
export default function AdminPage() {
const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useToggle()
  const [successMessage, setSuccessMessage] = useState('')

  const handleSuccess = (createdProduct) => {
    closeModal()
    setSuccessMessage(`Product created successfully with id ${createdProduct.id}`)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Admin</h1>
        <button
          onClick={openModal}
          className="flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-white hover:bg-teal-800"
        >
          <Plus size={18} strokeWidth={1.75} />
          Add product
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 rounded-lg bg-teal-50 border border-teal-200 px-4 py-3 text-teal-800 text-sm">
          {successMessage}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add product"
      >
        <CreateProductForm onSuccess={handleSuccess} />
      </Modal>
    </div>
  )
}