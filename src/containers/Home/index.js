import { useLoaderData } from "react-router-dom";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "Nội dung trang chủ";
}

export function Home() {
  let data = useLoaderData()

  return (
    <div>
      <h2>Home page</h2>
      <p>{data}</p>
    </div>
  );
}

Home.displayName = "HomePage";