/* global process */

const jsonHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return {
    url: `${supabaseUrl}/rest/v1/guestbook_entries`,
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  };
}

function sendJson(res, status, body) {
  Object.entries(jsonHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  return res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    Object.entries(jsonHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.status(204).end();
  }

  try {
    const supabase = getSupabaseConfig();

    if (req.method === "GET") {
      const response = await fetch(`${supabase.url}?select=*&order=created_at.desc`, {
        headers: supabase.headers,
      });
      const data = await response.json();
      return sendJson(res, response.ok ? 200 : response.status, data);
    }

    if (req.method === "POST") {
      const { name, message } =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body;

      const response = await fetch(supabase.url, {
        method: "POST",
        headers: {
          ...supabase.headers,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ name, message }),
      });
      const data = await response.json();
      return sendJson(res, response.ok ? 201 : response.status, Array.isArray(data) ? data[0] : data);
    }

    return sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    return sendJson(res, 500, { error: error.message });
  }
}
