const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/numero-de-moradores', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, (SELECT COUNT(*) FROM moradores WHERE id = moradores.id) AS numero_de_moradores
      FROM moradores
      LIMIT 1;
    `);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/numero-de-funcionarios', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, (SELECT COUNT(*) FROM funcionarios WHERE id = funcionarios.id) AS numero_de_funcionarios
      FROM funcionarios
      LIMIT 1;
    `);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/moradores', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM moradores');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.post('/moradores', async (req, res) => {
  const { nome, apartamento, cpf, telefone } = req.body;
  try {
    await db.query('INSERT INTO moradores (nome, apartamento, cpf, telefone) VALUES ($1, $2, $3, $4)', [nome, apartamento, cpf, telefone]);
    res.status(201).json({ message: 'Morador adicionado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.put('/moradores/:cpf', async (req, res) => {
  const { cpf } = req.params;
  const { nome, apartamento, telefone } = req.body;
  try {
    await db.query('UPDATE moradores SET nome=$1, apartamento=$2, telefone=$3 WHERE cpf=$4', [nome, apartamento, telefone, cpf]);
    res.status(200).json({ message: 'Morador atualizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.delete('/moradores/:cpf', async (req, res) => {
  const { cpf } = req.params;
  try {
    await db.query('DELETE FROM moradores WHERE cpf=$1', [cpf]);
    res.status(200).json({ message: 'Morador deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/funcionarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM funcionarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.post('/funcionarios', async (req, res) => {
  const { nome, cpf, telefone, salario, funcao } = req.body;
  try {
    await db.query('INSERT INTO funcionarios (nome, cpf, telefone, salario, funcao) VALUES ($1, $2, $3, $4, $5)', [nome, cpf, telefone, salario, funcao]);
    res.status(201).json({ message: 'Funcionário adicionado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.put('/funcionarios/:cpf', async (req, res) => {
  const { cpf } = req.params;
  const { nome, telefone, salario, funcao } = req.body;
  try {
    await db.query('UPDATE funcionarios SET nome=$1, telefone=$2, salario=$3, funcao=$4 WHERE cpf=$5', [nome, telefone, salario, funcao, cpf]);
    res.status(200).json({ message: 'Funcionário atualizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.delete('/funcionarios/:cpf', async (req, res) => {
  const { cpf } = req.params;
  try {
    await db.query('DELETE FROM funcionarios WHERE cpf=$1', [cpf]);
    res.status(200).json({ message: 'Funcionario deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/geral', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM view_moradores_funcionarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});


function showModal(content) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = content;
    document.body.appendChild(modal);
    modal.addEventListener('click', () => {
        modal.remove();
    });
}



app.listen(3000, () => {
  console.log('API rodando Corretamente na porta 3000');
});
