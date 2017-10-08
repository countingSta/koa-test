"use strict";
import dtime from "time-formater";

class Basement {
	constructor() {
		this.index = 0
		this.logger = this.logger.bind(this)
		this.uuid = this.uuid.bind(this)
	}

	logger(error) {
		let errorLogger = {
			message:error.message,
			code:error.code,
			time:dtime().format('YYYY-MM-DD')
		};
		console.log(error);
	}
	getIndex(){
		this.index++;
		if (this.index >= 1000) {
			this.index = 1;
		}
		var nn = "" + this.index;
		while (nn.length < 3) {
			nn = "0" + nn;
		}
		return nn;
	}
	uuid(){
		var time = this.getTime();
		return ~~(time / 1000) + this.getIndex();
	}
	getTime(){
		var now = new Date();
		return now.getTime();
	}
}

export default new Basement();