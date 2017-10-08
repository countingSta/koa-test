"use strict";

import AccountModel from "../../models/account.mysql.js";
import Basement from "../../utils/basement.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



class Account extends Basement {
	constructor() {
		super();
		this.doLogin = this.doLogin.bind(this);
		this.doRegister = this.doRegister.bind(this);
		this.encryption = this.encryption.bind(this);
	}
	async doLogin(ctx) {
		try {
			const data = ctx.request.body; // data is in the request body
			const userInfo = await AccountModel.getUserByName(data.name); //userInfo validate
	
			if (userInfo != null) { // return userInfo or null
				if (!bcrypt.compareSync(data.password, userInfo.password)) {
					ctx.body = {
						errorCode: "LOGIN_FAILED",
						errorMsg: "Incorrect username or password."
					}
				} else {
					const userToken = {
						name: userInfo.user_name,
						id: userInfo.id
					};
					const secret = "protect for apis"; // set token
					const token = jwt.sign(userToken, secret); // sign token
					ctx.body = {
						errorCode: "ok",
						errorMsg: "",
						token: token // return token
					}
				}
			} else {
				ctx.body = {
					errorCode: "LOGIN_ERROR",
					errorMsg: "The user is not existed" // user unexisted
				}
			}
		} catch (err) {
			this.logger({
				code: "SERVER_EXCEPTION",
				message: err.message
			});
			ctx.body = {
				errorCode: "SERVER_EXCEPTION",
				errorMsg: "An exception has occurred on the server" // server exception
			}
		}
	}
	async doRegister(ctx) {
		try {
			const data = ctx.request.body; // data is in the request body
			// let message = {};
			// message.result = false;

			// check is username exist
			let isUsernameExist = await AccountModel.getUserByName(data.name);
			if (isUsernameExist) {
				// message.message = "";
				ctx.body = {
					errorCode:"REGITER_FAILED",
					errorMsg:"User name already exists."
				};
				return;
			}
			
			var userInfo = {
				user_name: data.user_name,
				password: this.encryption(data.password),//encryption
				address: data.address,
				phone: data.phone,
				signature: data.signature
			};

			//create an user
			await AccountModel.createUser(userInfo);

			//find user message in db
			let ret = await AccountModel.getUserByName(data.user_name);

			//update session
			// ctx.session.user = userInfo;
			ctx.body = {
				errorCode:"ok",
				errorMsg:"",
				data:ret
			};
			return;
		} catch (err) {
			this.logger({
				code: "SERVER_EXCEPTION",
				message: err.message
			});
			ctx.body = {
				errorCode: "SERVER_EXCEPTION",
				errorMsg: "An exception has occurred on the server" // server exception
			}
		}
	}
	encryption(pwd){
		let salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(pwd, salt);
	}
}

export default new Account()