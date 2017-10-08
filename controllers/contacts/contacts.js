"use strict";

import {Contacts,User} from "../../models/contacts.mongo.js";
import utils from "../../utils/basement.js";


class ContactsCtrl {
	constructor(){
		this.getList = this.getList.bind(this);
	}
	async getList(ctx){
		const {userId,pageIndex,pageSize} = ctx.request.body;
		try{
			const cta = await Contacts.findOne({id:userId});
			const startIndex = (Number(pageIndex) - 1) * pageSize;
			const endIndex = startIndex + Number(pageSize);
	
			let data = {
				id: cta.id,
				list:cta.contacts.slice(startIndex,endIndex),
				pageIndex:pageIndex,
				pageSize:pageSize,
				totalCount:cta.contacts.length
			};
			ctx.body = {
				errorCode:"ok",
				errorMsg:"",
				data:data
			}
		}catch(err){
			ctx.body = {
				errorCode:"ERROR_GET_DATA",
				errorMsg:"Failed to obtain data."
			}
		}
	}
	async addContacts(ctx){
		const {userId,userInfo} = ctx.request.body;
		try{
			const cta = await Contacts.findOne({id:userId});
			userInfo.id = utils.uuid();
			cta.contacts.push(userInfo);
			await cta.save();
	
			ctx.body = {
				errorCode:"ok",
				errorMsg:""
			}
		}catch(err){
			console.log(err);
			ctx.body = {
				errorCode:"ERROR_GET_DATA",
				errorMsg:"Failed to obtain data."
			}
		}
	}
	async removeContacts(ctx){
		const {userId,contacts_id} = ctx.request.body;
		try{
			const cta = await Contacts.findOne({id:userId});
			cta.contacts = Contacts.removeContactsById(userId,cta.contacts);
			console.log(cta.contacts);
			await cta.save();
			ctx.body = {
				errorCode:"ok",
				errorMsg:""
			}
		}catch(err){
			utils.logger({
				code: "ERROR_GET_DATA",
				message: err.message
			});
			ctx.body = {
				errorCode:"ERROR_GET_DATA",
				errorMsg:"Failed to obtain data."
			}
		}
	}
}

export default new ContactsCtrl()