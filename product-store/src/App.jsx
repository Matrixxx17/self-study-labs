import { Navigate, Route, Routes } from "react-router-dom"
 
import RootLayout from "./layouts/RootLayout"
 
import ProductPage from "./pages/ProductPage"
import ProductsDetailPage from "./pages/ProductsDetailPage"
import CartPage from "./pages/CartPage"
import AdminPage from "./pages/AdminPage"
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
        <Route
          path="/"
          element={<Navigate to="/products" replace />}
        />
        <Route
          path="/products"
          element={<ProductPage />}
        />
 
        <Route
          path="/products/:id"
          element={<ProductsDetailPage />}
        />
 

        <Route
          path="/cart"
          element={<CartPage />}
        />
 

        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminPage />
            </RequireAdmin>
          }
        />
        <Route
          path="/scratch"
          element={

              <ScratchPage />
          
          }
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
 
      </Route>
      
 
    </Routes>
  )
}
 
export default App
 