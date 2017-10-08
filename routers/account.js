"use strict";

import Account from "../controllers/account/account.js";
import koaRouter from "koa-router";
const router = koaRouter();

//configure the controller methods.
router.post("/account/login", Account.doLogin); //login
router.post("/account/register", Account.doRegister); //register


export default router;
