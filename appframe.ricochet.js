'use strict';
var ricochet = require('ricochet');

module.exports = require('../appframe.js/appframe.js')().registerPlugin({
	dir: __dirname,
	name: "Ricochet",
	namespace: "ricochet",
	callback: true,
	exports: function(app, callback){
		app.ricochet.on('ready', function(){
			return callback();
		});
		app.ricochet.on('authFail', function(err){
			return callback(err);
		});
		app.ricochet.on('connectionFail', function(err){
			return callback(err);
		});

		app.ricochet.on('error', function(err){
			app.error('Ricochet error').debug(err);
		});
		app.ricochet.on('disconnected', function(err){
			return app.warn('Disconnected from ricochet server, attempting reconnect...');
		});
		app.ricochet.on('reconnected', function(err){
			return app.info('Reconnected to ricochet server');
		});

		app.ricochet.connect({
			host: app.config.ricochet.host,
			port: app.config.ricochet.port,
			localAddress: app.config.ricochet.local_address,
			privateKey: app.config.ricochet.private_key,
			authKey: app.config.ricochet.auth_key
		});
	}
});
