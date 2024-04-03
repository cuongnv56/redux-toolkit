import { Outlet, Link, useLoaderData, useFetcher, useRouteLoaderData } from "react-router-dom";

export function ProtectedLayout() {
    // let { user } = useRouteLoaderData("root");
    // let fetcher = useFetcher();

    // let isLoggingOut = fetcher.formData != null;

    return (
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
}
