class UserController {
    constructor(db) {
        this.db = db;
    }

    async getUser(req, res) {
        try {
            const userId = req.params.id;

            // 1. Buscar usuário base
            const [userRows] = await this.db.execute(
                'SELECT * FROM usuario WHERE id_usuario = ?',
                [userId]
            );

            if (userRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });
            }

            const user = userRows[0];

            // 2. Buscar dados específicos conforme o tipo
            let userData = {};

            if (user.tipo === 'cliente') {
                const [clienteRows] = await this.db.execute(
                    'SELECT * FROM cliente WHERE id_usuario = ?',
                    [userId]
                );
                userData = clienteRows[0] || {}; 
            }
            else if (user.tipo === 'restaurante') {
                const [restauranteRows] = await this.db.execute(
                    'SELECT * FROM restaurante WHERE id_usuario = ?',
                    [userId]
                );
                userData = restauranteRows[0] || {}; 
            }

            res.status(200).json({
                success: true,
                data: {
                    id: user.id_usuario,
                    email: user.email,
                    tipo: user.tipo,
                    ...userData
                }
            });

        } catch (error) {
            console.error('Erro detalhado:', error); 
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar usuário',
                error: error.message 
            });
        }
    }
}

module.exports = UserController;