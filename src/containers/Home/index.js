import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { saveProducts, getProducts } from '../../productSlice'
import { saveProducts2 } from '../../product2Slice'
import axios from 'axios';

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "Nội dung trang chủ";
}

export function Home() {
  let data = useLoaderData()
  const products = useSelector((state) => state?.product?.products)
  const products2 = useSelector((state) => state?.product2Reducer?.products2)
  const dispatch = useDispatch()

  console.log('CCCCCCCCCCCCCCCCCCCCCC')
  console.log(products)
  console.log(products2)
  
  const callApiForSaga = () => {
    dispatch(getProducts())
  }

  return (
    <div>
      <h2>Home page</h2>
      <p>{data}</p>

      <button onClick={callApiForSaga}>Test call api</button>
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

Home.displayName = "HomePage";