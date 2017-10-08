"use strict";
import Sequelize from "sequelize";
import {mysql} from "config-lite";

console.log(mysql)

//链接mysql
// export default new Sequelize(mysql.database, mysql.username, mysql.password, mysql);
export default new Sequelize(mysql.url, {
	define: {
	    timestamps: false // cancel the time stamp
	}
})



	