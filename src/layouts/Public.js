import { Outlet, Link, useRouteLoaderData, useFetcher } from "react-router-dom";

export function PublicLayout() {
    // let { user } = useRouteLoaderData("root");
    // let fetcher = useFetcher();

    // let isLoggingOut = fetcher.formData != null;

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
                            <Link to="/login">Đăng nhập</Link>
                            {/* {
                                user 
                                ? (
                                    <AuthStatus />
                                )
                            } */}
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

// const AuthStatus = () => {
//     let { user } = useRouteLoaderData("root");
//     let fetcher = useFetcher();
  
//     if (!user) {
//       return <p>Bạn chưa đăng nhập</p>;
//     }
  
//     let isLoggingOut = fetcher.formData != null;
  
//     return (
//         <div>
//             <p>Welcome {user}!</p>
//             <fetcher.Form method="post" action="/logout">
//             <button type="submit" disabled={isLoggingOut}>
//                 {isLoggingOut ? "Signing out..." : "Sign out"}
//             </button>
//             </fetcher.Form>
//         </div>
//     );
// }