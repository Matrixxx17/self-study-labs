// src/layouts/RootLayout.jsx
import { Link, NavLink, Outlet } from "react-router-dom"
import { Boxes, ShoppingCart, ShieldCheck } from "lucide-react"
import useCartStore from "../store/useCartStore"
import useAuthStore from "../store/useAuthStore"

export default function RootLayout() {
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  )
  const isAdmin = useAuthStore((s) => s.isAdmin)
  const toggleAdmin = useAuthStore((s) => s.toggleAdmin)

  const linkClass = ({ isActive }) =>
    `text-sm font-medium ${isActive ? "text-white" : "text-slate-300 hover:text-white"}`

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-40 bg-slate-800 px-4 sm:px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link to="/products" className="flex items-center gap-2 text-white">
            <Boxes size={24} strokeWidth={2} />
            <span className="font-display font-bold text-lg tracking-tight hidden sm:inline">
              Product Store
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/admin" className={linkClass}>Admin</NavLink>

            <button
              onClick={toggleAdmin}
              className={`hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm ${
                isAdmin
                  ? "bg-teal-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <ShieldCheck size={16} strokeWidth={1.75} />
              {isAdmin ? "Admin mode" : "Log in as admin"}
            </button>

            <NavLink to="/cart" className="relative text-slate-300 hover:text-white">
              <ShoppingCart size={22} strokeWidth={1.75} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-medium text-white">
                  {itemCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-slate-800 text-slate-300 text-center py-4 text-sm">
        Copyright content don't use it
      </footer>
    </div>
  )
}