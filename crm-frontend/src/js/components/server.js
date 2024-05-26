const SERVER_URL = "http://localhost:3000/api/clients";

export const response = await fetch(SERVER_URL);

export async function serverAddClient(obj) {
  const response = await fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  const data = await response.json();
  return data;
}

export async function serverGetClient() {
  const response = await fetch(SERVER_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  return data;
}

export async function serverDeleteClient(id) {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  return data;
}

export async function serverEditClient(id, obj) {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(obj),
  });
  const data = await response.json();

  return data;
}

export async function serverGetClientId(id) {
  const response = await fetch(`${SERVER_URL}/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  return data;
}
