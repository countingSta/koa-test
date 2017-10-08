"use strict";

import ContactsCtrl from "../controllers/contacts/contacts.js";
import koaRouter from "koa-router";
const router = koaRouter();

//configure the controller methods.
router.post("/ctslist", ContactsCtrl.getList); //find contacts list.
router.post("/add", ContactsCtrl.addContacts); //add contacts.
router.post("/remove", ContactsCtrl.removeContacts); //reover contacts.

export default router;

