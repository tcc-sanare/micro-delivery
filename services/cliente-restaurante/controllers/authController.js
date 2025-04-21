const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Client = require("../models/Client");
const Restaurant = require("../models/restaurant");
const Entregador = require("../models/Entregador");

class AuthController {
  constructor(db) {
    this.userModel = new User(db);
    this.clientModel = new Client(db);
    this.restaurantModel = new Restaurant(db);
    this.entregadorModel = new Entregador(db);
  }

  async registerClient(req, res) {
    console.log("Recebendo requisição de registro de cliente");
    console.log("Body:", req.body);

    try {
      // Verifique se req.body e req.body.endereco existem
      if (!req.body || !req.body.endereco) {
        return res.status(400).json({
          success: false,
          message: "Dados de endereço são obrigatórios",
        });
      }

      const { email, senha, nome, telefone, cpf, data_nascimento, endereco } =
        req.body;

      // Validação dos campos obrigatórios
      if (!email || !senha || !nome || !telefone || !cpf) {
        return res.status(400).json({
          success: false,
          message: "Campos obrigatórios faltando",
        });
      }

      // Validação do endereço
      const requiredAddressFields = [
        "cep",
        "estado",
        "cidade",
        "bairro",
        "rua",
        "numero",
      ];
      for (const field of requiredAddressFields) {
        if (!endereco[field]) {
          return res.status(400).json({
            success: false,
            message: `Campo de endereço obrigatório faltando: ${field}`,
          });
        }
      }

      // 1. Criar endereço primeiro
      const [enderecoResult] = await req.db.execute(
        `INSERT INTO endereco 
                 (cep, pais, estado, cidade, bairro, rua, numero, complemento, tipo) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          endereco.cep,
          endereco.pais || "Brasil", // valor padrão
          endereco.estado,
          endereco.cidade,
          endereco.bairro,
          endereco.rua,
          endereco.numero,
          endereco.complemento || null, // pode ser null
          endereco.tipo || "residencial", // valor padrão
        ]
      );
      const idEndereco = enderecoResult.insertId;

      // 2. Criar usuário
      const hashedPassword = bcrypt.hashSync(senha, 8);
      const idUsuario = await this.userModel.create(
        email,
        hashedPassword,
        "cliente"
      );
      console.log("ID USUARIO:", idUsuario);

      // 3. Criar cliente
      const idCliente = await this.clientModel.create(
        idUsuario,
        idEndereco,
        nome,
        telefone,
        cpf,
        data_nascimento
      );
      console.log("ID CLIENTE:", idCliente);

      // 4. Retornar dados do cliente criado
      const cliente = await this.clientModel.getById(idCliente);

      res.status(201).json({
        success: true,
        message: "Cliente registrado com sucesso",
        data: cliente,
      });
    } catch (error) {
      console.error("Erro no registro de cliente:");
      res.status(500).json({
        success: false,
        message: "Erro ao registrar cliente",
        error: error.message,
      });
    }
  }

  async registerRestaurant(req, res) {
    console.log("Recebendo requisição de registro de restaurante");
    console.log("Body:", req.body);

    try {
        if (!req.body || !req.body.endereco) {
            return res.status(400).json({
              success: false,
              message: "Dados de endereço são obrigatórios",
            });
          }

          const { email, senha, nome, cnpj, telefone, descricao, tempo_medio_entrega, taxa_entrega, horario_abertura, horario_fechamento, endereco } =
          req.body;

          if (!email || !senha || !nome || !telefone || !cnpj) {
        return res.status(400).json({
          success: false,
          message: "Campos obrigatórios faltando",
        });
      }

      // Validação do endereço
      const requiredAddressFields = [
        "cep",
        "estado",
        "cidade",
        "bairro",
        "rua",
        "numero",
      ];
      for (const field of requiredAddressFields) {
        if (!endereco[field]) {
          return res.status(400).json({
            success: false,
            message: `Campo de endereço obrigatório faltando: ${field}`,
          });
        }
      }

      // 1. Criar endereço
      const [enderecoResult] = await req.db.execute(
        `INSERT INTO endereco 
                 (cep, pais, estado, cidade, bairro, rua, numero, complemento, tipo) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          endereco.cep,
          endereco.pais || "Brasil", // valor padrão
          endereco.estado,
          endereco.cidade,
          endereco.bairro,
          endereco.rua,
          endereco.numero,
          endereco.complemento || null, // pode ser null
          endereco.tipo || "residencial", // valor padrão
        ]
      );
      const idEndereco = enderecoResult.insertId;

      // 2. Criar usuário
      const hashedPassword = bcrypt.hashSync(senha, 8);
           const idUsuario = await this.userModel.create(
             email,
             hashedPassword,
             "restaurante"
           );
           console.log("ID USUARIO:", idUsuario);

      // 3. Criar restaurante
      const idRestaurante = await this.restaurantModel.create(
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
      );
console.log("ID RESTAURANTE", idRestaurante);

      // 4. Retornar dados do restaurante criado
      const restaurante = await this.restaurantModel.getById(idRestaurante);

      res.status(201).json({
        success: true,
        message: "Restaurante registrado com sucesso",
        data: restaurante,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Erro ao registrar restaurante" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log('REQ.BODY:', req.body);


      // 1. Verificar se usuário existe
      const user = await this.userModel.findByEmail(email);
      console.log("USUÁRIO:",user);
      // console.log("FIND:",user);
      
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Usuário não encontrado" });
      }

      console.log('Senha digitada:', password);
      console.log('Senha do banco:', user.password);

      // 2. Verificar senha
      const passwordIsValid = bcrypt.compareSync(password, user.senha);
      if (!passwordIsValid) {
        return res
          .status(401)
          .json({ success: false, message: "Senha inválida" });
      }

      // 3. Criar token JWT
      const token = jwt.sign(
        { id: user.id_usuario, email: user.email, tipo: user.tipo },
        process.env.JWT_SECRET || "JWTsenha*",
        { expiresIn: "24h" }
      );

      // 4. Retornar dados do usuário conforme o tipo
      let userData;
      if (user.tipo === "cliente") {
        const [cliente] = await req.db.execute(
          "SELECT * FROM cliente WHERE id_usuario = ?",
          [user.id_usuario]
        );
        userData = cliente[0];
      } else if (user.tipo === "restaurante") {
        const [restaurante] = await req.db.execute(
          "SELECT * FROM restaurante WHERE id_usuario = ?",
          [user.id_usuario]
        );
        userData = restaurante[0];
      } else if (user.tipo === "entregador") {
        const [entregador] = await req.db.execute(
          "SELECT * FROM entregador WHERE id_usuario = ?",
          [user.id_usuario]
        );
        userData = entregador[0];
      }

      res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        token,
        user: {
          id: user.id_usuario,
          email: user.email,
          tipo: user.tipo,
          ...userData,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Erro ao fazer login" });
    }
  }

  async registerEntregador(req, res) {
    console.log("Recebendo requisição de registro de entregador");

    try {
      // Verifique se req.body e req.body.endereco existem
      if (!req.body || !req.body.endereco) {
        return res.status(400).json({
          success: false,
          message: "Dados de endereço são obrigatórios",
        });
      }

      const {
        email,
        senha,
        nome,
        telefone,
        cpf,
        cnh,
        veiculo,
        placa,
        endereco,
      } = req.body;

      if (!email || !senha || !nome || !telefone || !cpf || !cnh || !placa) {
        return res.status(400).json({
          success: false,
          message: "Campos obrigatórios faltando",
        });
      }

      // Validação do endereço
      const requiredAddressFields = [
        "cep",
        "estado",
        "cidade",
        "bairro",
        "rua",
        "numero",
      ];
      for (const field of requiredAddressFields) {
        if (!endereco[field]) {
          return res.status(400).json({
            success: false,
            message: `Campo de endereço obrigatório faltando: ${field}`,
          });
        }
      }

      // 1. Criar endereço
      const [enderecoResult] = await req.db.execute(
        `INSERT INTO endereco 
                 (cep, pais, estado, cidade, bairro, rua, numero, complemento, tipo) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          endereco.cep,
          endereco.pais || "Brasil", // valor padrão
          endereco.estado,
          endereco.cidade,
          endereco.bairro,
          endereco.rua,
          endereco.numero,
          endereco.complemento || null, // pode ser null
          endereco.tipo || "residencial", // valor padrão
        ]
      );
      const idEndereco = enderecoResult.insertId;

      // 2. Criar usuário
      const hashedPassword = bcrypt.hashSync(senha, 8);
      const idUsuario = await this.userModel.create(
        email,
        hashedPassword,
        "entregador"
      );
      console.log("ID USUARIO:", idUsuario);

      // 3. Criar entregador
      const idEntregador = await this.entregadorModel.create(
        idUsuario,
        idEndereco,
        nome,
        telefone,
        cpf,
        cnh,
        placa,
        veiculo
      );
      console.log("ID ENTREGADOR:", idEntregador);

      // 4. Retornar dados do entregador criado
      const entregador = await this.entregadorModel.getById(idEntregador);

      res.status(201).json({
        success: true,
        message: "Entregador registrado com sucesso",
        data: entregador[0],
      });
    } catch (error) {
      console.error("Erro ao registrar entregador:", error);
      res.status(500).json({
        success: false,
        message: "Erro ao registrar entregador",
        error: error.message,
      });
    }
  }
}

module.exports = AuthController;
