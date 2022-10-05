import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProjectEditor } from './code-editor/ProjectEditor'
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
      path: "/editor/",
      element: <ProjectEditor />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
