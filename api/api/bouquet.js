/* global process */

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  const url = `${process.env.SUPABASE_URL}/rest/v1/bouquet_entries`;
  const supabaseHeaders = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  try {
    // ✅ GET
    if (event.httpMethod === "GET") {
      const res = await fetch(`${url}?select=*&order=created_at.desc`, {
        headers: supabaseHeaders,
      });
      const data = await res.json();

      return {
        statusCode: res.ok ? 200 : res.status,
        headers,
        body: JSON.stringify(data),
      };
    }

    // ✅ POST
    if (event.httpMethod === "POST") {
      const { name, gift, message } = JSON.parse(event.body);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          ...supabaseHeaders,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ name, gift, message }),
      });

      const data = await res.json();

      return {
        statusCode: res.ok ? 201 : res.status,
        headers,
        body: JSON.stringify(Array.isArray(data) ? data[0] : data),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
