import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routing from './router/Router'


function App() {
  return (
    <div>
      <RouterProvider router={routing}/>
    </div>
  )
}

export default App