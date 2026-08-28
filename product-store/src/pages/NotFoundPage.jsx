// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom"
import { PackageX } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <PackageX size={48} strokeWidth={1.5} className="text-slate-300 mb-4" />
      <h1 className="font-display text-2xl font-bold text-slate-900 mb-2">
        Page not found
      </h1>
      <p className="text-slate-600 mb-6">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/products"
        className="rounded-lg bg-teal-700 px-4 py-2 text-white hover:bg-teal-800"
      >
        Back to products
      </Link>
    </div>
  )
}