import { useState } from "react";

export default function ScratchRow({product}){
    const [quantity,setQuantity] = useState(0)
    return (
        <div className="flex items-center justify-between border-b border-slate-500 px-4 py-3">
            <p className="font-body text-slate-800">{product.name}-₹{product.price}</p>
                <div className="flex items-center gap-3"> 
                    <p className="w-8 text-center">{quantity}</p>
                    <button onClick={()=>setQuantity((q)=>q+1)} className="rounded bg-teal-700 px-3 py-1 text-white hover:bg-teal-800">
                            +
                    </button>

                </div>
        </div>
    )
}