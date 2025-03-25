const base_url = "http://192.168.1.90:3000";

export async function getClients() {
  try {
    const res = await fetch(`${base_url}/clients`, {
      method: "GET",
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
      body: JSON.stringify(client),
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
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}
