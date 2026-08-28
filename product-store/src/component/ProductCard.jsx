import {Link} from 'react-router-dom'
import { Star, ShoppingCart} from 'lucide-react'
import useCartStore from '../store/useCartStore'
 
export default function ProductCard({product}){
    const addItem = useCartStore((s)=>s.addItem)

    const handleAddToCart=(e)=>{
        e.preventDefault()
        addItem(product)
    }

    return (
        <Link   
        to={`/products/${product.id}`} className='group block rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-shadow'>
            <div className='relative h-40 w-full'> 
                <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
        />
        {product.discountPercentage > 10 && (
          <div className="absolute top-2 left-2 rounded-full bg-red-600 px-2 py-1 text-xs font-medium text-white">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
        </div>  

      <div className="p-4">
        <h3 className="font-body font-medium text-slate-900 truncate">{product.title}</h3>
        <p className="text-sm text-slate-500">{product.brand}</p>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-display font-bold text-teal-700">₹{product.price}</span>
          <span className="flex items-center gap-1 text-sm text-slate-600">
            <Star size={16} strokeWidth={1.75} className="fill-amber-400 text-amber-400" />
            {product.rating}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
        >
          <ShoppingCart size={16} strokeWidth={1.75} />
          Add to cart
        </button>
      </div>


        </Link>
    )
}