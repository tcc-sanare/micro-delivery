class EntregadorController {
    constructor(db) {
        this.db = db;
    }

    async getEntregador(req, res) {
        try {
            const entregadorId = req.params.id;

            // Verifica se o entregador logado está acessando seus próprios dados
            if (parseInt(entregadorId) !== req.userId) {
                return res.status(403).json({
                    success: false,
                    message: 'Acesso não autorizado'
                });
            }

            const [entregadorRows] = await this.db.execute(
                `SELECT e.*, u.email, u.ativo 
                 FROM entregador e
                 JOIN usuario u ON e.id_usuario = u.id_usuario
                 WHERE e.id_entregador = ?`,
                [entregadorId]
            );

            if (entregadorRows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Entregador não encontrado'
                });
            }

            res.status(200).json({
                success: true,
                data: entregadorRows[0]
            });
        } catch (error) {
            console.error('Erro ao buscar entregador:', error);
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar entregador',
                error: error.message
            });
        }
    }
}

module.exports = EntregadorController;