import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { saveProducts, getProducts } from '../../productSlice'
import { saveProducts2 } from '../../product2Slice'
import axios from 'axios';
import { api } from '../../service'
import { UserObj } from "../../service/api"

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "Nội dung trang chủ";
}

export function Home() {
  // let data = useLoaderData()
  // const products = useSelector((state: any) => state?.product?.products)
  // const products2 = useSelector((state: any) => state?.product2Reducer?.products2)
  // const dispatch = useDispatch()
  
  const callApiForSaga = () => {
    // dispatch(getProducts())
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, responseStatus } = await api.products.fetch()
        console.log('NNNNNNNNNNNNNN ', data)
      } catch (e) {

      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Home page</h2>
      {/* <p>{data}</p> */}

      <button onClick={callApiForSaga}>Test call api</button>
        {/* <ul>
          {
            (products || []).map((item, index) => {
              return <li key={index}>{item?.title} ({item?.price})</li>
            })
          }
        </ul> */}
    </div>
  );
}

Home.displayName = "HomePage";