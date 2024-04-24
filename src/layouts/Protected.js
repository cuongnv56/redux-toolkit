import { Outlet, Link, useLocation, Navigate, useLoaderData, useFetcher, useRouteLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux'

export function ProtectedLayout() {
    const location = useLocation();
    const isLogged = useSelector((state) => state?.user?.isLogged)

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
                        <Link to="/admin/logout">Logout</Link>
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
