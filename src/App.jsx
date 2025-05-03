import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Quiz from './pages/Quiz.jsx'
import StartQuiz from './pages/StartQuiz.jsx'
import Results from './pages/Results.jsx'
import Resources from './pages/Resources.jsx'
import ResourcesFields from './pages/ResourcesFields.jsx'
import ResourcesData from './pages/ResourcesData.jsx'
import About from './pages/About.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,  // Wrap everything in Layout
    children: [
      { path: '/', element: <Home /> },
      { path: '/quiz/:quizType', element: <StartQuiz /> },
      { path: '/quiz', element: <Quiz />}, 
      { path: '/results/:quizType', element: <Results /> },
      { path: '/results', element: <Results /> },
      { path: '/resources/:category/:field', element: <ResourcesData /> },
      { path: '/resources/:category', element: <ResourcesFields /> },
      { path: '/resources', element: <Resources /> },
      { path: '/about', element: <About /> },
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
