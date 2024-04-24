import { Outlet, Link, useLocation, Navigate, useLoaderData, useFetcher, useRouteLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux'

export function Product() {
  const about = useSelector((state) => state?.about?.about)

  return (
    <div className="product-page">
      <h2>Trang sản phẩm</h2>
      <div>{about}</div>
      <Outlet />
    </div>
  );
}

Product.displayName = "ProductPage";