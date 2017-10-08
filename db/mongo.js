"use strict";

import mongoose from "mongoose";
import {mongo} from "config-lite";

mongoose.connect(mongo.url, {server:{auto_reconnect:true}});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once("open" ,() => {
	console.log("The database is connected")
})

db.on("error", function(error) {
    console.error("Error in MongoDb connection: " + error);
    mongoose.disconnect();
});

db.on("close", function() {
    console.log("The database is connected again");
    mongoose.connect(mongo.url, {server:{auto_reconnect:true}});
});

export default db;


