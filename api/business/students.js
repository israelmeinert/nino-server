/** @module business/students */

var validator = require('validator');
var response = require('../mechanisms/response.js') ;
var studentsDAO = require('../persistence/students.js');
var credentialDAO = require('../persistence/credentials.js');
var errors = require('../mechanisms/error');
var students = {};
