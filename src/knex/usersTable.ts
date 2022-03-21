import mysqlOrm from "./index";

// users table
const createUsersTable = async (knex: typeof mysqlOrm) => {
  try {
    (await knex.schema.hasTable("users")) ||
      (await knex.schema.createTable("users", (table) => {
        table.increments();
        table.string("username").notNullable().unique();
        table.float("balance").notNullable().defaultTo(0);
        table.timestamps(true, true);
      }));
  } catch (error) {
    console.error(error);
  }
};

export default createUsersTable;
