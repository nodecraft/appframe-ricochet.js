'use strict';
var ricochet = require('ricochet');

module.exports = require('appframe')().registerPlugin({
	dir: __dirname,
	name: "Ricochet",
	namespace: "ricochet",
	exports: function(app){
		app.registerCodes(require('ricochet/ricochet.errors.json'))

		app.ricochet = new ricochet.Client(app.config.ricochet.client);
		app.ricochet.on('ready', function(){
			app.info('Connected to ricochet server');
			return app.emit('ricochet.ready');
		});
		app.ricochet.on('authFail', function(err){
			app.error('Authentication failed when connecting to ricochet server');
			return app.emit('ricochet.authFail', err);
		});
		app.ricochet.on('error', function(err){
			app.error('Ricochet error').debug(err);
			return app.emit('ricochet.error', err);
		});
		app.ricochet.on('disconnected', function(err){
			app.warn('Disconnected from ricochet server, attempting reconnect...');
			return app.emit('ricochet.disconnected', err);
		});
		app.ricochet.on('reconnected', function(err){
			app.info('Reconnected to ricochet server');
			return app.emit('ricochet.reconnected', err);
		});

		return app.ricochet.connect(app.config.ricochet);
	}
});
