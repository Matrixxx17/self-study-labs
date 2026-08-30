// src/utils/analytics.js

// 1. Total revenue
export const getTotalRevenue = (carts) => {
  return carts.reduce((sum, cart) => {
    return sum + cart.discountedTotal
  }, 0)
}

// 2. Total orders
export const getTotalOrders = (carts) => {
  return carts.length
}

// 3. Average order value
export const getAverageOrderValue = (carts) => {
  if (carts.length === 0) return 0

  const revenue = getTotalRevenue(carts)

  return revenue / carts.length
}

// 4. Total items sold
export const getTotalItemsSold = (carts) => {
  return carts.reduce((sum, cart) => {
    return sum + cart.totalQuantity
  }, 0)
}

// 5. Total discount
export const getTotalDiscount = (carts) => {
  return carts.reduce((sum, cart) => {
    return sum + (cart.total - cart.discountedTotal)
  }, 0)
}


// Create product lookup
export const createProductLookup = (products) => {
  return products.reduce((result, product) => {
    result[product.id] = product
    return result
  }, {})
}


// 6. Revenue by category
export const getRevenueByCategory = (carts, products) => {
  const productById = createProductLookup(products)

  const revenue = {}

  carts.forEach((cart) => {
    cart.products.forEach((item) => {
      const product = productById[item.id]

      const category = product?.category ?? 'unknown'

      if (!revenue[category]) {
        revenue[category] = 0
      }

      revenue[category] += item.total
    })
  })

  return Object.entries(revenue).map(([category, revenue]) => ({
    category,
    revenue,
  }))
}


// 7. Top products
export const getTopProducts = (carts, products, limit = 10) => {
  const productLookup = createProductLookup(products)

  const quantities = {}

  carts.forEach((cart) => {
    cart.products.forEach((item) => {
      if (!quantities[item.id]) {
        quantities[item.id] = 0
      }

      quantities[item.id] += item.quantity
    })
  })

  return Object.entries(quantities)
    .map(([id, quantity]) => {
      const product = productLookup[id]

      return {
        id: Number(id),
        title: product?.title ?? 'Unknown',
        quantity,
        revenue: product
          ? product.price * quantity
          : 0,
      }
    })
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit)
}


// 8. Top customers
export const getTopCustomers = (carts, users, limit = 10) => {
  const spending = {}

  carts.forEach((cart) => {
    if (!spending[cart.userId]) {
      spending[cart.userId] = 0
    }

    spending[cart.userId] += cart.discountedTotal
  })

  const userLookup = {}

  users.forEach((user) => {
    userLookup[user.id] = user
  })

  return Object.entries(spending)
    .map(([userId, total]) => {
      const user = userLookup[userId]

      return {
        userId: Number(userId),
        name: user
          ? `${user.firstName} ${user.lastName}`
          : 'Unknown',
        total,
      }
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
}


// 9. Orders by city
export const getOrdersByCity = (carts, users) => {
  const userLookup = {}

  users.forEach((user) => {
    userLookup[user.id] = user
  })

  const cities = {}

  carts.forEach((cart) => {
    const user = userLookup[cart.userId]

    const city = user?.address?.city ?? 'Unknown'

    if (!cities[city]) {
      cities[city] = 0
    }

    cities[city] += 1
  })

  return Object.entries(cities)
    .map(([city, orders]) => ({
      city,
      orders,
    }))
    .sort((a, b) => b.orders - a.orders)
}


// 10. Category share
export const getCategoryShare = (categoryRows, totalRevenue) => {
  if (totalRevenue === 0) return []

  return categoryRows.map((item) => ({
    ...item,
    share: (item.revenue / totalRevenue) * 100,
  }))
}