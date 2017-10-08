"use strict";

import {User,Contacts} from "../../models/contacts.mongo.js";
import utils from "../../utils/basement.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


class Account {
	constructor() {
		this.doLogin = this.doLogin.bind(this);
		this.doRegister = this.doRegister.bind(this);
		this.encryption = this.encryption.bind(this);
	}
	async doLogin(ctx) {
		try {
			const data = ctx.request.body; // data is in the request body
			const userInfo = await User.findOne({name:data.username}); //userInfo validate
			
			if (userInfo != null) { // return userInfo or null
				if (!bcrypt.compareSync(data.password, userInfo.password)) {
					ctx.body = {
						errorCode: "LOGIN_FAILED",
						errorMsg: "Incorrect username or password."
					}
				} else {
					let res = this.configData(userInfo);
					ctx.body = {
						errorCode: "ok",
						errorMsg: "",
						data: res // return token
					}
				}
			} else {
				ctx.body = {
					errorCode: "LOGIN_ERROR",
					errorMsg: "The user is not existed" // user unexisted
				}
			}
		} catch (err) {
			utils.logger({
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

			// check is username exist
			let isUsernameExist = await User.findOne({name:data.username});
			if (isUsernameExist) {
				// message.message = "";
				ctx.body = {
					errorCode:"REGITER_FAILED",
					errorMsg:"User name already exists."
				};
				return;
			}
			
			var userInfo = {
				id:utils.uuid(),
				name: data.username,
				password: this.encryption(data.password),//encryption
				address: data.address,
				phone: data.phone
			};

			//create an user
			await User.create(userInfo);
			await Contacts.create({
				id: userInfo.id,
				create_time: utils.getTime(),
				status: 1
			});
			//find user message in db
			let newUser = await User.findOne({name:data.username});
			let res = this.configData(newUser);
			//update session
			// ctx.session.user = userInfo;
			ctx.body = {
				errorCode:"ok",
				errorMsg:"",
				data:res
			};
			return;
		} catch (err) {
			utils.logger({
				code: "SERVER_EXCEPTION",
				message: err.message
			});
			ctx.body = {
				errorCode: "SERVER_EXCEPTION",
				errorMsg: "An exception has occurred on the server" // server exception
			}
		}
	}
	configData(userInfo){
		return {
			id:userInfo.id,
			name:userInfo.name,
			phone:userInfo.phone,
			address:userInfo.address,
			token:this.getToken(userInfo)
		}
	}
	getToken(userInfo){
		const userToken = {
			name: userInfo.name,
			id: userInfo.id
		};
		const secret = "protect for apis"; // set token
		return jwt.sign(userToken, secret); // sign token
	}
	encryption(pwd){
		let salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(pwd, salt);
	}
}

export default new Account()