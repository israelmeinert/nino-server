/**
* Amadeu Cavalcante
* Module services
*/

var models = require('../models');
var Students = models.waterline.collections.student;
var Classrooms = models.waterline.collections.classroom;

//errors and validator's module
var errors = require('../business/errors');
var validator = require('validator');

var studentsServices = {
	create: function(parameters) {
		return Students.create({
			name: parameters.student.name,
			surname: parameters.student.surname,
			birthdate: parameters.student.birthdate,
			gender: parameters.student.gender,
			school: parameters.schoolID,
			classroom: parameters.classroomID
		})
		.then(function(student) {
			if (!student) throw errors.internalError('Student - Creation Error');
			return Classrooms.findOne({id: parameters.classroomID})
			.then(function(classroom){
				if (!classroom) throw errors.inexistentRegister('Classroom - Finding Error');
				//console.log(classroom);
				classroom.students.add(student.id);
				return classroom.save()
				.then(function(){
					return ({student: student.id});
				});
			});
		});
	},
	delete: function(parameters) {
		if (!parameters) throw errors.invalidParameters('Missing Parameter');
		return Students.findOne(parameters).populate('guardians')
		.then(function(student) {
			if (!student) throw errors.inexistentRegister('Student - Finding Error');
			student.active = false;
			return student.save();
		});
	},
	update: function(parameters, newParameters) {
		if (!parameters || !parameters ) throw errors.invalidParameters('Missing Parameter');
		parameters.active = true;
		return Students.updated(parameters, newParameters)
		.then(function(students) {

		});
	},
  read: function(parameters) {
		if (!parameters) throw errors.invalidParameters('Missing Parameter');
		parameters.active = true;
		return Students.findOne(parameters)
		.then(function(student) {
			if(!student) return undefined;
			return student;
		});
  },
	addGuardian: function(parameters, guardian_id) {
		if (!parameters) throw errors.invalidParameters('Missing Parameter');
		parameters.active = true;
		return Students.findOne(parameters).populate('guardians')
		.then(function(student) {
			if(!student) throw errors.inexistentRegister('Student - Finding Error');
			student.guardians.add(guardian_id);
			return student.save();
		});
	},
	readComplete: function(parameters) {
		if (!parameters) throw errors.invalidParameters('Missing Parameter');
		parameters.active = true;
		return Students.findOne(parameters).populate(['school', 'guardians', 'posts', 'classroom'])
		.then(function(student) {
			if(!student) return undefined;
			return student;
		});
	}
};

module.exports = studentsServices;
