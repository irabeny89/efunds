import knex from "knex";
import config from "../../config";

// database config
const mysqlOrm = knex({
  useNullAsDefault: true,
  debug: config.nodeEnv !== "production",
  client: "mysql2",
  connection: config.dbConnection,
});

export default mysqlOrm;
