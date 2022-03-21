import { RequestHandler } from "express";
import mysqlOrm from "../knex";
import config from "../../config";
import { User } from "../../types";

export const addAccount: RequestHandler = async (req, res) => {
  try {
    return req?.body?.username
      ? (await mysqlOrm<User>("users").insert(req.body),
        res
          .status(201)
          .send("User created. Authentication secret: " + config.secret))
      : res
          .status(400)
          .send(
            "Username not provided. Also, you may need to verify authentication secret."
          );
  } catch (error) {
    console.error(error);
    res.status(500).send(config.generalErrorMessage);
  }
};

export const fundAccount: RequestHandler = async (req, res) => {
  try {
    return req?.headers?.authorization?.replace("Bearer ", "") ===
      config.secret &&
      req?.body?.amount &&
      req?.body?.id
      ? (await mysqlOrm<User>("users")
          .increment("balance", req.body.amount < 0 ? 0 : req.body.amount)
          .where("id", req.body.id),
        res
          .status(200)
          .send(`Account ${req.body.id} funded with ${req.body.amount}.`))
      : res
          .status(400)
          .send(
            "Amount and/or id not provided. Also verify authentication secret."
          );
  } catch (error) {
    console.error(error);
    res.status(500).send(config.generalErrorMessage);
  }
};

export const withdrawFund: RequestHandler = async (req, res) => {
  try {
    return req?.headers?.authorization?.replace("Bearer ", "") ===
      config.secret &&
      req?.body?.amount &&
      req?.body?.id
      ? (await mysqlOrm<User>("users")
          .decrement("balance", req.body.amount < 0 ? 0 : req.body.amount)
          .where("id", req.body.id),
        res
          .status(200)
          .send(`Account ${req.body.id} withdrew ${req.body.amount}.`))
      : res
          .status(400)
          .send(
            "Amount and/or id not provided. Also verify authentication secret."
          );
  } catch (error) {
    console.error(error);
    res.status(500).send(config.generalErrorMessage);
  }
};

export const transferFund: RequestHandler = async (req, res) => {
  try {
    return req?.headers?.authorization?.replace("Bearer ", "") ===
      config.secret &&
      req?.body?.amount &&
      req?.body?.from &&
      req?.body?.to &&
      (
        await mysqlOrm<User>("users")
          .select("id", "balance")
          .where("id", req.body.from)
      )[0].balance! > req.body.amount &&
      (await mysqlOrm<User>("users").select("id").where("id", req.body.to))
        .length
      ? (await mysqlOrm.transaction(async (session) => {
          // debit sender
          await session<User>("users")
            .where("id", req.body.from)
            .decrement("balance", req.body.amount < 0 ? 0 : req.body.amount);
          // credit receiver
          await session<User>("users")
            .where("id", req.body.to)
            .increment("balance", req.body.amount < 0 ? 0 : req.body.amount);
        }),
        res
          .status(200)
          .send(
            `Account ${req.body.from} transferred ${req.body.amount} to ${req.body.to}.`
          ))
      : res
          .status(400)
          .send(
            "Amount, from and/or to not provided. Also verify authentication secret."
          );
  } catch (error) {
    console.error(error);
    res.status(500).send(config.generalErrorMessage);
  }
};

export const listAccounts: RequestHandler = async (_, res) => {
  try {
    return res.json(await mysqlOrm("users"));
  } catch (error) {
    console.error(error);
    res.status(500).send(config.generalErrorMessage);
  }
};
