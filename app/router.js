const {Router} = require('express');

const gameController = require('./controllers/gameController');

const router = Router();

router.get('/test', gameController.test);


module.exports = router;