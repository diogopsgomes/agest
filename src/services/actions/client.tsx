import { toast } from "sonner";

export async function getClients() {
  try {
    const response = await fetch(`http://192.168.1.90:3000/clients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toast.error("Failed to fetch clients:", {
        description: response.statusText,
      });
      return [];
    }

    const result = await response.json();

    return result.clients;
  } catch (error) {
    toast.error("Error fetching clients:", { description: String(error) });
    return [];
  }
}

export async function getClient(id: any) {
  const response = await fetch(`http://192.168.1.90:3000/clients/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function createClient(client: any) {
  const response = await fetch(`http://192.168.1.90:3000/clients/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
  const result = await response.json();
  return result;
}

export async function getClientTypes() {
  const response = await fetch(`http://192.168.1.90:3000/client-types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result.clientTypes;
}
