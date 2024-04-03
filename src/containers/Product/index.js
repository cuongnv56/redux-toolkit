import { useLoaderData } from "react-router-dom";

export function Product() {
  let data = useLoaderData()

  return (
    <div className="product-page">
      <h2>Product</h2>
    </div>
  );
}

Product.displayName = "ProductPage";