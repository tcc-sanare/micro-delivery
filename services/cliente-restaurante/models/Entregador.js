// models/Entregador.js
class Entregador {
    constructor(db) {
      this.db = db;
    }

    async create(idUsuario, idEndereco, nome, telefone, cpf, cnh, veiculo, placa) {
      const [result] = await this.db.execute(
        `INSERT INTO entregador
           (id_usuario, id_endereco, nome, telefone, cpf, cnh, veiculo, placa)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          idUsuario,
          idEndereco,
          nome,
          telefone,
          cpf,
          cnh,
          veiculo,
          placa
        ]
      );
      return result.insertId;
    }
  
    async getById(id) {
      const [rows] = await this.db.execute(
        `SELECT j.*,
           u.email,
           u.tipo,
           u.ativo,
           e.cep, 
           e.estado, 
           e.cidade, 
           e.bairro, 
           e.rua, 
           e.numero, 
           e.complemento
           FROM entregador j
           JOIN usuario u ON j.id_usuario = u.id_usuario
           LEFT JOIN endereco e ON j.id_endereco = e.id_endereco
         WHERE j.id_entregador = ?`,
        [id]
      );
      return rows[0];
    }
  }
  
  module.exports = Entregador;
  