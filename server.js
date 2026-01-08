import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "node:stream/consumers";

process.loadEnvFile();

const port = process.env.PORT ?? 3000;

const users = [
  { id: 1, name: "Sasa" },
  { id: 2, name: "Dada" },
];

//
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}
//
const server = createServer(async (req, res) => {
  const { method, url } = req;

  // Symbols Function URL
  // ?
  // &
  // =
  // , or |
  console.log("Full url: ", url); // ex. '/users?limit=2&offset=1'
  const [pathname, queryString] = url.split("?");
  const searchParams = new URLSearchParams(queryString);
  console.log("searchParams", searchParams.get("limit"));

  if (method === "GET") {
    if (pathname === "/") {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      console.log("Received request: ", req.method, req.url);
      return res.end("Hello!! " + "📁");
    }

    if (pathname === "/users") {
      //   if (
      //     Number.isNaN(Number(searchParams.get("limit"))) ||
      //     Number.isNaN(Number(searchParams.get("offset")))
      //   ) {
      //     return sendJson(res, 404, {
      //       message: "limit and offset must be numbers",
      //     });
      //   }

      const limit = Number(searchParams.get("limit")) || users.length;
      const offset = Number(searchParams.get("offset")) || 0;

      const paginatedUsers = users.slice(offset, offset + limit);

      // res.setHeader("Content-Type", "image/png; charset=utf-8");
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      console.log("Received request: ", req.method, req.url);
      return sendJson(res, 404, { paginatedUsers });
    }

    if (pathname === "/health") {
      return sendJson(res, 200, { status: "Ok", uptime: process.uptime() });
    }
  }

  // POST
  if (method === "POST") {
    if (url === "/users") {
      const body = await json(req);

      if (!body || !body?.name) {
        return sendJson(res, 400, { error: "Name is requiered" });
      }

      const newUser = {
        name: body.name,
        id: randomUUID(),
      };

      users.push(newUser);
      return sendJson(res, 200, { message: "User created", newUser });
    }
  }

  return sendJson(res, 404, { error: "Not Found 📄" });
});

//
server.listen(port, () => {
  const address = server.address();

  console.log(address);
  console.log(`Server listeniing on port ${port}`);
});
