// src/pages/ProductsPage.jsx — cleaner version, use this instead
import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/axiosInstance'
import FilterBar from '../component/FilterBar'
import ProductCard from '../component/ProductCard'
import StateBlock from '../component/StateBlock'

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')

  const q = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || ''

  const fetchProducts = useCallback(() => {
    setStatus('loading')
    const url = q
      ? `/products/search?q=${encodeURIComponent(q)}`
      : category
        ? `/products/category/${category}`
        : '/products?limit=12&skip=0'

    api
      .get(url)
      .then((res) => {
        setProducts(res.data.products)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [q, category])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'rating-desc') return b.rating - a.rating
    return 0
  })

  return (
    <div>
      <FilterBar />
      <div className="mt-6">
        {status === 'loading' && <StateBlock status="loading" />}
        {status === 'error' && <StateBlock status="error" onRetry={fetchProducts} />}
        {status === 'success' && sortedProducts.length === 0 && (
          <StateBlock status="empty" emptyMessage="No products match your filters — try clearing search or category." />
        )}
        {status === 'success' && sortedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}