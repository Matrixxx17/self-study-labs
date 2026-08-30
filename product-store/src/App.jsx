import { Navigate, Route, Routes } from "react-router-dom"

import RootLayout from "./layouts/RootLayout"

import ProductPage from "./pages/ProductPage"
import ProductsDetailPage from "./pages/ProductsDetailPage"
import CartPage from "./pages/CartPage"
import AdminPage from "./pages/AdminPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import NotFoundPage from "./pages/NotFoundPage"
import ScratchPage from "./pages/ScratchPage"


function RequireAdmin({ children }) {
  const isAdmin = true

  if (!isAdmin) {
    return <Navigate to="/products" replace />
  }

  return children
}


function App() {
  return (
    <Routes>

      <Route element={<RootLayout />}>

        {/* Home */}
        <Route
          path="/"
          element={<Navigate to="/products" replace />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<ProductPage />}
        />

        <Route
          path="/products/:id"
          element={<ProductsDetailPage />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<CartPage />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminPage />
            </RequireAdmin>
          }
        />

        {/* Analytics */}
        <Route
          path="/admin/analytics"
          element={
            <RequireAdmin>
              <AnalyticsPage />
            </RequireAdmin>
          }
        />

        {/* Scratch */}
        <Route
          path="/scratch"
          element={<ScratchPage />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Route>

    </Routes>
  )
}

export default App