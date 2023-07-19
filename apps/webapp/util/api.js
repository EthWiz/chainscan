const base_url = import.meta.env.VITE_API_URL;

export async function getAlerts() {
  const response = await fetch(`https://${base_url}/event-register/all`);
  if (!response.ok) {
    throw { message: "Failed to fetch alerts.", status: 500 };
  }
  return response.json();
}

export async function deleteAlert(id) {
  const response = await fetch(
    `https://${base_url}/event-register/remove/` + id,
    { method: "DELETE" }
  );

  if (!response.ok) {
    throw { message: "Failed to delete post.", status: response.status };
  }

  return response.json();
}

export async function addAlert(alert) {
  const response = await fetch(`https://${base_url}/event-register/add`, {
    method: "POST",
    body: JSON.stringify(alert),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw { message: "Could not save post.", status: 500 };
  }
}
