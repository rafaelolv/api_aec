const sql = require("../config/db.js");

// constructor
const Aeroporto = function(aeroporto) {
    this.codigo_icao = aeroporto.codigo_icao;
    this.pressao_atmosferica = aeroporto.pressao_atmosferica;
    this.atualizado_em = aeroporto.atualizado_em;
    this.visibilidade = aeroporto.visibilidade;
    this.vento = aeroporto.vento;
    this.direcao_vento = aeroporto.direcao_vento;
    this.umidade = aeroporto.umidade;
    this.condicao = aeroporto.condicao;
    this.condicao_Desc = aeroporto.condicao_Desc;
    this.temp = aeroporto.temp;
};


Aeroporto.create = (newAeroporto) => {

    return new Promise (async (resolve, reject) => {
        try {
            const queryCreateAeroporto = 'INSERT INTO aeroporto SET ?';
            const {codigo_icao, pressao_atmosferica, atualizado_em, visibilidade, vento, direcao_vento, 
                umidade, condicao, condicao_Desc, temp} = newAeroporto;

            const resultAeroporto = await executeQuery(sql, queryCreateAeroporto, {codigo_icao, pressao_atmosferica, 
                atualizado_em, visibilidade, vento, direcao_vento, umidade, condicao, condicao_Desc, temp});

            const data = {...newAeroporto, id_aeroporto: resultAeroporto.insertId};

            resolve(data);

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

module.exports = Aeroporto;