
import { create } from 'zustand'

const loadCart = () => {
  try {
    const stored = localStorage.getItem('cart-items')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveCart = (items) => {
  localStorage.setItem('cart-items', JSON.stringify(items))
}

const useCartStore = create((set) => ({
  items: loadCart(),
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id)
      const items = existing
        ? state.items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...state.items, { ...product, quantity: 1, addedAt: Date.now() }]
      saveCart(items)
      return { items }
    }),
  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((i) => i.id !== id)
      saveCart(items)
      return { items }
    }),
  increment: (id) =>
    set((state) => {
      const items = state.items.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i)
      saveCart(items)
      return { items }
    }),
  decrement: (id) =>
    set((state) => {
      const items = state.items.map((i) => i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i)
      saveCart(items)
      return { items }
    }),
  clearCart: () => {
    saveCart([])
    return set({ items: [] })
  },
}))

export default useCartStore