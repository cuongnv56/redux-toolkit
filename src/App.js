import { useSelector, useDispatch } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { saveProducts, getProducts } from './productSlice'
import { saveProducts2 } from './product2Slice'
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function App() {
  const products = useSelector((state) => state?.product?.products)
  const products2 = useSelector((state) => state?.product2Reducer?.products2)

  const dispatch = useDispatch()

  const callApi = () => {
    axios.get("https://dummyjson.com/products").then(res => {
      dispatch(saveProducts(res?.data?.products))
    })
  }

  const callApi2 = async () => {
    console.log('api 2 calling...')
    const response = await axios.get("https://dummyjson.com/products")
    dispatch(saveProducts(response?.data?.products))
  }

  // const getProducts = async () => {
  //   const response = await axios.get("https://dummyjson.com/products")
  //   return response?.data?.products
  // }

  const getProducts3 = () => {
    return [
      {
        id: 1,
        title: "Sản phẩm test",
        price: 789
      }
    ]
  }

  const getProducts4 = (callback) => {
    axios.get("https://dummyjson.com/products").then(res => {
      callback(res?.data?.products)
      // return res?.data?.products
    }).finally(() => {
    })
  }

  const getProducts5 = (callback) => {
    callback([{
      id: 1,
      title: "Sản phẩm test",
      price: 789
    }])
  }

  const callApi3 = () => {
    // dispatch(getProducts())
  }

  const callApiForSaga = () => {
    dispatch(saveProducts2())
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={callApiForSaga}>Test call api</button>
        <ul>
          {
            (products2 || []).map((item, index) => {
              return <li key={index}>{item?.title} ({item?.price})</li>
            })
          }
        </ul>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React333333333333333333333333333
        </a> */}
      </header>
    </div>
  );
}

export default App;
