import Cookies from "js-cookie";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProjects() {
  try {
    const res = await fetch(`${base_url}/projects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getProject(id: any) {
  try {
    const res = await fetch(`${base_url}/projects/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function postProject(project: any) {
  try {
    const res = await fetch(`${base_url}/projects/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function putProject(id: any, project: any) {
  try {
    const res = await fetch(`${base_url}/projects/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function deleteProject(id: any) {
  try {
    const res = await fetch(`${base_url}/projects/remove/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(res.statusText);

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message);
  }
}
