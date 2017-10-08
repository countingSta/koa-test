'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

//user
const userSchema = new Schema({
	id:Number,
	name:{type: String, isRequired: true},
	password:{type: String, isRequired: true},
	address: {type: String, isRequired: true},
	phone:{type: Number, isRequired: true},
	tips: {type: Array, default: []},
});


userSchema.index({ id: 1 });

//contacts
const contactsSchema = new Schema({
	id: Number,
	create_time: String,
	status: Number,  
	contacts:[userSchema]
});

contactsSchema.statics.getContactsById = function(id,list){
	let length = list.length;
	let ret = [];
	for(let i = 0; i < length; i++){
		if(list[i].id == id){
			return list[i]
		}
	}
}

contactsSchema.index({id: 1});

export const User = mongoose.model('user', userSchema);
export const Contacts = mongoose.model('contacts', contactsSchema);

// export default {Contacts,User};