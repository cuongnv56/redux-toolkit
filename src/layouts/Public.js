import { Outlet, Link, useRouteLoaderData, useFetcher } from "react-router-dom";

export function PublicLayout() {
    return (
        <div className="wrapper">
            <div className="header">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/gioi-thieu">Giới thiệu</Link>
                        </li>
                        <li>
                            <Link to="/products">Sản phẩm</Link>
                        </li>
                        <li>
                            <Link to="/login">Đăng nhập</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="main">
                <Outlet />
            </div>
            <div className="footer">Đây là footer</div>
        </div> 
    )
}
