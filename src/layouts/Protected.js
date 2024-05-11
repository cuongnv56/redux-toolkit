import { Outlet, Link, useLocation, Navigate, useLoaderData, useFetcher, useRouteLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../userSlice";

export function ProtectedLayout() {
    const location = useLocation();
    const dispatch = useDispatch()
    const isLogged = useSelector((state) => state?.isLogged)
    
    const handleLogout = () => {
        dispatch(logout())
    }

    return isLogged
    ? (
        <div className="admin">
            <nav>
                <ul>
                    <li>
                        <Link to="/admin/accounts">Tài khoản</Link>
                    </li>
                    <li>
                        <Link to="/admin/product-management">Quản lý sản phẩm</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
    : <Navigate to="/login" replace state={{ from: location }} />
}
