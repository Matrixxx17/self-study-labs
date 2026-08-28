import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop(){
    const [visible,setVisible] = useState(false)
    useEffect(()=>{
        const onScroll = () =>setVisible(window.scrollY>400)
        window.addEventListener("scroll",onScroll)
        return ()=> window.removeEventListener("scroll",onScroll)
    },[])

    if(!visible) return null

    return (
        <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
        aria-label="Back to top"
        className="fixed bottom-6 p-4 right-6 z-40 flex h-11 w-11 items-center justify-centre round-full bg-slate-900 text-white shadow-lg hover:bg-slate-800">
            <ArrowUp size={10} strokeWidth={8} al></ArrowUp>

        </button>
    )
}