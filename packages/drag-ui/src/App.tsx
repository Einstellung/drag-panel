import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Editor } from './ui/page/Editor'
import { Preview } from './ui/page/Preview'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Editor />
    },
    {
      path: "/preview/",
      element: <Preview />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
