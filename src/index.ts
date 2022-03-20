import express, { ErrorRequestHandler } from "express";
import config from "../config";
import knex from "knex";
import dotenv from "dotenv";

dotenv.config();
// database config
const mysqlOrm = knex({
  useNullAsDefault: true,
  debug: config.nodeEnv !== "production",
  client: "mysql2",
  connection: config.dbConnection,
});
// database creation
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
    // mysqlOrm.destroy();
    process.exit(1);
  }
})();
// instantiate express server
const server = express();

server.disable("x-powered-by");
// allow json from client enabling req.body
server.use(express.json());
// headers middleware; cors- allow all origin
server.all("/", (_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"), next();
});
// index route
server.get("/", (_, res) => {
  res.status(200).send("api ok");
});
// register
server.post("/api/accounts/add", async (req, res, next) => {
  try {
    await mysqlOrm<User>("users").insert(req.body);
    return res.status(201).send("User created");
  } catch (error) {
    next(error);
  }
});
// fund an account
server.patch("/api/accounts/fund", async (req, res, next) => {
  try {
    // credit self as funding/deposit
    await mysqlOrm<User>("users")
      .increment("balance", req.body.amount < 0 ? 0 : req.body.amount)
      .where("id", req.body.id);
    return res
      .status(200)
      .send(`Account ${req.body.id} funded with ${req.body.amount}.`);
  } catch (error) {
    next(error);
  }
});
// withdraw funds from account
server.patch("/api/accounts/withdraw", async (req, res, next) => {
  try {
    // debit account as withdrawal
    await mysqlOrm<User>("users")
      .decrement("balance", req.body.amount < 0 ? 0 : req.body.amount)
      .where("id", req.body.id);
    return res
      .status(200)
      .send(`Account ${req.body.id} withdrew ${req.body.amount}.`);
  } catch (error) {
    next(error);
  }
});
// transfer funds to another user
server.patch("/api/accounts/transfer", async (req, res, next) => {
  try {
    // start transaction to debit & credit
    await mysqlOrm.transaction(async (session) => {
      // debit sender
      await session<User>("users")
        .decrement("balance", req.body.amount < 0 ? 0 : req.body.amount)
        .where("id", req.body.from);
      // credit receiver
      await session<User>("users")
        .increment("balance", req.body.amount < 0 ? 0 : req.body.amount)
        .where("id", req.body.to);
    });
    return res
      .status(200)
      .send(
        `Account ${req.body.from} transferred ${req.body.amount} to ${req.body.to}.`
      );
  } catch (error) {
    next(error);
  }
});
// get all users
server.get("/api/accounts", async (_, res, next) => {
  try {
    res.json(await mysqlOrm("users"));
  } catch (error) {
    next(error);
  }
});
// handle errors
server.use((req, res) => {
  res.status(500).send("Something went wrong.");
  process.exit(1);
});

server.listen(config.port, () =>
  console.log("Server started on localhost with port", config.port)
);
