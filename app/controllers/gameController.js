const Boardgame = require('../models/Boardgame');

module.exports = {
    test: (request, response) => {
        response.json('It\'s alive !!!');
    },

    findAll: async (_, response) => {
        try {
            const games = await Boardgame.findAll();
            response.json(games);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    findOne: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            const game = await Boardgame.findOne(id);
            if (!game)
                return response.status(404).json(`No game found with id ${id}`);
            response.json(game);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    save: async (request, response) => {
        try {
            const instance = new Boardgame(request.body);
            const game = await instance.save();
            if (game) {
                //on a fait un insert
                return response.status(201).json(game);
            }
            //sinon, on a fait un update
            response.status(204).json('Enregistrmeent mis à jour');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    delete: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            await new Boardgame({id}).delete();
            response.status(204).json('Enregistrement supprimé');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }

}