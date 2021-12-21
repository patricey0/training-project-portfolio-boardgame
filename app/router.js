const {Router} = require('express');

const gameController = require('./controllers/gameController');

const router = Router();

/**
 * GET /v1/test
 * @summary Test route
 * @tags Boardgames
 * @returns {string} 200 - 'It\'s alive !!!' if the test is successfull
 */
router.get('/test', gameController.test);

/**
 * GET /v1/boardgames
 * @summary  Respond with all boardgames in database
 * @tags Boardgames
 * @returns {array<Boardgame>} 200 - An array of boardgames
 * @returns {string} 500 - An error message
 */
 router.get('/boardgames', gameController.findAll);

/**
 * GET /v1/boardgames/{id}
 * @summary Respond with one boardgame from database
 * @tags Boardgames
 * @param {number} id.path.required The id of the boardgame to fetch
 * @returns {Boardgame} 200 - A single boardgame identified by its id
 * @returns {string} 404 - A not found error message
 * @returns {string} 500 - An error message
 */
 router.get('/boardgames/:id(\\d+)', gameController.findOne);

/**
* @typedef BoardgamePost
* @property {string} name
* @property {string} author
* @property {string} editor
* @property {number} min_players
* @property {number} max_players
* @property {number} min_age
*/

/**
 * POST /v1/boardgames/save
 * @summary Adds a new boargame in database
 * @tags Boardgames
 * @param {BoardgamePost} request.body.required Boardgame object to add in database
 * @returns {Boardgame} 201 - The newly created boardgame
 * @returns {string} 500 - An error message
 */
 router.post('/boardgames/save', gameController.save);

/**
 * PATCH /v1/boardgames/save
 * @summary Updates an existing boargame in database
 * @tags Boardgames
 * @param {Boardgame} request.body.required Boardgame object to add in database
 * @returns {string} 204 - A confirmation message
 * @returns {string} 500 - An error message
 */
 router.patch('/boardgames/save', gameController.save);

/**
 * DELETE /v1/boardgames/{id}
 * @summary Delete one boardgame in database
 * @tags Boardgames
 * @param {number} id.path.required The id of the boardgame to fetch
 * @returns {string} 204 - A confirmation message
 * @returns {string} 500 - An error message
 */
router.delete('/boardgames/:id(\\d+)', gameController.delete);


module.exports = router;