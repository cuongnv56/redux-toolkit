import { useLoaderData } from "react-router-dom";
// import { fakeAuthProvider } from "../../auth";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "Nội dung trang Login";
}

export function Component() {
  let data = useLoaderData()

  const login = async () => {
    // await new Promise((r) => setTimeout(r, 500)); // fake delay
    // fakeAuthProvider.isAuthenticated = true;
    // fakeAuthProvider.username = username;
  }

  return (
    <div className="login-page">
      <h2>Đăng nhập</h2>
      <p>{data}</p>
      <button onClick={login}>Đăng nhập</button>
    </div>
  );
}

Component.displayName = "LoginPage";