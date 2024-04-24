import { useLoaderData, useNavigate  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../userSlice'
import { useEffect } from "react";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "Nội dung trang Login";
}

export function Component(props) {
  let data = useLoaderData()
  const dispatch = useDispatch()
  const isLogged = useSelector((state) => state?.user?.isLogged)

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/admin")
    }
  }, [])

  const handleLogin = () => {
    dispatch(login(true))
    navigate("/admin")
  }

  return (
    <div className="login-page">
      <h2>Đăng nhập</h2>
      <p>{data}</p>
      <button onClick={handleLogin}>Đăng nhập</button>
      <div>Đã login: {isLogged?.toString()}</div>
    </div>
  );
}

Component.displayName = "LoginPage";