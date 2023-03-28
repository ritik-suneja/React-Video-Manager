const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(cors());
server.use(router);

module.exports = (req, res) => {
  const handler = server(req, res);
  return handler;
};
