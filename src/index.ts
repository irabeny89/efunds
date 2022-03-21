import server from "../src/express";
import config from "../config";

// start the server & listen for requests
server.listen(config.port, () =>
  console.log("Server started with port", config.port)
);

export default server;
