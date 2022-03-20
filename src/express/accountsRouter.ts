import { Router } from "express";
import {
  addAccount,
  fundAccount,
  listAccounts,
  transferFund,
  withdrawFund,
} from "./accountsHandler";

const accountsRouter = Router();

// get all users route
accountsRouter.route("/accounts").get(listAccounts);

// add user account route
accountsRouter.route("/accounts/add").post(addAccount);

// fund account route
accountsRouter.route("/accounts/fund").patch(fundAccount);

// withdrawal route
accountsRouter.route("/accounts/withdraw").patch(withdrawFund);

// transfer funds to another user route
accountsRouter.route("/accounts/transfer").patch(transferFund);

export default accountsRouter;
