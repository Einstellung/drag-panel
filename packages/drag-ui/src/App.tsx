import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CodeEditor } from './ui/page/CodeEditor'
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
    },
    {
      path: "/codeless/",
      element: <CodeEditor />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
