const Cidade = require('../models/cidadeModel');

exports.create = (req, res, next) => {

    if(!req.data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const cidade = new Cidade({
        id_cidade: '999',
        cidade: req.data.cidade,
        estado: req.data.estado,
        atualizado_em: req.data.atualizado_em,
        data: req.data.clima[0].data,
        condicao: req.data.clima[0].condicao,
        condicao_desc: req.data.clima[0].condicao_desc,
        min: req.data.clima[0].min,
        max: req.data.clima[0].max,
        indice_uv: req.data.clima[0].indice_uv,
    });

    Cidade.create(cidade)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the person."
            });
        });
};