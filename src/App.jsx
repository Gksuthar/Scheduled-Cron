import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './/pages/Error'
import About from './pages/About'
import Layout from './components/AppLayout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';

function App() {

  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
    path: '/',
    element: <Layout />,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: '/about',
        element: <About />,
      },
  ]}
])
  return (
    <>
      <RouterProvider router={router}/>
    </>
    // <createBrowserRouter></createBrowserRouter>
  )
}

export default App
