import { useState } from "react"
import { ShoppingCart, Search, Star } from "lucide-react"
import Modal from "../component/Modal"
 
export default function ProductsPage() {
  const [isOpen, setIsOpen] = useState(false)
 
  return (
    <div className="p-10">
 
      <div className="flex items-center gap-3">

 
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Product Store
        </h1>
 
      </div>
 
 

      <div className="mt-8 flex gap-6">
 
        <button className="flex items-center gap-2">
          <ShoppingCart size={20} />
          Cart
        </button>
 
        <button className="flex items-center gap-2">
          <Search size={20} />
          Search
        </button>
 
        <button className="flex items-center gap-2">
          <Star size={20} />
          Featured
        </button>
 
      </div>
 
 

      <button
        onClick={() => setIsOpen(true)}
        className="ml-100 mt-8 rounded-lg bg-teal-700 px-5 py-3 text-white hover:bg-teal-800"
      >
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Modal"
      >
        <p className="leading-relaxed">
          This is my reusable modal component.
        </p>
      </Modal>
 
    </div>
  )
}