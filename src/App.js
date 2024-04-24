import { lazy, Suspense } from "react";
import {
  Link,
  createBrowserRouter,
  RouterProvider,
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
import { Product } from "./containers/Product/index"
import { ListProductSave } from "./containers/Product/components/ListProductSave"
import { ListProduct } from "./containers/Product/components/ListProduct"
import { ProductDetail } from "./containers/Product/components/ProductDetail"
import { ProtectedLayout } from "./layouts/Protected"
import { Dashboard } from "./containers/Dashboard"
import { fakeAuthProvider } from "./auth"
import { ErrorBoundary } from "react-error-boundary";

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
      //   element: <Product />,
      //   errorElement: <h1>Loi roi nha</h1>,
      //   children: [
      //     { index: true, element: <ListProduct /> },
      //     { path: "save", element: <ListProductSave /> },
      //     { path: ":id", element: <ProductDetail /> },
      //   ],
      // },
      {
        path: "products",
        // async lazy() {
        //   let { ProductPage } = await import("./containers/Product/index")
        //   return { Component: ProductPage }
        // },
        element: <Product />,
        children: [
          {
            index: true,
            async lazy() {
              let { ListProduct } = await import("./containers/Product/components/ListProduct")
              return { Component: ListProduct }
            },
          },
          {
            path: "save",
            errorElement: <h1>Loi roi nha</h1>,
            async lazy() {
              let { ListProductSave } = await import(
                "./containers/Product/components/ListProductSave"
              );
              return {
                Component: ListProductSave,
              };
            },
          },
          {
            path: ":id",
            async lazy() {
              let { ProductDetail } = await import(
                "./containers/Product/components/ProductDetail"
              );
              return {
                Component: ProductDetail,
              };
            },
          },
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
      {
        path: "accounts",
        lazy: () => import("./containers/Accounts/index"),
      },
      {
        path: "product-management",
        lazy: () => import("./containers/Product/components/ProductManagement"),
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

  const fallbackRender = ({ error, resetErrorBoundary }) => { 
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }

  return (
    <ErrorBoundary 
      fallbackRender={fallbackRender}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </ErrorBoundary>
  )

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
