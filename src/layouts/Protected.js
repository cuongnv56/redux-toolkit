import { Outlet, Link, useLocation, Navigate, useLoaderData, useFetcher, useRouteLoaderData } from "react-router-dom";

export function ProtectedLayout() {
    const location = useLocation();
    const isLogged = false

    return isLogged
    ? (
        <div className="admin">
            <nav>
                <ul>
                    <li>
                        <Link to="/admin/accounts">Tài khoản</Link>
                    </li>
                    <li>
                        <Link to="/admin/products">Quản lý sản phẩm</Link>
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
