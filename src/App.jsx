import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routing from './router/Router'
import "/node_modules/bootstrap/dist/css/bootstrap.min.css"  


function App() {
  return (
    <div>
      <RouterProvider router={routing}/>
    </div>
  )
}

export default App