const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function login(user: any) {
	try {
		const res = await fetch(`${base_url}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (!res.ok) throw new Error(res.statusText);

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}
