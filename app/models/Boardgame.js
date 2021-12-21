const db = require('../database');


class Boardgame {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

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

    async delete(id) {
        try {
            await db.query('DELETE FROM boardgame WHERE id=$1', [id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Boardgame;