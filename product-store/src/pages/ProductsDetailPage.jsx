// src/pages/ProductDetailPage.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, ArrowLeft, ShoppingCart } from 'lucide-react'
import api from '../api/axiosInstance'
import StateBlock from '../component/StateBlock'
import useCartStore from '../store/useCartStore'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)

  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')
  const [activeImage, setActiveImage] = useState(null)

  useEffect(() => {
    setStatus('loading')
    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data)
        setActiveImage(res.data.thumbnail)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [id])

  if (status === 'loading') {
    return (
      <div className="animate-pulse">
        <div className="h-80 bg-slate-200 rounded-xl mb-4" />
        <div className="h-6 bg-slate-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-1/3" />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <StateBlock
        status="error"
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={18} strokeWidth={1.75} />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="h-72 sm:h-96 w-full rounded-xl overflow-hidden bg-slate-100">
            <img
              src={activeImage}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          {product.images?.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {product.images.map((img) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(img)}
                  className={`h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                    activeImage === img ? 'border-teal-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-slate-500">{product.brand} · {product.category}</p>
          <h1 className="font-display text-2xl font-bold mt-1">{product.title}</h1>

          <div className="flex items-center gap-2 mt-2">
            <Star size={18} strokeWidth={1.75} className="fill-amber-400 text-amber-400" />
            <span className="text-slate-700">{product.rating}</span>
            <span className="text-slate-400">·</span>
            <span className={product.stock > 0 ? 'text-teal-700' : 'text-red-600'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          <p className="font-display text-3xl font-bold text-teal-700 mt-4">
            ₹{product.price}
          </p>

          <p className="text-slate-600 leading-relaxed mt-4">{product.description}</p>

          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} strokeWidth={1.75} />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}