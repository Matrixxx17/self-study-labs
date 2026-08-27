import { Boxes, ShoppingCart, Search } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-teal-700">
          <Boxes size={26} strokeWidth={2} />
          <span className="font-display font-bold text-xl tracking-tight">Store</span>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-slate-700 hover:text-teal-700">
            <Search size={20} strokeWidth={1.75} />
          </button>
          <button className="flex items-center gap-2 text-slate-700 hover:text-teal-700">
            <ShoppingCart size={20} strokeWidth={1.75} />
            <span>Cart</span>
          </button>
        </div>
      </nav>

      <main className="px-6 py-12">
        <h1 className="font-display font-bold text-3xl tracking-tight text-slate-900">
          Product Store
        </h1>
        <p className="font-body leading-relaxed text-slate-600 mt-2">
          A clean starting point with real fonts and  icons
        </p>
      </main>
    </div>
  )
}

export default App