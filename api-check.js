// api-check.js
const fetch = require("node-fetch");

const BASE_URL = "http://localhost:5000";

const endpoints = [
  { method: "GET", path: "/api/cars" },
  { method: "GET", path: "/api/services" },
  { method: "GET", path: "/api/testimonials" },
  {
    method: "POST",
    path: "/api/contact",
    body: { name: "John Doe", email: "john@example.com", message: "Hello" },
  },
  {
    method: "POST",
    path: "/api/newsletter",
    body: { email: "john@example.com" },
  },
];

(async () => {
  for (const ep of endpoints) {
    try {
      const options = { method: ep.method, headers: { "Content-Type": "application/json" } };
      if (ep.body) options.body = JSON.stringify(ep.body);

      const res = await fetch(`${BASE_URL}${ep.path}`, options);
      const data = await res.json();

      console.log(`\n✅ ${ep.method} ${ep.path} — Status: ${res.status}`);
      console.log("Response:", data);
    } catch (err) {
      console.error(`\n❌ ${ep.method} ${ep.path} — Error:`, err.message);
    }
  }
})();
