'use strict';
var ricochet = require('ricochet');

module.exports = require('appframe')().registerPlugin({
	dir: __dirname,
	name: "Ricochet",
	namespace: "ricochet",
	exports: function(app){
		app.ricochet = new ricochet.Client(app.config.ricochet.client);
		app.ricochet.on('ready', function(){
			return app.info('Connected to ricochet server');
		});
		app.ricochet.on('authFail', function(err){
			return app.error('Authentication failed when connecting to ricochet server');
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
