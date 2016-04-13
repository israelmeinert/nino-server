var express = require('express');
var router = express.Router();
var errors = require('../business/errors');

var validator = function(req, res, next, id) {
	if (!isNaN(id)) {
		next();
	} else {
		res.status(400).end(errors.invalidParameters("path_isNaN"));
	}
};

//Always check all path parameters for NaN error
router.param('student_id', validator);
router.param('guardian_id', validator);
router.param('post_id', validator);

/* Get Timeline cells for that Baby. */
router.get('/students/:student_id', function(req, res, next) {
	//Check parameters
	if (req.token === undefined) res.status(400).json(errors.invalidParameters("token"));
	else {
		//Should now call business
	
		//End response
		res.send('WIP');
	}
});

/* Create new Post for a Baby */
router.post('/students/:student_id', function(req, res, next) {
	//Check parameters
	if (req.token === undefined) res.status(400).json(errors.invalidParameters("token"));
	else if (req.body.message === undefined) {
		if (req.body.attachment === undefined) { //No message nor attachment => empty post
			res.status(400).json(errors.invalidParameters("empty"));
		}
	}
	else if (req.body.type === undefined) res.status(400).json(errors.invalidParameters("type"));
	else if (req.body.poster === undefined) res.status(400).json(errors.invalidParameters("poster"));
	else {
		//Should now call business
	
		//End response
		res.send('WIP');
	}
});

/* Create new Post for a list of Baby */
router.post('/students', function(req, res, next) {
	//Check parameters
	if (req.token === undefined) res.status(400).json(errors.invalidParameters("token"));
	else if (req.body.message === undefined) {
		if (req.body.attachment === undefined) { //No message nor attachment => empty post
			res.status(400).json(errors.invalidParameters("empty"));
		}
	}
	else if (req.body.type === undefined) res.status(400).json(errors.invalidParameters("type"));
	else if (req.body.poster === undefined) res.status(400).json(errors.invalidParameters("poster"));
	else if (req.body.students === undefined) res.status(400).json(errors.invalidParameters("students"));
	else {
		//Should now call business
	
		//End response
		res.send('WIP');
	}
});

/* Get Timeline cells for that Guardian */
router.get('/guardians/:guardian_id', function(req, res, next) {
	//Check parameters
	if (req.token === undefined) res.status(400).json(errors.invalidParameters("token"));
	else {
		//Should now call business
	
		//End response
		res.send('WIP');
	}
});

/* Delete Post */
router.delete('/:post_id', function(req, res, next) {
	//Check parameters
	if (req.token === undefined) res.status(400).json(errors.invalidParameters("token"));
	else {
		//Should now call business
	
		//End response
		res.send('WIP');
	}
});

/* Update Post */
router.put('/:post_id', function(req, res, next) {
	//Check parameters
	if (req.token === undefined) res.status(400).json(errors.invalidParameters("token"));
	else if (req.body.message === undefined) {
		if (req.body.attachment === undefined) { //No message nor attachment => empty post
			res.status(400).json(errors.invalidParameters("empty"));
		}
	}
	else if (req.body.poster === undefined) res.status(400).json(errors.invalidParameters("poster"));
	else {
		//Should now call business
	
		//End response
		res.send('WIP');
	}
});

module.exports = router;