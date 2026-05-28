import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env"
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

const BASE = "/.netlify/functions";

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
