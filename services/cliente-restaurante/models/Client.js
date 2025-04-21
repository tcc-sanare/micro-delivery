class Client {
    constructor(db) {
        this.db = db;
    }

    async create(idUsuario, idEndereco, nome, telefone, cpf, dataNascimento) {
        const [result] = await this.db.execute(
            'INSERT INTO cliente (id_usuario, id_endereco, nome, telefone, cpf, data_nascimento) VALUES (?, ?, ?, ?, ?, ?)',
            [idUsuario, idEndereco, nome, telefone, cpf, dataNascimento]
        );
        return result.insertId;
    }

    async getById(id) {
        const [rows] = await this.db.execute(
            `SELECT c.*, u.email, u.tipo, u.ativo, 
         e.cep, e.estado, e.cidade, e.bairro, e.rua, e.numero, e.complemento
         FROM cliente c
         JOIN usuario u ON c.id_usuario = u.id_usuario
         LEFT JOIN endereco e ON c.id_endereco = e.id_endereco
         WHERE c.id_cliente = ?`,
            [id]
        );
        return rows[0];
    }
}

module.exports = Client;