import { log } from "console";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getQuotes() {
  try {
    const res = await fetch(`${base_url}/quotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getQuote(id: any) {
  try {
    const res = await fetch(`${base_url}/quotes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function postQuote(client: any) {
  try {
    const res = await fetch(`${base_url}/quotes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function putQuote(id: any, client: any) {
  try {
    const res = await fetch(`${base_url}/quotes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function deleteQuote(id: any) {
  try {
    const res = await fetch(`${base_url}/quotes/remove/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}
