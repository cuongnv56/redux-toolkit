import { useLoaderData } from "react-router-dom";

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return "Nội dung trang Dashboard";
}

export async function dashboardMessagesLoader() {
    await new Promise((r) => setTimeout(r, 500));
    return {
      messages: [
        "Message 1 from Dashboard.tsx loader",
        "Message 2 from Dashboard.tsx loader",
        "Message 3 from Dashboard.tsx loader",
      ],
    }
}
  
export function DashboardMessages() {
    let { messages } = useLoaderData();
  
    return (
        <div>
            <h2>Messages</h2>
            <ul>
            {messages.map((m) => (
                <li key={m}>{m}</li>
            ))}
            </ul>
        </div>
    );
}

export function Dashboard() {
  let data = useLoaderData()

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
    </div>
  );
}

Dashboard.displayName = "DashboardPage";