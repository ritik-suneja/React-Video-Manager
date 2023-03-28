const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(cors()); // Use CORS middleware
server.use(router);

const port = 5001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
