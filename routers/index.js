"use strict";

// import account from "./account"; //by mysql
import account from "./account.mongo";
import contacts from "./contacts";
import koaRouter from "koa-router";
import jwt from 'koa-jwt';
const router = koaRouter();

//manage the routers.

//mysql
// router.use("/account", account.routes());

//mongo
//all the request in api that need to check.
router.use("/account", account.routes());
router.use("/contacts",contacts.routes());



export default router.routes();