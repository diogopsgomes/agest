const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getTags() {
  try {
    const res = await fetch(`${base_url}/tags`, {
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

export async function getTag(id: any) {
  try {
    const res = await fetch(`${base_url}/tags/${id}`, {
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

export async function postTag(tag: any) {
  try {
    const res = await fetch(`${base_url}/tags/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function putTag(id: any, tag: any) {
  try {
    const res = await fetch(`${base_url}/tags/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function deleteTag(id: any) {
  try {
    const res = await fetch(`${base_url}/tags/remove/${id}`, {
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
