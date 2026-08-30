import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import api from '../api/axiosInstance'

import {
  getTotalRevenue,
  getTotalOrders,
  getAverageOrderValue,
  getTotalItemsSold,
  getTotalDiscount,
  getRevenueByCategory,
  getTopProducts,
  getTopCustomers,
  getOrdersByCity,
  getCategoryShare,
} from '../utlls/analytics'

import { formatPrice, toTitleCase } from '../utlls/format'


function AnalyticsPage() {
  const [carts, setCarts] = useState([])
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()

  const limit = Number(searchParams.get('limit') ?? 10)
  const sort = searchParams.get('sort') ?? 'quantity'
  const dir = searchParams.get('dir') ?? 'desc'


  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const [cartsRes, usersRes, productsRes] = await Promise.all([
        api.get('/carts'),
        api.get('/users?limit=100'),
        api.get('/products?limit=100'),
      ])

      setCarts(cartsRes.data.carts)
      setUsers(usersRes.data.users)
      setProducts(productsRes.data.products)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    loadData()
  }, [])


  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-500">
          Loading analytics...
        </p>
      </div>
    )
  }


  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4 text-red-600">
          {error}
        </p>

        <button
          onClick={loadData}
          className="rounded-lg bg-teal-700 px-4 py-2 text-white hover:bg-teal-800"
        >
          Retry
        </button>
      </div>
    )
  }


  if (carts.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">
          No analytics data
        </h2>

        <p className="mt-2 text-slate-500">
          There is no order data to display.
        </p>
      </div>
    )
  }


  // -------------------------
  // Metrics
  // -------------------------

  const totalRevenue = getTotalRevenue(carts)
  const totalOrders = getTotalOrders(carts)
  const averageOrderValue = getAverageOrderValue(carts)
  const totalItemsSold = getTotalItemsSold(carts)
  const totalDiscount = getTotalDiscount(carts)


  // -------------------------
  // Category data
  // -------------------------

  const categoryRows = getRevenueByCategory(
    carts,
    products
  )

  const categoryShares = getCategoryShare(
    categoryRows,
    totalRevenue
  )


  const maxCategoryRevenue =
    Math.max(
      ...categoryRows.map((item) => item.revenue),
      1
    )


  // -------------------------
  // Tables
  // -------------------------

  let topProducts = getTopProducts(
    carts,
    products,
    limit
  )

  let topCustomers = getTopCustomers(
    carts,
    users,
    limit
  )


  // Sort products
  topProducts = [...topProducts].sort((a, b) => {
    let result

    if (sort === 'title') {
      result = a.title.localeCompare(b.title)
    } else if (sort === 'revenue') {
      result = a.revenue - b.revenue
    } else {
      result = a.quantity - b.quantity
    }

    return dir === 'asc' ? result : -result
  })


  // Sort customers
  topCustomers = [...topCustomers].sort((a, b) => {
    const result = a.total - b.total

    return dir === 'asc' ? result : -result
  })


  const ordersByCity = getOrdersByCity(
    carts,
    users
  )

  const maxCityOrders =
    Math.max(
      ...ordersByCity.map((item) => item.orders),
      1
    )


  // -------------------------
  // Sorting
  // -------------------------

  const changeSort = (key) => {
    let newDirection = 'desc'

    if (sort === key && dir === 'desc') {
      newDirection = 'asc'
    }

    setSearchParams({
      sort: key,
      dir: newDirection,
      limit: String(limit),
    })
  }


  return (
    <div className="space-y-6 p-4 md:p-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Analytics Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of sales and customers
        </p>
      </div>


      {/* Top N */}

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">
          Show:
        </label>

        <select
          value={limit}
          onChange={(e) => {
            setSearchParams({
              sort,
              dir,
              limit: e.target.value,
            })
          }}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>


      {/* Stat cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

        <StatCard
          title="Revenue"
          value={formatPrice(totalRevenue)}
        />

        <StatCard
          title="Orders"
          value={totalOrders}
        />

        <StatCard
          title="Average Order"
          value={formatPrice(averageOrderValue)}
        />

        <StatCard
          title="Items Sold"
          value={totalItemsSold}
        />

        <StatCard
          title="Discount Given"
          value={formatPrice(totalDiscount)}
        />

      </div>


      {/* Revenue by category */}

      <section className="rounded-xl border bg-white p-4 shadow-sm">

        <h2 className="mb-5 text-lg font-semibold">
          Revenue by Category
        </h2>

        <div className="space-y-5">

          {categoryShares.map((item) => {

            const width =
              (item.revenue / maxCategoryRevenue) * 100

            return (
              <div
                key={item.category}
                className="group relative"
              >

                <div className="mb-1 flex justify-between text-sm">

                  <span className="truncate">
                    {toTitleCase(item.category)}
                  </span>

                  <span className="tabular-nums">
                    {formatPrice(item.revenue)}
                  </span>

                </div>

                <div className="h-3 rounded-full bg-slate-100">

                  <div
                    className="h-3 rounded-full bg-teal-600 transition-all duration-500"
                    style={{
                      width: `${width}%`,
                    }}
                  />

                </div>

                <div className="pointer-events-none absolute right-0 top-[-30px] hidden rounded bg-slate-900 px-2 py-1 text-xs text-white group-hover:block">
                  {item.share.toFixed(1)}% of revenue
                </div>

              </div>
            )
          })}

        </div>

      </section>


      {/* Tables */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">


        {/* Products */}

        <section className="rounded-xl border bg-white p-4 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            Top Products
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[500px] text-sm">

              <thead>
                <tr className="border-b text-left">

                  <th className="p-3">
                    <button
                      onClick={() => changeSort('title')}
                      className="font-semibold hover:text-teal-700"
                    >
                      Product
                    </button>
                  </th>

                  <th className="p-3 text-right">
                    <button
                      onClick={() => changeSort('quantity')}
                      className="font-semibold hover:text-teal-700"
                    >
                      Quantity
                    </button>
                  </th>

                  <th className="p-3 text-right">
                    <button
                      onClick={() => changeSort('revenue')}
                      className="font-semibold hover:text-teal-700"
                    >
                      Revenue
                    </button>
                  </th>

                </tr>
              </thead>

              <tbody>

                {topProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b even:bg-slate-50 hover:bg-slate-100"
                  >

                    <td className="p-3">
                      {product.title}
                    </td>

                    <td className="p-3 text-right tabular-nums">
                      {product.quantity}
                    </td>

                    <td className="p-3 text-right tabular-nums">
                      {formatPrice(product.revenue)}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* Customers */}

        <section className="rounded-xl border bg-white p-4 shadow-sm">

          <h2 className="mb-4 text-lg font-semibold">
            Top Customers
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[450px] text-sm">

              <thead>
                <tr className="border-b text-left">

                  <th className="p-3">
                    Customer
                  </th>

                  <th className="p-3 text-right">
                    Spend
                  </th>

                </tr>
              </thead>

              <tbody>

                {topCustomers.map((customer) => (
                  <tr
                    key={customer.userId}
                    className="border-b even:bg-slate-50 hover:bg-slate-100"
                  >

                    <td className="p-3">
                      {customer.name}
                    </td>

                    <td className="p-3 text-right tabular-nums">
                      {formatPrice(customer.total)}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

      </div>


      {/* Orders by city */}

      <section className="rounded-xl border bg-white p-4 shadow-sm">

        <h2 className="mb-5 text-lg font-semibold">
          Orders by City
        </h2>

        <div className="space-y-4">

          {ordersByCity.map((item) => {

            const width =
              (item.orders / maxCityOrders) * 100

            return (
              <div key={item.city}>

                <div className="mb-1 flex justify-between text-sm">

                  <span>
                    {item.city}
                  </span>

                  <span className="tabular-nums">
                    {item.orders} orders
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className="h-2 rounded-full bg-teal-600"
                    style={{
                      width: `${width}%`,
                    }}
                  />

                </div>

              </div>
            )
          })}

        </div>

      </section>

    </div>
  )
}


function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900 tabular-nums">
        {value}
      </p>

    </div>
  )
}


export default AnalyticsPage