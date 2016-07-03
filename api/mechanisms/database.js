var models = require('../models');
var pg = require('pg');
var pool = new pg.Pool(models.config);

var createAccounts = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS accounts' + 
					'(id	SERIAL PRIMARY KEY,' + 
					 'profile	INTEGER REFERENCES profiles (id) ON DELETE CASCADE,' +
					 'email	VARCHAR UNIQUE NOT NULL,' +
					 'password	VARCHAR,' + 
					 'cellphone	VARCHAR,' +
					 'hash	VARCHAR UNIQUE,' +
					 'confirmed	BOOLEAN NOT NULL DEFAULT false,' + 
					 'lost BOOLEAN NOT NULL DEFAULT false)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createCredentials = function(pool) {
	return new Promise(function(resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
			   	reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS credentials' +
					'(id	SERIAL PRIMARY KEY,' +
					 'account	INTEGER REFERENCES accounts (id) ON DELETE CASCADE,' +
					 'device	VARCHAR NOT NULL,' +
					 'notifiable	BOOLEAN NOT NULL DEFAULT false,' + 
					 'notificationID	VARCHAR,' + 
					 'token	VARCHAR NOT NULL)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			})
		});
	});
};

var createProfiles = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
			   	reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS profiles' +
				'(id	SERIAL PRIMARY KEY,' +
				 'name	VARCHAR NOT NULL,' +
				 'surname	VARCHAR NOT NULL,' +
				 'profilePicture	VARCHAR,' +
				 'birthdate	TIMESTAMPTZ,' +
				 'gender	INTEGER)' 
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createSchools = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) { 
				reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS schools' +
				'(id	SERIAL PRIMARY KEY,' +
				 'owner	INTEGER REFERENCES accounts (id) ON DELETE RESTRICT,' +
				 'notificationGroup	VARCHAR,' +
				 'address	VARCHAR,' +
				 'cnpj	VARCHAR,' +
				 'logo	VARCHAR,' +
				 'telephone	VARCHAR,' +
				 'email	VARCHAR UNIQUE NOT NULL,' +
				 'name	VARCHAR)' 
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createClasses = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
			   	reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS classes' +
				'(id	SERIAL PRIMARY KEY,' +
				 'name	VARCHAR NOT NULL,' +
				 'school	INTEGER REFERENCES schools (id) ON DELETE CASCADE,' +
				 'menu	INTEGER REFERENCES menus (id) ON DELETE SET NULL)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createRooms = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
			   	reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS rooms' +
				'(id	SERIAL PRIMARY KEY,' +
				 'name	VARCHAR NOT NULL,' +
				 'class INTEGER REFERENCES classes (id) ON DELETE CASCADE,' +
				 'notificationGroup	VARCHAR)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createStudents = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
			   	reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS students' +
				'(id	SERIAL PRIMARY KEY,' +
				 'profile	INTEGER REFERENCES profiles (id) ON DELETE CASCADE,' +
				 'school	INTEGER REFERENCES schools (id) ON DELETE SET NULL,' +
				 'room	INTEGER REFERENCES rooms (id) ON DELETE SET NULL)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createGuardians = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
			   	reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS guardians' +
				'(id	SERIAL PRIMARY KEY,' +
				 'profile	INTEGER REFERENCES profiles (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createEmployees = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
			   	reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS employees' +
				'(id	SERIAL PRIMARY KEY,' +
				 'profile	INTEGER REFERENCES profiles (id) ON DELETE CASCADE,' +
				 'school	INTEGER REFERENCES schools (id) ON DELETE SET NULL)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createMenus = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
			   	reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS menus' +
				'(id	SERIAL PRIMARY KEY,' +
				 'school INTEGER REFERENCES schools (id) ON DELETE CASCADE,' +
				 'description	VARCHAR NOT NULL)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createActivities = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
			   	reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS activities' +
				'(id	SERIAL PRIMARY KEY,' +
				 'name	VARCHAR NOT NULL,' +
				 'description	VARCHAR NOT NULL,' +
				 'school	INTEGER REFERENCES schools (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createEvents = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) { 
				reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS events' +
				'(id	SERIAL PRIMARY KEY,' + 
				 'school	INTEGER REFERENCES schools (id) ON DELETE CASCADE,' + 
				 'room	INTEGER REFERENCES rooms (id) ON DELETE CASCADE,' +
				 'class	INTEGER REFERENCES classes (id) ON DELETE CASCADE,' +
				 'date	TIMESTAMPTZ,' +
				 'description	VARCHAR NOT NULL)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createDrafts = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) { 
				reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS drafts' +
				'(id	SERIAL PRIMARY KEY,' + 
				 'message	VARCHAR,' +
				 'attachment	VARCHAR,' +
				 'school	INTEGER REFERENCES schools (id) ON DELETE CASCADE,' + 
				 'class	INTEGER REFERENCES classes (id) ON DELETE CASCADE,' +
				 'room	INTEGER REFERENCES rooms (id) ON DELETE CASCADE,' +
				 'type	INTEGER NOT NULL)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createPosts = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject (err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS posts' +
				'(id	SERIAL PRIMARY KEY,' + 
				 'message	VARCHAR,' +
				 'attachment	VARCHAR,' +
				 'school	INTEGER REFERENCES schools (id) ON DELETE CASCADE,' + 
				 'class	INTEGER REFERENCES classes (id) ON DELETE CASCADE,' +
				 'room	INTEGER REFERENCES rooms (id) ON DELETE CASCADE,' +
				 'date	TIMESTAMPTZ DEFAULT current_timestamp,' +
				 'type	INTEGER NOT NULL)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createActivitiesClasses = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS activities_classes' + 
				'(activity	INTEGER REFERENCES activities (id) ON DELETE CASCADE,' +
				 'class	INTEGER REFERENCES classes (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createClassesEducators = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS classes_educators' +
				'(class INTEGER REFERENCES classes (id) ON DELETE CASCADE,' +
				 'educators INTEGER REFERENCES employees (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createDraftsStudents = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS drafts_students' +
				'(draft INTEGER REFERENCES drafts (id) ON DELETE CASCADE,' +
				 'student INTEGER REFERENCES students (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createEducatorRooms = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS educators_rooms' +
				'(educator	INTEGER REFERENCES employees (id) ON DELETE CASCADE,' +
				 'room	INTEGER REFERENCES rooms (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createEventsConfirmations = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS events_confirmations' +
				'(event	INTEGER REFERENCES events (id) ON DELETE CASCADE,' +
				 'profile	INTEGER REFERENCES profiles (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createGuardiansStudents = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS guardians_students' +
				'(guardian	INTEGER REFERENCES guardians (id) ON DELETE RESTRICT,' +
				 'student	INTEGER REFERENCES students (id) ON DELETE RESTRICT)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createPostsStudents = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS posts_students' +
				'(post	INTEGER REFERENCES posts (id) ON DELETE CASCADE,' +
				 'student	INTEGER REFERENCES students ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createPostsEducators = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS posts_educators' +
				'(post	INTEGER REFERENCES posts (id) ON DELETE CASCADE,' +
				 'educator	INTEGER REFERENCES employees (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createPostsReads = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS posts_reads' +
				'(post	INTEGER REFERENCES posts (id) ON DELETE CASCADE,' +
				 'profile	INTEGER REFERENCES profiles (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createSchoolsPedagogues = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS schools_pedagogues' +
				'(school	INTEGER REFERENCES schools (id) ON DELETE RESTRICT,' +
				 'pedagogue	INTEGER REFERENCES employees (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createSchoolsEducators = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS schools_educators' +
				'(school	INTEGER REFERENCES schools (id) ON DELETE RESTRICT,' +
				 'educator	INTEGER REFERENCES employees (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createSchoolsNutritionists = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS schools_nutritionists' +
				'(school	INTEGER REFERENCES schools (id) ON DELETE RESTRICT,' +
				 'nutritionist	INTEGER REFERENCES employees (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var createSchoolsCoordinators = function(pool) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			client.query('CREATE TABLE IF NOT EXISTS schools_coordinators' +
				'(school	INTEGER REFERENCES schools (id) ON DELETE RESTRICT,' +
				 'coordinator	INTEGER REFERENCES employees (id) ON DELETE CASCADE)'
			, function(err, result) {
				done();
				if (err) reject(err);
				else resolve(result);
			});
		});
	});
};

var db = {
	createTables: function() {
		return new Promise(function (resolve, reject) {
			createProfiles(pool)
			.then(function(done) {
				return createAccounts(pool);
			}).then(function(done) {
				return Promise.all([createCredentials(pool), createSchools(pool), createGuardians(pool)]);
			}).then(function(done) {
				return Promise.all([createActivities(pool), createMenus(pool), createEmployees(pool)]);
			}).then(function(done) {
				return createClasses(pool);
			}).then(function(done) {
				return createRooms(pool);
			}).then(function (done) {
				return Promise.all([createDrafts(pool), createPosts(pool), createEvents(pool), createStudents(pool)]);
			}).then(function(done) {
				return Promise.all([createActivitiesClasses(pool), createClassesEducators(pool), createDraftsStudents(pool), createEducatorRooms(pool), createEventsConfirmations(pool), createGuardiansStudents(pool), createPostsStudents(pool), createPostsEducators(pool), createPostsReads(pool), createSchoolsPedagogues(pool), createSchoolsEducators(pool), createSchoolsNutritionists(pool), createSchoolsCoordinators(pool)]);
			}).then(function(success) {
				resolve(success);
			})
			.catch(function(err) {
				reject(err);
			});
		});
	},
	pool: pool,
};

module.exports = db;