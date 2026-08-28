import { Link, NavLink, Outlet } from "react-router-dom"

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    backgroundColor: "#1f2937",
    padding: "16px 24px",
  },
  navInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  brand: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "#d1d5db",
    textDecoration: "none",
    fontSize: "16px",
  },
  main: {
    flex: 1,
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  footer: {
    backgroundColor: "#1f2937",
    color: "#d1d5db",
    textAlign: "center",
    padding: "16px",
  },
}

export default function RootLayout() {
  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <Link to="/products" style={styles.brand}>
            Product Store
          </Link>
          <div style={styles.navLinks}>
            <NavLink
              to="/products"
              style={({ isActive }) => ({
                ...styles.navLink,
                color: isActive ? "#ffffff" : "#d1d5db",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Products
            </NavLink>
            <NavLink
              to="/cart"
              style={({ isActive }) => ({
                ...styles.navLink,
                color: isActive ? "#ffffff" : "#d1d5db",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Cart
            </NavLink>
            <NavLink
              to="/admin"
              style={({ isActive }) => ({
                ...styles.navLink,
                color: isActive ? "#ffffff" : "#d1d5db",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Admin
            </NavLink>
            <NavLink
              to="/scratch"
              style={({ isActive }) => ({
                ...styles.navLink,
                color: isActive ? "#ffffff" : "#d1d5db",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Scratch Page
            </NavLink>
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        <Outlet />
      </main>

      <footer style={styles.footer}>
        * This is copyright content don't use it *
      </footer>
    </div>
  )
}