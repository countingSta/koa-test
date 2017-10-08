'use strict';

module.exports = {
	mongo:{
		port: 8001,
		url: 'mongodb://localhost:27017/addrbook',
		session: {
			name: 'SID',
			secret: 'SID',
			cookie: {
				httpOnly: true,
			    secure:   false,
			    maxAge:   365 * 24 * 60 * 60 * 1000,
			}
		}
	},
	mysql:{
		host: '127.0.0.1',
		user: 'Ziven',
		password: 'helloworld',
		database: 'addrbook',
		url:"mysql://root:helloworld@localhost/addrbook"
	}
}