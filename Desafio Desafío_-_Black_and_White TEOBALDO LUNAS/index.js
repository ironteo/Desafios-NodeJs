const http = require("http");
const fs = require("fs");
const Jimp = require("jimp");
const url = require("url");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("index.html", "utf8", (err, html) => {
        res.end(html);
      });
    }
    if (req.url.startsWith("/cargar")) {
      const params = url.parse(req.url, true).query;
      Jimp.read(params.imagen, (err, data) => {
        data
          .resize(350, Jimp.AUTO)
          .quality(60)
          .greyscale()
          .writeAsync("newImg.jpg")
          .then(() => {
            fs.readFile("newImg.jpg", (err, imagen) => {
              res.writeHead(200, { "Content-Type": "image/jpeg" });
              res.end(imagen);
            });
          });
      });
    }
    if (req.url.startsWith("/estilos")) {
      res.writeHead(200, { "Content-Type": "text/css" });
      fs.readFile("estilos.css", (err, css) => {
        res.end(css);
      });
    }
  })
  .listen(3000, () => console.log("Server on"));
