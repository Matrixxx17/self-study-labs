// src/pages/ProductsPage.jsx
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import api from "../api/axiosInstance"
import FilterBar from "../component/FilterBar"
import ProductCard from "../component/ProductCard"
import StateBlock from "../component/StateBlock"

const LIMIT = 12

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState("loading")

  const q = searchParams.get("q") ?? ""
  const category = searchParams.get("category") ?? "all"
  const sort = searchParams.get("sort") ?? "title"
  const minPrice = searchParams.get("minPrice") ?? ""
  const maxPrice = searchParams.get("maxPrice") ?? ""
  const page = Number(searchParams.get("page") ?? 1)

  const skip = (page - 1) * LIMIT

  const fetchProducts = useCallback(() => {
    setStatus("loading")

    const url = q
      ? `/products/search?q=${encodeURIComponent(q)}&limit=${LIMIT}&skip=${skip}`
      : category !== "all"
        ? `/products/category/${category}?limit=${LIMIT}&skip=${skip}`
        : `/products?limit=${LIMIT}&skip=${skip}`

    api
      .get(url)
      .then((res) => {
        setProducts(res.data.products)
        setTotal(res.data.total)
        setStatus("success")
      })
      .catch(() => setStatus("error"))
  }, [q, category, skip])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // sort is client-side, applied to whatever page of results we got back
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price
    if (sort === "price-desc") return b.price - a.price
    if (sort === "rating-desc") return b.rating - a.rating
    return 0
  })

  // price range filter, also client-side
  const filteredProducts = sortedProducts.filter((p) => {
    if (minPrice && p.price < Number(minPrice)) return false
    if (maxPrice && p.price > Number(maxPrice)) return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(total / LIMIT))

  const goToPage = (newPage) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        next.set("page", newPage)
        return next
      },
      { replace: false } // deliberate navigation — Back should undo this
    )
  }

  return (
    <div>
      <FilterBar />

      <div className="mt-6">
        <p className="text-sm text-slate-500 mb-4">
          {status === "success" &&
            (q
              ? `${total} products for "${q}"`
              : `${total} products found`)}
        </p>

        {status === "loading" && <StateBlock status="loading" />}
        {status === "error" && <StateBlock status="error" onRetry={fetchProducts} />}
        {status === "success" && filteredProducts.length === 0 && (
          <StateBlock
            status="empty"
            emptyMessage="No products match your filters — try clearing search, category, or price range."
          />
        )}

        {status === "success" && filteredProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>
                <span className="text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}