const express = require( 'express' );
const cors = require( 'cors' );
const connetion = require( './db' );

const server = express();
server.use(cors());
server.use(express.json());

//Atende a RF04 (listar produtos)
server.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produto';
    connetion.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).json({ error: erro.menssage });
        } 
        return  res.json(resultados);
    });
});

server.get('/produtos/ordenados', (req, res) => {
    const sql = 'SELECT * FROM produto ORDER BY nome ASC';
    connetion.query(sql, (erro, resultados) => {
        if (erro) {
            res.status(500).json({ error: erro.menssage });
        } 
        return  res.json(resultados);
    });
});

server.listen(3000,() => {
    console.log('Servidor rodando na porta 3000');
});