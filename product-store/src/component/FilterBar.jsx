import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/axiosInstance'

export default function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    api.get('/products/categories').then((res) => setCategories(res.data))
  }, [])

  const q = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || ''

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <div className="sticky top-16 z-30 bg-slate-50 border-b border-slate-200 py-3">
      <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search products..."
          value={q}
          onChange={(e) => updateParam('q', e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        />

        <select
          value={category}
          onChange={(e) => updateParam('category', e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
  <option key={c.slug} value={c.slug}>
    {toTitleCase(c.slug)}
  </option>
))}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>
    </div>
  )
}