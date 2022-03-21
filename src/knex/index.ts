import knex from "knex";
import config from "../../config";
import createUsersTable from "./usersTable";

// MySQL database ORM config
const mysqlOrm = knex({
  useNullAsDefault: true,
  debug: config.nodeEnv !== "production",
  client: "mysql2",
  connection: config.dbConnection,
});

(async () => {
  try {
    await createUsersTable(mysqlOrm);
  } catch(error) {
    console.error(error);
  }
})();

export default mysqlOrm;
