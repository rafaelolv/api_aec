const sql = require("../config/db.js");

// constructor
const Cidade = function(cidade) {
    this.id_cidade = cidade.id_cidade;
    this.cidade = cidade.cidade;
    this.estado = cidade.estado;
    this.atualizado_em = cidade.atualizado_em;
    this.data = cidade.data;
    this.condicao = cidade.condicao;
    this.condicao_desc = cidade.condicao_desc;
    this.min = cidade.min;
    this.max = cidade.max;
    this.indice_uv = cidade.indice_uv;
  };

Cidade.create = (newCidade) => {

    return new Promise (async (resolve, reject) => {
        try {
            
            const {id_cidade, cidade, estado, atualizado_em} = newCidade;

            const queryVerificaNovaCidade = 'select * from cidade where id_cidade = ?'
            const resultVerificaNovaCidade = await executeQuery(sql, queryVerificaNovaCidade, id_cidade);

            if(!resultVerificaNovaCidade[0]) {
                const queryCreateCidade = 'INSERT INTO cidade SET ?';
                const resultCidade = await executeQuery(sql, queryCreateCidade, {id_cidade, cidade, estado, atualizado_em});

                const data = {...newCidade, id_cidade: resultCidade.insertId};

                const queryCreateClima = 'INSERT INTO clima SET ?';

                const resultClima = await executeQuery(sql, queryCreateClima, {id_cidade, data, condicao, condicao_desc, min, max, indice_uv});

                const clima = {...resultCidade, id_clima: resultClima.insertId};
                data = {...newCidade, clima};

                resolve(data);

            } else {
                const queryCreateClima = 'INSERT INTO clima SET ?';

                const resultClima = await executeQuery(sql, queryCreateClima, {id_cidade, data, condicao, condicao_desc, min, max, indice_uv});

                const clima = {...resultCidade, id_clima: resultClima.insertId};
                const data = {...newCidade, clima};

                resolve(data);
            }
        } catch (err) {
            reject(err);
        }
    });
}



const executeQuery = async (con, query, params) => {

    return new Promise ((resolve, reject) => {
        con.query(query, params, (err, res) => {
            if(err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
}

module.exports = Cidade;