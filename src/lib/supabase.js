const BASE = "/api";

export async function fetchBouquet() {
  const res = await fetch(`${BASE}/bouquet`);
  if (!res.ok) throw new Error("Failed to fetch bouquet");
  return res.json();
}

export async function submitBouquet({ name, gift, message }) {
  const res = await fetch(`${BASE}/bouquet`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, gift, message }),
  });
  if (!res.ok) throw new Error("Failed to submit bouquet");
  return res.json();
}

export async function fetchGuestbook() {
  const res = await fetch(`${BASE}/guestbook`);
  if (!res.ok) throw new Error("Failed to fetch guestbook");
  return res.json();
}

export async function submitGuestbook({ name, message }) {
  const res = await fetch(`${BASE}/guestbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  });
  if (!res.ok) throw new Error("Failed to submit guestbook");
  return res.json();
}