import { ArrowUp } from 'lucide-react'
import { useScrollPosition } from '../hooks/useScrollPosition'

export default function BackToTop() {
  const scrollY = useScrollPosition()
  if (scrollY <= 400) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800"
    >
      <ArrowUp size={20} strokeWidth={2} />
    </button>
  )
}