import { useLoaderData } from "react-router-dom";

export async function accountMessagesLoader() {
    await new Promise((r) => setTimeout(r, 500));
    return {
      messages: [
        "Message 1 from Account loader",
        "Message 2 from Account loader",
        "Message 3 from Account loader",
      ],
    }
}
  
export function AccountMessages() {
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

export function Account() {
  let data = useLoaderData()

  return (
    <div className="account-page">
      <h2>Account</h2>
    </div>
  );
}

Account.displayName = "AccountPage";