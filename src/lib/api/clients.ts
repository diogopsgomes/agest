import { log } from "console";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getClients() {
  try {
    const res = await fetch(`${base_url}/clients`, {
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

export async function getClient(id: any) {
  try {
    const res = await fetch(`${base_url}/clients/${id}`, {
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

export async function postClient(client: any) {
  try {
    const res = await fetch(`${base_url}/clients/add`, {
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

export async function putClient(id: any, client: any) {
  try {
    const res = await fetch(`${base_url}/clients/update/${id}`, {
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

export async function deleteClient(id: any) {
  try {
    const res = await fetch(`${base_url}/clients/remove/${id}`, {
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

export async function getClientTypes() {
  try {
    const res = await fetch(`${base_url}/client-types`, {
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

export async function getClientType(id: any) {
  try {
    const res = await fetch(`${base_url}/client-types/${id}`, {
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

export async function postClientType(clientType: any) {
  try {
    const res = await fetch(`${base_url}/client-types/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientType),
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function putClientType(id: any, clientType: any) {
  try {
    const res = await fetch(`${base_url}/client-types/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientType),
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function deleteClientType(id: any) {
  try {
    const res = await fetch(`${base_url}/client-types/remove/${id}`, {
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
