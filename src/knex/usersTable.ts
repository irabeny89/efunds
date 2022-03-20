import mysqlOrm from "./index";

(async () => {
  try {
    // users table
    (await mysqlOrm.schema.hasTable("users")) ||
      (await mysqlOrm.schema.createTable("users", (table) => {
        table.increments();
        table.string("username").notNullable().unique();
        table.float("balance").notNullable().defaultTo(0);
        table.timestamps(true, true);
      }));
  } catch (error) {
    console.error(error);
  }
})();
