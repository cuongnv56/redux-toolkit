import { useLoaderData } from "react-router-dom";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "Nội dung trang giới thiệu";
}

export function Component() {
  let data = useLoaderData()

  return (
    <div className="about-page">
      <h2>Giới thiệu</h2>
      <p>{data}</p>
    </div>
  );
}

Component.displayName = "AboutPage";