const db = require('../database');

/**
* @typedef {Object} Boardgame
* @property {number} id
* @property {string} name
* @property {string} author
* @property {string} editor
* @property {number} min_players
* @property {number} max_players
* @property {number} min_age
*/

class Boardgame {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Retrieves all boardgames from database
     * @static
     * @async
     * @returns {Array<Boardgame>} all boardgames in database
     * @throws {Error} An error
     */
     static async findAll() {
        try {
            const {rows} = await db.query('SELECT * FROM boardgame');
            return rows.map(row => new Boardgame(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    /**
     * Retrieves one boardgame from database
     * @static
     * @async
     * @param {number} id 
     * @returns {Boardgame | null} the instance identified with its id, null if no record was found
     * @throws {Error} An error
     */
     static async findOne(id) {
        try {
            const {rows} = await db.query('SELECT * FROM boardgame WHERE id=$1', [id]);
            if (rows[0]) {
                return new Boardgame(rows[0]);
            }
            return null;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    /**
     * Adds or updates an instance of Boardgame in database
     * @async
     * @returns {Boardgame | undefined} the inserted instance or undefined when uptading one
     * @throws {Error} An error
     */
     async save() {
        try {
            if (this.id) {
                //update
                await db.query('SELECT * FROM update_boardgame($1)', [this]);
            } else {
                const {rows} = await db.query('SELECT * FROM add_boardgame($1)', [this])
                this.id = rows[0].id;
                return this;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    /**
     * Removes a Boardgame from database
     */
    async delete() {
        try {
            await db.query('DELETE FROM boardgame WHERE id=$1', [this.id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Boardgame;