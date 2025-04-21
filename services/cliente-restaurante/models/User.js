class User {
    constructor(db) {
        this.db = db;
    }

    async create(email, password, tipo) {
        const [result] = await this.db.execute(
            'INSERT INTO usuario (email, senha, tipo) VALUES (?, ?, ?)',
            [email, password, tipo]
        );
        return result.insertId;
    }

    async findByEmail(email) {
        const [rows] = await this.db.execute(
            'SELECT * FROM usuario WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    async findById(id) {
        const [rows] = await this.db.execute(
            'SELECT * FROM usuario WHERE id_usuario = ?',
            [id]
        );
        return rows[0];
    }
}

module.exports = User;