import { useState } from 'react'
import CurrencyForm from './components/CurrencyForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CurrencyForm />
    </>
  )
}

export default App
