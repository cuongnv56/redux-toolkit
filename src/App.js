import {
  Outlet,
  Form,
  Link,
  createBrowserRouter,
  RouterProvider,
  useNavigation,
  useFetcher,
  useLocation,
  useActionData,
  redirect,
  useRouteLoaderData
} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { saveProducts, getProducts } from './productSlice'
import { saveProducts2 } from './product2Slice'
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { PublicLayout } from "./layouts/Public"
import { Home } from "./containers/Home"
import { Product } from "./containers/Product"
import { ProtectedLayout } from "./layouts/Protected"
import { Dashboard } from "./containers/Dashboard"
import { fakeAuthProvider } from "./auth"

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "gioi-thieu",
        lazy: () => import("./containers/About"),
      },
      // {
      //   path: "products",
      //   lazy: () => import("./containers/Product"),
      // },
      {
        path: "products",
        element: <Product />,
        children: [
          { path: ":id", element: <Invoice /> },
          { path: "/pending", element: <Pending /> },
          { path: "/complete", element: <Complete /> },
        ],
      },
      {
        path: "login",
        lazy: () => import("./containers/Login"),
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

function NoMatch() {
  return (
    <div>
      <h2>Page không tồn tại</h2>
      <p>
        <Link to="/">Vui lòng quay về trang chủ</Link>
      </p>
    </div>
  );
}

function App() {
  const products = useSelector((state) => state?.product?.products)
  const products2 = useSelector((state) => state?.product2Reducer?.products2)

  const dispatch = useDispatch()

  // const callApi = () => {
  //   axios.get("https://dummyjson.com/products").then(res => {
  //     dispatch(saveProducts(res?.data?.products))
  //   })
  // }

  // const callApi2 = async () => {
  //   console.log('api 2 calling...')
  //   const response = await axios.get("https://dummyjson.com/products")
  //   dispatch(saveProducts(response?.data?.products))
  // }

  // const getProducts = async () => {
  //   const response = await axios.get("https://dummyjson.com/products")
  //   return response?.data?.products
  // }

  // const getProducts3 = () => {
  //   return [
  //     {
  //       id: 1,
  //       title: "Sản phẩm test",
  //       price: 789
  //     }
  //   ]
  // }

  // const getProducts4 = (callback) => {
  //   axios.get("https://dummyjson.com/products").then(res => {
  //     callback(res?.data?.products)
  //     // return res?.data?.products
  //   }).finally(() => {
  //   })
  // }

  // const getProducts5 = (callback) => {
  //   callback([{
  //     id: 1,
  //     title: "Sản phẩm test",
  //     price: 789
  //   }])
  // }

  const callApi3 = () => {
    // dispatch(getProducts())
  }

  // const callApiForSaga = () => {
  //   dispatch(saveProducts2())
  // }

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
