import { createServer } from "node:http";

const port = process.env.PORT ?? 3000;

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  console.log("Received request: ", req.method, req.url);
  return res.end("Hello!! " + "📁");
});

server.listen(port, () => {
  const address = server.address();

  console.log(address);
  console.log(`Server listeniing on port ${port}`);
});
