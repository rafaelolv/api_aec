const Aeroporto = require('../models/aeroportoModel');

exports.create = (req, res, next) => {

    if(!req.data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const aeroporto = new Aeroporto({
        atualizado_em: req.data.atualizado_em,
        pressao_atmosferica: req.data.pressao_atmosferica,
        atualizado_em: req.data.atualizado_em,
        visibilidade: req.data.visibilidade,
        vento: req.data.vento,
        direcao_vento: req.data.direcao_vento,
        umidade: req.data.umidade,
        condicao: req.data.condicao,
        condicao_Desc: req.data.condicao_Desc,
        temp: req.data.temp,
    });

    Aeroporto.create(aeroporto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the aero."
            });
        });
};