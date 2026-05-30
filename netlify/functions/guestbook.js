import { createClient } from "@supabase/supabase-js";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json",
};

export const handler = async (event) => {
  // ✅ create client inside handler
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      realtime: { enabled: false } // 🔥 FIXES NETLIFY CRASH
    }
  );

  // ✅ CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  try {
    // ✅ GET entries
    if (event.httpMethod === "GET") {
      const { data, error } = await supabase
        .from("guestbook_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      };
    }

    // ✅ POST new message
    if (event.httpMethod === "POST") {
      const { name, message } = JSON.parse(event.body);

      if (!name?.trim() || !message?.trim()) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: "Name and message are required",
          }),
        };
      }

      const { data, error } = await supabase
        .from("guestbook_entries")
        .insert([
          {
            name: name.trim(),
            message: message.trim(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(data),
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
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
