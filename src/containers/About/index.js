import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { saveProducts, getProducts } from '../../productSlice'

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "Nội dung trang giới thiệu";
}

export function Component() {
  let data = useLoaderData()

  const products = useSelector((state) => state?.product?.products)
  const products2 = useSelector((state) => state?.product2Reducer?.products2)

  console.log('Giới thiệu')
  console.log(products)
  console.log(products2)

  return (
    <div className="about-page">
      <h2>Giới thiệu</h2>
      <p>{data}</p>

      <ul>
          {
            (products || []).map((item, index) => {
              return <li key={index}>{item?.title} ({item?.price})</li>
            })
          }
        </ul>
    </div>
  );
}

Component.displayName = "AboutPage";