console.log(" SERVIDOR JARVIS NOVO ");

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// CONEXÃO MYSQL
// =========================

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jarvis"
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
  } else {
    console.log("Conectado ao MySQL!");
  }
});

// =========================
// ROTAS
// =========================

app.get("/", (req, res) => {
  res.send("API JARVIS ONLINE");
});

app.post("/api/conhecimento", (req, res) => {
  const { palavra, tipo } = req.body;

  const sql = "INSERT INTO conhecimentos (palavra, tipo) VALUES (?, ?)";

  db.query(sql, [palavra, tipo], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao salvar" });
    }

    res.json({ mensagem: "Salvo com sucesso!" });
  });
});

app.get("/api/conhecimento", (req, res) => {
  db.query("SELECT * FROM conhecimentos", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao buscar" });
    }

    res.json(result);
  });
});

// =========================
// SERVIDOR
// =========================

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
