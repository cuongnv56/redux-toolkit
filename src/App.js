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
import { ProtectedLayout } from "./layouts/Protected"
import { Dashboard } from "./containers/Dashboard"
import { fakeAuthProvider } from "./auth"

// const isLogged = localStorage.getItem("isLogged")

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <PublicLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "gioi-thieu",
//         lazy: () => import("./containers/About"),
//       },
//       {
//         path: "login",
//         lazy: () => import("./containers/Login"),
//       },
//       {
//         path: "*",
//         element: <NoMatch />,
//       },
//     ],
//   },
//   {
//     path: "/admin",
//     element: <ProtectedLayout />,
//     children: [
//       {
//         index: true,
//         element: <Dashboard />,
//       },
//       {
//         path: "accounts",
//         async lazy() {
//           let { accountMessagesLoader, AccountMessages } = await import(
//             "./containers/Accounts"
//           );
//           return {
//             loader: accountMessagesLoader,
//             Component: AccountMessages,
//           };
//         },
//       },
//       {
//         path: "products",
//         async lazy() {
//           let { Product } = await import("./containers/Product");
//           return { Component: Product };
//         },
//       },
//       // {
//       //   path: "admin",
//       //   async lazy() {
//       //     let { ProtectedLayout } = await import("./layouts/Protected");
//       //     return { Component: ProtectedLayout };
//       //   },
//       //   children: [
//       //     {
//       //       index: true,
//       //       async lazy() {
//       //         let { Dashboard } = await import("./containers/Dashboard");
//       //         return { Component: Dashboard };
//       //       },
//       //     },
//       //     {
//       //       path: "accounts",
//       //       async lazy() {
//       //         let { accountMessagesLoader, AccountMessages } = await import(
//       //           "./containers/Accounts"
//       //         );
//       //         return {
//       //           loader: accountMessagesLoader,
//       //           Component: AccountMessages,
//       //         };
//       //       },
//       //     },
//       //     {
//       //       path: "products",
//       //       async lazy() {
//       //         let { Product } = await import("./containers/Product");
//       //         return { Component: Product };
//       //       },
//       //     },
//       //   ],
//       // },
//       {
//         path: "*",
//         element: <NoMatch />,
//       },
//     ],
//   },
// ]);

// const router = createBrowserRouter([
//   {
//     id: "root",
//     path: "/",
//     loader() {
//       return { user: fakeAuthProvider.username };
//     },
//     Component: PublicLayout,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "gioi-thieu",
//         lazy: () => import("./containers/About"),
//       },
//       {
//         path: "login",
//         action: loginAction,
//         loader: loginLoader,
//         Component: LoginPage,
//       },
//       {
//         path: "admin",
//         loader: protectedLoader,
//         Component: ProtectedLayout,
//       },
//     ],
//   },
//   // {
//   //   path: "/admin",
//   //   loader() {
//   //     return { user: fakeAuthProvider.username };
//   //   },
//   //   Component: ProtectedLayout,
//   //   children: [
//   //     {
//   //       index: true,
//   //       element: <Dashboard />,
//   //     },
//   //     {
//   //       path: "accounts",
//   //       lazy: () => import("./containers/Accounts"),
//   //     },
//   //   ],
//   // },
//   {
//     path: "/logout",
//     async action() {
//       await fakeAuthProvider.signOut();
//       return redirect("/");
//     },
//   },
// ]);

const isLogged = false

const router = createBrowserRouter([
  isLogged ? ProtectedLayout() : PublicLayout()
]);

async function loginAction({ request }) {
  let formData = await request.formData();
  let username = formData.get("username");

  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await fakeAuthProvider.signIn(username);
  } catch (error) {
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/admin");
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/admin");
  }
  return null;
}

function LoginPage() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData();

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username: <input name="username" />
        </label>{" "}
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form>
    </div>
  );
}

function protectedLoader({ request }) {
  if (!fakeAuthProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

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

  const callApi = () => {
    axios.get("https://dummyjson.com/products").then(res => {
      dispatch(saveProducts(res?.data?.products))
    })
  }

  const callApi2 = async () => {
    console.log('api 2 calling...')
    const response = await axios.get("https://dummyjson.com/products")
    dispatch(saveProducts(response?.data?.products))
  }

  // const getProducts = async () => {
  //   const response = await axios.get("https://dummyjson.com/products")
  //   return response?.data?.products
  // }

  const getProducts3 = () => {
    return [
      {
        id: 1,
        title: "Sản phẩm test",
        price: 789
      }
    ]
  }

  const getProducts4 = (callback) => {
    axios.get("https://dummyjson.com/products").then(res => {
      callback(res?.data?.products)
      // return res?.data?.products
    }).finally(() => {
    })
  }

  const getProducts5 = (callback) => {
    callback([{
      id: 1,
      title: "Sản phẩm test",
      price: 789
    }])
  }

  const callApi3 = () => {
    // dispatch(getProducts())
  }

  const callApiForSaga = () => {
    dispatch(saveProducts2())
  }

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={callApiForSaga}>Test call api</button>
        <ul>
          {
            (products2 || []).map((item, index) => {
              return <li key={index}>{item?.title} ({item?.price})</li>
            })
          }
        </ul>
      </header> */}
    </div>
  );
}

export default App;
