// src/components/ProductCard.jsx
import { Link } from "react-router-dom"
import { Star, ShoppingCart } from "lucide-react"
import useCartStore from "../store/useCartStore"
import { formatPrice, getDiscountedPrice } from "../utlls/format"

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)
      console.log(product)
  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product)

  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative block rounded-xl border border-slate-200 bg-white overflow-hidden
                 transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.discountPercentage > 10 && (
          <span className="absolute top-2 left-2 rounded-full bg-red-600 px-2 py-1 text-xs font-medium text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

  
        <div
          className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 px-3 py-2
                     transition-transform duration-200 group-hover:translate-y-0"
        >
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            <ShoppingCart size={16} strokeWidth={1.75} />
            Quick add
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-body font-medium text-slate-900 truncate transition-colors group-hover:text-teal-700">
          {product.title}
        </h3>
        <p className="text-sm text-slate-500">{product.brand}</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-teal-700">
              {formatPrice(getDiscountedPrice(product))}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-sm text-slate-600">
            <Star size={16} strokeWidth={1.75} className="fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
        </div>
      </div>
    </Link>
  )
}

