import { useState, useEffect } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,  // Wrap everything in Layout
    children: [
      { path: '/', element: <Home /> },
      { path: '/quiz', element: <Quiz /> },
      { path: '/results', element: <Results /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

function App() {

  return (
    <RouterProvider router={Router} />
  )
}

export default App
