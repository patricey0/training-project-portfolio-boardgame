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
                await db.query('UPDATE boardgame SET name=$1, author=$2, editor=$3, min_players=$4, max_players=$5, min_age=$6 WHERE id=$7', [
                    this.name,
                    this.author,
                    this.editor,
                    this.min_players,
                    this.max_players,
                    this.min_age,
                    this.id
                ]);
            } else {
                //insert
                const {rows} = await db.query('INSERT INTO boardgame(name, author, editor, min_players, max_players, min_age) VALUES($1, $2, $3, $4, $5, $6) RETURNING id', [
                    this.name,
                    this.author,
                    this.editor,
                    this.min_players,
                    this.max_players,
                    this.min_age
                ]);
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