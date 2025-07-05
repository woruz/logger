import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogViewer from './components/LogViewer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LogViewer />
    </>
  )
}

export default App
