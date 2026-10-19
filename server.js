const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-cache"
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  let pathname;

  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    send(res, 400, "Bad request");
    return;
  }

  if (pathname.endsWith("/")) pathname += "index.html";

  const filePath = path.resolve(root, `.${pathname}`);
  if (!filePath.startsWith(root + path.sep) && filePath !== root) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      const notFoundPath = path.join(root, "404.html");
      fs.readFile(notFoundPath, (readError, content) => {
        if (readError) {
          send(res, 404, "Not found");
          return;
        }
        send(res, 404, content, mimeTypes[".html"]);
      });
      return;
    }

    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    fs.readFile(filePath, (readError, content) => {
      if (readError) {
        send(res, 500, "Unable to read file");
        return;
      }
      send(res, 200, content, contentType);
    });
  });
});

server.listen(port, () => {
  console.log(`Personal page is running at http://localhost:${port}`);
});
