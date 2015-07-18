/// <reference path="../dtypes/express/express.d.ts" />

var express = require('express');
var router = express.Router();
var cs = require('../lib/configserver');

(function() {
	
	// Configuration server
	var server = new cs.MemoryConfigStore();
	server.addNew(new cs.ConfigRecord('bridge', '1.0', '<file ver="1.0" />'));
	server.addNew(new cs.ConfigRecord('bridge', '1.1', '<file ver="1.1" />'));
	server.addNew(new cs.ConfigRecord('bridge', '2.0', '<file ver="2.0" />'));
	server.addNew(new cs.ConfigRecord('omlite', '1.0', '<file ver="1.0" />'));
	
	router.get('/components', function(req, res, next) {
		res.json(server.getComponents());
	});
	
	router.get('/allVersions/:component', function(req, res, next) {
		res.json(server.getAllVersions(req.params.component));
	});
	
	router.get('/matchedVersions/:component/:version', function(req, res, next) {
		var comp = req.params.component;
		var ver = req.params.version;
		return res.json(server.getMatchedVersions(comp, ver));		
	});
	
	router.get('/exactVersion/:component/:version', function(req, res, next) {
		var comp = req.params.component;
		var ver = req.params.version;
		var rec = server.getExact(comp, ver);
		return res.json(rec);
	});
})();

/* GET home page. */

module.exports = router;
