// src/components/FilterBar.jsx
import { useSearchParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link2, Check, X } from "lucide-react"
import api from "../api/axiosInstance"
import { useDebounce } from "../hooks/useDebounce"

export default function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    api.get("/products/categories").then((res) => setCategories(res.data))
  }, [])

  // ---------- read every param with a fallback ----------
  const q = searchParams.get("q") ?? ""
  const category = searchParams.get("category") ?? "all"
  const sort = searchParams.get("sort") ?? "title"
  const minPrice = searchParams.get("minPrice") ?? ""
  const maxPrice = searchParams.get("maxPrice") ?? ""

  // local input state for the search box, debounced before it hits the URL
  const [searchInput, setSearchInput] = useState(q)
  const debouncedSearch = useDebounce(searchInput, 400)

  useEffect(() => {
    updateParam("q", debouncedSearch, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  // ---------- the merge helper — every write goes through this ----------
  const updateParam = (key, value, options = {}) => {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        if (!value || value === "all") {
          next.delete(key)
        } else {
          next.set(key, value)
        }
        next.delete("page") // any filter change resets paging
        return next
      },
      { replace: options.replace ?? true }
    )
  }

  const resetFilters = () => {
    setSearchInput("")
    setSearchParams({})
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const removeParam = (key) => updateParam(key, "")

  const chipLabels = {
    q: (v) => `Search: "${v}"`,
    category: (v) => `Category: ${v}`,
    sort: (v) => `Sort: ${v}`,
    minPrice: (v) => `Min ₹${v}`,
    maxPrice: (v) => `Max ₹${v}`,
  }

  const activeChips = [...searchParams.entries()].filter(([key]) => key !== "page")

  return (
    <div className="sticky top-16 z-30 bg-slate-50 border-b border-slate-200 py-3">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          />

          <select
            value={category}
            onChange={(e) => updateParam("category", e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="title">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>

          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => updateParam("minPrice", e.target.value)}
            className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
          />

          <button
            onClick={resetFilters}
            className="text-sm text-slate-600 hover:text-slate-900 whitespace-nowrap"
          >
            Reset filters
          </button>

          <button
            onClick={copyLink}
            className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 whitespace-nowrap"
          >
            {copied ? <Check size={14} /> : <Link2 size={14} />}
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>

        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {activeChips.map(([key, value]) => (
              <span
                key={key}
                className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
              >
                {chipLabels[key] ? chipLabels[key](value) : `${key}: ${value}`}
                <button onClick={() => removeParam(key)} aria-label={`Remove ${key} filter`}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}