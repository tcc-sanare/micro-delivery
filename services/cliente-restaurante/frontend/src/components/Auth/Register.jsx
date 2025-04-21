import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";

const Register = () => {
  const [userType, setUserType] = useState("cliente");
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    nome: "",
    telefone: "",
    cnh: "",
    veiculo: "",
    placa: "",
    // Campos de restaurante
    cnpj: "",
    descricao: "",
    tempo_medio_entrega: "",
    taxa_entrega: "",
    horario_abertura: "",
    horario_fechamento: "",
    // Campos de endereço
    cep: "",
    pais: "Brasil",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    ponto_referencia: "",
    tipo_endereco: "residencial",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validação básica dos campos obrigatórios
    if (
      !formData.email ||
      !formData.senha ||
      !formData.nome ||
      !formData.telefone
    ) {
      setError("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Validação do endereço
    if (userType !== "entregador") {
      const requiredAddressFields = [
        "cep",
        "estado",
        "cidade",
        "bairro",
        "rua",
        "numero",
      ];
      const missingFields = requiredAddressFields.filter(
        (field) => !formData[field]
      );

      if (missingFields.length > 0) {
        setError(
          `Preencha todos os campos de endereço: ${missingFields.join(", ")}`
        );
        return;
      }
    }

    try {
      setLoading(true);

      const requestData = {
        email: formData.email,
        senha: formData.senha,
        nome: formData.nome,
        telefone: formData.telefone,
        // Campos específicos por tipo de usuário
        ...(userType === "cliente" && {
          cpf: formData.cpf,
          data_nascimento: formData.data_nascimento || null,
        }),
        ...(userType === "restaurante" && {
          cnpj: formData.cnpj,
          descricao: formData.descricao,
          tempo_medio_entrega: Number(formData.tempo_medio_entrega) || 0,
          taxa_entrega: Number(formData.taxa_entrega) || 0,
          horario_abertura: formData.horario_abertura,
          horario_fechamento: formData.horario_fechamento,
        }),
        ...(userType === "entregador" && {
          cpf: formData.cpf,
          cnh: formData.cnh,
          veiculo: formData.veiculo,
          placa: formData.placa,
        }),
        ...(userType && {
          endereco: {
            cep: formData.cep,
            pais: formData.pais || "Brasil",
            estado: formData.estado,
            cidade: formData.cidade,
            bairro: formData.bairro,
            rua: formData.rua,
            numero: formData.numero,
            complemento: formData.complemento || "",
            ponto_referencia: formData.ponto_referencia || "",
            tipo: formData.tipo_endereco || "residencial",
          },
        }),
      };
      console.log(requestData);
      console.log(
        "Enviando request para:",
        `http://localhost:3001/api/register/${userType}`
      );

      const response = await fetch(
        `http://localhost:3001/api/register/${userType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      console.log("response: ", response);

      // Verifica primeiro se a resposta está OK
      if (!response.ok) {
        let errorMessage = `Erro ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.warn("Não foi possível parsear o corpo de erro:", e);
          console.log("aqui tbm");
        }
        throw new Error(errorMessage);
      }

      // Redireciona com mensagem de sucesso
      navigate("/login", {
        state: {
          registrationSuccess: true,
          message: "Cadastro realizado com sucesso!",
        },
      });
    } catch (err) {
      console.error("Erro no cadastro:", err);

      // Tratamento específico para erros de JSON
      if (err instanceof SyntaxError) {
        setError("Resposta inválida do servidor");
      } else if (err.message.includes("Failed to fetch")) {
        setError(
          "Não foi possível conectar ao servidor. Verifique sua conexão."
        );
      } else {
        setError(
          err.message ||
            "Ocorreu um erro durante o cadastro. Por favor, tente novamente."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const renderExtraFields = () => {
    switch (userType) {
      case "restaurante":
        return (
          <>
            <TextField
              name="cnpj"
              label="CNPJ"
              fullWidth
              margin="normal"
              value={formData.cnpj}
              onChange={handleChange}
              required
            />
            <TextField
              name="descricao"
              label="Descrição do Restaurante"
              fullWidth
              margin="normal"
              value={formData.descricao}
              onChange={handleChange}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="tempo_medio_entrega"
                  label="Tempo Médio (min)"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={formData.tempo_medio_entrega}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="taxa_entrega"
                  label="Taxa de Entrega (R$)"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={formData.taxa_entrega}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="horario_abertura"
                  label="Horário Abertura"
                  type="time"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={formData.horario_abertura}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="horario_fechamento"
                  label="Horário Fechamento"
                  type="time"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={formData.horario_fechamento}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </>
        );
      case "entregador":
        return (
          <>
            <TextField
              name="cpf"
              label="CPF"
              fullWidth
              margin="normal"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
            <TextField
              name="cnh"
              label="CNH"
              fullWidth
              margin="normal"
              value={formData.cnh}
              onChange={handleChange}
              required
            />
            <TextField
              name="veiculo"
              label="Veículo"
              fullWidth
              margin="normal"
              value={formData.veiculo}
              onChange={handleChange}
              required
            />
            <TextField
              name="placa"
              label="Placa"
              fullWidth
              margin="normal"
              value={formData.placa}
              onChange={handleChange}
              required
            />
          </>
        );
      default: // cliente
        return (
          <TextField
            name="cpf"
            label="CPF"
            fullWidth
            margin="normal"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        );
    }
  };

  const renderAddressFields = () => {
    return (
      <Box sx={{ mt: 3, borderTop: "1px solid #eee", pt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Endereço
        </Typography>

        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <TextField
              name="cep"
              label="CEP"
              fullWidth
              margin="normal"
              value={formData.cep}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="pais"
              label="País"
              fullWidth
              margin="normal"
              value={formData.pais}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="estado"
              label="Estado"
              fullWidth
              margin="normal"
              value={formData.estado}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="cidade"
              label="Cidade"
              fullWidth
              margin="normal"
              value={formData.cidade}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="bairro"
              label="Bairro"
              fullWidth
              margin="normal"
              value={formData.bairro}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              name="rua"
              label="Rua"
              fullWidth
              margin="normal"
              value={formData.rua}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField
              name="numero"
              label="Número"
              fullWidth
              margin="normal"
              value={formData.numero}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField
              name="complemento"
              label="Complemento"
              fullWidth
              margin="normal"
              value={formData.complemento}
              onChange={handleChange}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo de Endereço</InputLabel>
              <Select
                name="tipo_endereco"
                value={formData.tipo_endereco}
                onChange={handleChange}
                label="Tipo de Endereço"
                
              >
                <MenuItem value="residencial">Residencial</MenuItem>
                <MenuItem value="comercial">Comercial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <TextField
              name="ponto_referencia"
              label="Ponto de Referência"
              fullWidth
              margin="normal"
              value={formData.ponto_referencia}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Cadastro
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Usuário</InputLabel>
            <Select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              label="Tipo de Usuário"
              required
            >
              <MenuItem value="cliente">Cliente</MenuItem>
              <MenuItem value="restaurante">Restaurante</MenuItem>
              <MenuItem value="entregador">Entregador</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                name="senha"
                label="Senha"
                type="password"
                fullWidth
                margin="normal"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                name="nome"
                label={
                  userType === "restaurante"
                    ? "Nome do Restaurante"
                    : "Nome Completo"
                }
                fullWidth
                margin="normal"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                name="telefone"
                label="Telefone"
                fullWidth
                margin="normal"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          {renderExtraFields()}
          {userType && renderAddressFields()}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, backgroundColor: '#a40000'}}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Cadastrar"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
