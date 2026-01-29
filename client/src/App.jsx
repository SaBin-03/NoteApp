import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Note from './components/Note'

const App = () => {

    const route = createBrowserRouter([
        {
            path:"/",
            element:<Home />
        },
        {
            path:"/login",
            element:<Login />
        },
        {
            path:"/register",
            element:<Register />
        },
        {
            path:"/note-Making",
            element:<Note />
        },
    ])

  return (
    <div>
        <RouterProvider router={route} />

    </div>
  )
}

export default App
