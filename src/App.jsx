import logo from './logo.svg';
import './App.module.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import ErrorPage from './components/ErrorPage/ErrorPage'
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './components/Checkout/Checkout';
import MyOrders from './components/MyOrders/MyOrders';
import BrandProducts from './components/BrandProducts/BrandProducts';
import WishList from './components/WishList/WishList';
import  WishContextProvider  from './Context/WishContext';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          path: '/home',
          element: (<ProtectedRoute>
            <Home/>
          </ProtectedRoute>)
        },
        {
          path: '/products',
          element: (<ProtectedRoute>
            <Products/>
          </ProtectedRoute>)
        },
        {
          path: '/product-details/:id',
          element: (
            <ProtectedRoute>
              <ProductDetails/>
            </ProtectedRoute>
          )
        },
        {
          path: '/brands',
          element: (
            <ProtectedRoute>
              <Brands/>
            </ProtectedRoute>
          )
        },
        {
          path: 'BrandProducts/:filterId/:id',
          element: (
            <ProtectedRoute>
              <BrandProducts/>
            </ProtectedRoute>
          )
        },
        {
          path: '/cart',
          element: (
            <ProtectedRoute>
              <Cart/>
            </ProtectedRoute>
          )
        },
        {
          path: '/wishlist',
          element: (
            <ProtectedRoute>
              <WishList/>
            </ProtectedRoute>
          )
        },
        {
          path: '/checkout',
          element: (
            <ProtectedRoute>
              <Checkout/>
            </ProtectedRoute>
          )
        },
        {
          path: '/allorders',
          element: (
            <ProtectedRoute>
              <MyOrders/>
            </ProtectedRoute>
          )
        },
        {
          path: '/categories',
          element: <ProtectedRoute>
            <Categories/>
          </ProtectedRoute>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },
        {
          path: '*',
          element: <NotFound/>
        },
      ]
    }
  ])

  const query = new QueryClient();
  return (

  <AuthContextProvider>
    <CartContextProvider>
    <WishContextProvider>
    <QueryClientProvider client={query}>
      <RouterProvider router={router}/>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      </QueryClientProvider>
    </WishContextProvider>
    </CartContextProvider>
  </AuthContextProvider>
  );
}

export default App;
