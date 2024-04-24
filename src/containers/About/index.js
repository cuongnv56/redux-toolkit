import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { saveAbout } from '../../aboutSlice'

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "Nội dung trang giới thiệu";
}

export function Component() {
  let data = useLoaderData()
  const about = useSelector((state) => state?.about?.about)
  const dispatch = useDispatch()

  const addAbout = () => {
    dispatch(saveAbout("Tôi mới thêm mới lời giới thiệu nhá...."))
  }

  return (
    <div className="about-page">
      <h2>Giới thiệu</h2>
      <p>{data}</p>
      <button onClick={addAbout}>Add giới thiệu</button>
      {
        about && (
          <div>Nội dung: {about}</div>
        )
      }
    </div>
  );
}

Component.displayName = "AboutPage";