/** @module persistence/accounts */

var models = require('../models');
var errors = require('../mechanisms/error');
var validator = require('validator');
var accountsDAO = {};
var transaction = require('../mechanisms/transaction');
var pool = require('../mechanisms/database.js').pool;

/** @method createNewUser
 * @description Create a new <tt>Profile</tt> and links it to a new <tt>Account</tt>. Initiates transaction and creates new entities, linking them
 * @param account {Account}
 * @param profile {Profile}
 */
accountsDAO.createNewUser = function(account, profile) {
	return new Promise(function(resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			transaction.start(client)
			.then(function() {
				return new Promise(function(res, rej) {
					client.query('INSERT INTO profiles (name, surname, birthdate, gender) VALUES ($1, $2, $3, $4) RETURNING *', [profile.name, profile.surname, profile.birthdate, profile.gender], function(err, result) {
						if (err) rej (err);
						else res(result);
					});
				});
			}).then(function(result) {
				return new Promise(function(res, rej) {
					client.query('INSERT INTO accounts (profile, email, cellphone, hash) VALUES ($1, $2, $3, $4) RETURNING *', [result.rows[0].id, account.email, account.cellphone, account.hash], function(err, result) {
						if (err) rej (err);
						else res(result);
					});
				});
			}).then(function(result) {
				return transaction.commit(client)
				.then(function() {
					done();
					resolve(result);
				}).catch(function(err) {
					done(err);
					reject(err);
				});
			}).catch(function (err) {
				return transaction.abort(client)
				.then(function() {
					done();
					reject(err);
				}).catch(function(err2) {
					done(err2);
					reject(err);
				});
			});
		});
	});
}
/** @method confirmAccount
* @description find account with hash and applied true to <tt>account.confirmed</tt>.
* @param confirmationHash {string} hash when the model is created on the data.
* @return Promise {Promise} if successful, returns responde wih account information.
*/
accountsDAO.confirmAccount = function(confirmationHash, password) {
	return new Promise(function (resolve, reject) {
		pool.connect(function(err, client, done) {
			if (err) {
				reject(err);
				return;
			}
			transaction.start(client)
			.then(function() {
				return new Promise(function(res, rej) {
					client.query('UPDATE accounts SET (hash, confirmed, password) = ($1, $2, $3) WHERE hash = $4',[null, true, password, confirmationHash], function(err, result) {
						if (err) rej(err);
						else res(result);
					});
				});
			}).then(function(result) {
				return transaction.commit(client)
				.then(function() {
					done();
					resolve(result);
				}).catch(function(err) {
					done(err);
					reject(err);
				})
			}).catch(function(err) {
				return transaction.abort(client)
				.then(function() {
					done();
					reject(err);
				}).catch(function(err2) {
					done(err2);
					reject(err);
				});
			});
		});	
	});
}
/** @method recoverAccount
* @param email {string}
* @return Promise {Promise}
*/
accountsDAO.recoverAccount = function(email) {
 //return new Promise(function (resolve, reject) {
 //	 transaction.start();
 //	 transaction.commit();
 //	 resolve(new response(200)); //success
 //});
}

/** @method logOut
* @param device {Device}
* @param token {string}
* @return Promise {Promise}
*/
accountsDAO.logOut = function(device, token) {
	return new Promise( function(resolve, reject) {

	});
}

/** @method logOut
* @param token {string}
* @return [Devices] {Array<Devices>}
*/
accountsDAO.getAccountDevices = function(token) {
	return new Promise( function(resolve, reject) {
		//i dont know
	});
}
/** @method findOne
* @param criteria {data} {...}
* @return promise {Promise} promise with a user account data.
*/
accountsDAO.findOne = function (criteria) {
	//return new Promise (function(resolve, reject){
	//	criteria.active = true;
	//	transaction.start();
	//	return models.account.findOne(criteria).populate({'device'})
	//	.then(function(account){
	//		transaction.commit();
	//		resolve(new response(200, account));
	//	})
	//	.catch(function(err){
	//		transaction.abort();
	//		reject(err);
	//	});
	//});
}

module.exports = accountsDAO;
