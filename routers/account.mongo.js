"use strict";

import Account from "../controllers/account/account.mongo.js";
import koaRouter from "koa-router";
const router = koaRouter();

//configure the controller methods.
router.post("/login", Account.doLogin); //login
router.post("/register", Account.doRegister); //register


export default router;
