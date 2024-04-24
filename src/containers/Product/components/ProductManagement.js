import { useLoaderData } from "react-router-dom";

export function Component() {

  return (
    <div className="product-management-page">
      <h2>Quản lý danh mục sản phẩm</h2>
      <ul>
        <li>Sản phẩm 1</li>
        <li>Sản phẩm 2</li>
      </ul>
    </div>
  );
}

Component.displayName = "ProductManagement";