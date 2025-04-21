class Restaurant {
  constructor(db) {
    this.db = db;
  }

  async create(
    idUsuario,
    idEndereco,
    nome,
    cnpj,
    telefone,
    descricao,
    tempo_medio_entrega,
    taxa_entrega,
    horario_abertura,
    horario_fechamento
  ) {
    const [result] = await this.db.execute(
      `INSERT INTO restaurante 
         (id_usuario, id_endereco, nome, cnpj, telefone, descricao, tempo_medio_entrega, taxa_entrega, horario_abertura, horario_fechamento)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        idUsuario,
        idEndereco,
        nome,
        cnpj,
        telefone,
        descricao,
        tempo_medio_entrega,
        taxa_entrega,
        horario_abertura,
        horario_fechamento,
      ]
    );
    return result.insertId;
  }

  async getById(id) {
    const [rows] = await this.db.execute(
      `SELECT r.*, u.email, u.ativo,
         e.cep, e.estado, e.cidade, e.bairro, e.rua, e.numero, e.complemento
         FROM restaurante r
         JOIN usuario u ON r.id_usuario = u.id_usuario
         JOIN endereco e ON r.id_endereco = e.id_endereco
         WHERE r.id_restaurante = ?`,
      [id]
    );
    return rows[0];
  }
}

module.exports = Restaurant;
