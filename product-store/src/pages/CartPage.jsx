// src/pages/CartPage.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import useCartStore from '../store/useCartStore'
import Modal from '../component/Modal'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const increment = useCartStore((s) => s.increment)
  const decrement = useCartStore((s) => s.decrement)
  const removeItem = useCartStore((s) => s.removeItem)

  const [confirmRemoveId, setConfirmRemoveId] = useState(null)

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag size={48} strokeWidth={1.5} className="text-slate-300 mb-4" />
        <p className="text-slate-600 mb-4">Your cart is empty.</p>
        <Link
          to="/products"
          className="rounded-lg bg-teal-700 px-4 py-2 text-white hover:bg-teal-800"
        >
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-slate-200 p-4"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-slate-900 truncate">{item.title}</h3>
              <p className="text-sm text-slate-500">₹{item.price} each</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decrement(item.id)}
                className="rounded-full border border-slate-300 p-1.5 hover:bg-slate-100"
              >
                <Minus size={14} strokeWidth={2} />
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => increment(item.id)}
                className="rounded-full border border-slate-300 p-1.5 hover:bg-slate-100"
              >
                <Plus size={14} strokeWidth={2} />
              </button>
            </div>

            <p className="font-medium text-slate-900 w-20 text-right">
              ₹{item.price * item.quantity}
            </p>

            <button
              onClick={() => setConfirmRemoveId(item.id)}
              aria-label="Remove item"
              className="text-slate-400 hover:text-red-600"
            >
              <Trash2 size={18} strokeWidth={1.75} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <p className="font-display text-xl font-bold">
          Total: ₹{total}
        </p>
      </div>

      <Modal
        isOpen={confirmRemoveId !== null}
        onClose={() => setConfirmRemoveId(null)}
        title="Remove item?"
      >
        <p className="text-slate-600 mb-4">
          This will remove the item from your cart.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setConfirmRemoveId(null)}
            className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              removeItem(confirmRemoveId)
              setConfirmRemoveId(null)
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </Modal>
    </div>
  )
}