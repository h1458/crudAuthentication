import './App.css';
import { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './Common/Navbar';
// import Login from './Component/Login'
const Login = lazy(() => import('./Component/Login'))
// import Register from './Component/Register';
const Register = lazy(() => import('./Component/Register'))
// import Home from './Component/Home';
const Home = lazy(() => import('./Component/Home'))
// import Product from './Component/Product';
const CreateProduct = lazy(() => import('./Component/CreateProduct'))
// import CreateProduct from './Component/CreateProduct';
const Product = lazy(() => import('./Component/Product'))
// import Update from './Component/Update';
const Update = lazy (() => import('./Component/Update'))

function App() {

  function PrivateRouter ({children}) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to='/login'/>
    )
  }

  const publicRoute = [
    {
      path: '/login',
      component: <Login/>
    },
    {
      path: '/register',
      component: <Register/>
    }
  ]

  const privateRoute = [
    {
      path: "/",
      component: <Home/>
    },
    {
      path: '/product',
      component: <Product/>
    },
    {
      path: '/createpro',
      component: <CreateProduct/>
    },
    {
      path: '/update/:id',
      component: <Update/>
    }
  ]
  let queryclinet =new QueryClient()
  return (
    <>
    <Suspense fallback={<h1>Loading....</h1>}>
    <QueryClientProvider client={queryclinet}>
    <Router>
      <ToastContainer/>
      <Navbar/>
      <Routes>
      {
        publicRoute?.map((publics) => {
          return(
            <>
            <Route path={publics.path}  element={publics.component}/>
            </>
          )
        })
      }
      {
        privateRoute.map((privates) => {
          return (
            <>
            <Route path={privates.path} element={<PrivateRouter>{privates.component}</PrivateRouter>}/>
            </>
          )
        })
      }
      </Routes>
    </Router>
    </QueryClientProvider>
    </Suspense>
    
    </>
  );
}

export default App;
