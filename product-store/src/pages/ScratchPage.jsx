import { useState } from "react"
import ScratchRow from "./ScratchRow"

const initialProducts = [
  { id: 'p1', name: 'Keyboard', price: 2500 },
  { id: 'p2', name: 'Mouse',    price: 800  },
  { id: 'p3', name: 'Monitor',  price: 12000 },
  { id: 'p4', name: 'Webcam',   price: 3200 },
  { id: 'p5', name: 'Headset',  price: 1500 },
]

export default function  ScratchPage(){
    const [products,setProducts] = useState(initialProducts)
    const sortByPrice = ()=>{
        setProducts((prev)=>[...prev].sort((a,b)=>a.price-b.price))
    }
    
    return (
    <div className="mx-auto max-w-lg py-10">
      <h1 className="font-display text-xl font-bold mb-4">Key bug scratch page</h1>

      <button
        onClick={sortByPrice}
        className="mb-4 rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-900"
      >
        Sort by price
      </button>

      <div className="rounded-lg border border-slate-200">
        {products.map((product, index) => (
          <ScratchRow key={product.id} product={product} />
        ))}
      </div>
    </div>
    )
}