'use strict';
var ricochet = require('ricochet');

module.exports = require('appframe')().registerPlugin({
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
			return app.error('Ricochet error').debug(err);
		});
		app.ricochet.on('disconnected', function(err){
			return app.warn('Disconnected from ricochet server, attempting reconnect...');
		});
		app.ricochet.on('reconnected', function(err){
			return app.info('Reconnected to ricochet server');
		});

		return app.ricochet.connect(app.config.ricochet);
	}
});
