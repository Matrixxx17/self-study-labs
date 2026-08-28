import {create} from 'zustand'
const useCartStore = create((set)=>({
    items: [],
    addItem: (product)=>
        set((state)=>{
            const existing = state.items.find((i)=>i.id===product.id)
            if(existing){
                return {
                    items: state.items.map((i)=> 
                    i.id===product.id ? {...i, quantity: i.quantity+1} : i ),   
                }
            }
            return {
                items: [...state.items, {
                    id:product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    quantity:1
                }]
            }

        }),

        removeItem: (id) =>{
            set((state)=>({
                items: state.items.filter((i)=> i.id!== id),
            }))},
        increment: (id) =>
        set((state)=>({
            items:state.items.map((i)=>
            i.id === id ? {...i,quantity: i.quantity+1} : i)
        })),
        decrement: (id)=>
            set((state)=>({
                items: state.items.map((i)=>
                i.id === id ? {...i,quantity: Math.max(1,i.quantity-1)} : i)
            })),
        clearCart: ()=>set({item:[]}),
}))
export default useCartStore 