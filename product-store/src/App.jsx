// src/App.jsx (or a test route)
import { useState } from 'react'
import Modal from './component/Modal'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
<div className="max-w-sm mx-auto mt-20 hover:scale-105 transition-transform rounded-xl border p-6">
  <button onClick={() => setIsOpen(true)} className="...">Open Modal</button>
  <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Trapped">
    <p>I'm stuck inside the card now.</p>
  </Modal>
</div>
  )
}

export default App