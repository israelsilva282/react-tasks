import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RoutesApp } from "./routes"
function App() {
  return (
    <BrowserRouter>
      <RoutesApp></RoutesApp>
    </BrowserRouter>
  )
}

export default App