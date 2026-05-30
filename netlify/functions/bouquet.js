const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

exports.handler = async (event) => {
  const url = `${process.env.SUPABASE_URL}/rest/v1/bouquet_entries`;

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  try {
    // ✅ GET
    if (event.httpMethod === "GET") {
      const res = await fetch(url + "?select=*", {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        },
      });

      const data = await res.json();

      return {
        statusCode: 200,
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
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          name,
          gift,
          message,
        }),
      });

      const data = await res.json();

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(data),
      };
    }

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};