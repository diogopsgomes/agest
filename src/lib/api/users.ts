const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUsers() {
	try {
		const res = await fetch(`${base_url}/users`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) throw new Error(res.statusText);

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export async function getUser(id: any) {
	try {
		const res = await fetch(`${base_url}/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) throw new Error(res.statusText);

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}

export async function postUser(user: any) {
	try {
		const res = await fetch(`${base_url}/users/register`, {
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

export async function putUser(id: any, user: any) {
	try {
		const res = await fetch(`${base_url}/users/update/${id}`, {
			method: 'PUT',
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

export async function deleteUser(id: any) {
	try {
		const res = await fetch(`${base_url}/users/remove/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) throw new Error(res.statusText);

		return await res.json();
	} catch (err: any) {
		throw new Error(err.message);
	}
}
