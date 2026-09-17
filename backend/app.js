const express = require("express");
const cors = require("cors");
const connetion = require("./db");

const server = express();
server.use(cors());
server.use(express.json());

//Atende a RF04 (listar produtos)
server.get("/produtos", (req, res) => {
  const sql = "SELECT * FROM produto";
  connetion.query(sql, (erro, resultados) => {
    if (erro) {
      res.status(500).json({ error: erro.menssage });
    }
    return res.json(resultados);
  });
});

server.get("/produtos/ordenados", (req, res) => {
  const sql = "SELECT * FROM produto ORDER BY nome ASC";
  connetion.query(sql, (erro, resultados) => {
    if (erro) {
      res.status(500).json({ error: erro.menssage });
    }
    return res.json(resultados);
  });
});

//ROTA: GET /produtos/:id
server.get("/produtos/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM produto WHERE id_produto = ?";
  connetion.query(sql, [id], (erro, resultados) => {
    if (erro) {
      res.status(500).json({ error: erro.menssage });
    }
    return res.json(resultados[0]);
  });
});

server.get("/produtos/busca/:termo", (req, res) => {
  const termoBusca = "%" + req.params.termo;
  const sql = "SELECT * FROM produto WHERE nome LIKE ?";
  connetion.query(sql, [`%${termoBusca}%`], (erro, resultados) => {
    if (erro) {
      res.status(500).json({ error: erro.menssage });
    }
    return res.json(resultados[0]);
  });
});
server.post("/produtos", (req, res) => {
  const {
    id_produto,
    id_categoria,
    nome,
    cor,
    textura,
    peso,
    unidade_medida,
    aplicacao,
    data_validade,
    estoque_minimo,
    estoque_atual,
    preco_unitario,
  } = req.body;

  if (
    nome == null ||
    peso == null ||
    unidade_medida == null ||
    aplicacao == null ||
    data_validade == null ||
    estoque_minimo == null ||
    estoque_atual == null ||
    preco_unitario == null ||
    id_categoria == null
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }
  const sql =
    "INSERT INTO produto (id_categoria, nome, cor, textura, peso, unidade_medida, aplicacao, data_validade, estoque_minimo, estoque_atual, preco_unitario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connetion.query(
    sql,
    [
      id_categoria,
      nome,
      cor,
      textura,
      peso,
      unidade_medida,
      aplicacao,
      data_validade,
      estoque_minimo,
      estoque_atual,
      preco_unitario,
    ],
    (erro, resultados) => {
      if (erro) {
        res.status(500).json({ error: erro.message });
      }
      return res.json({
        message: "Produto cadastrado com sucesso!",
        id_produto: resultados.insertId,
      });
    },
  );
});

server.put("/produtos/:id", (req, res) => {
  const {
    id_categoria,
    nome,
    cor,
    textura,
    peso,
    unidade_medida,
    aplicacao,
    data_validade,
    estoque_minimo,
    estoque_atual,
    preco_unitario,
  } = req.body;
  const { id } = req.params;

  const sql =
    "UPDATE produto SET id_categoria = ?, nome = ?, cor = ?, textura = ?, peso = ?, unidade_medida = ?, aplicacao = ?, data_validade = ?, estoque_minimo = ?, estoque_atual = ?, preco_unitario = ? WHERE id_produto = ?";

  connetion.query(sql, [id_categoria, nome, cor, textura, peso, unidade_medida, aplicacao, data_validade, estoque_minimo, estoque_atual,preco_unitario,id], 
    (erro) => {
      if(erro) {
        res.status(500).json({ error: erro.message });
      }
      return res.json({ message: "Produto atualizado com sucesso!" });
    }
  );
});

server.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
