const db = require("../models");
const Tutorial = db.tutoriais;
const Op = db.Sequelize.Op;

//criar e salvar um novo tutorial
exports.create = (req, res) => {
    //validar requisição
    if(!req.body.titulo){
        res.status(400).send({
            message: "O título não pode ser vazio"
        });
        return;
    }

    //criar um tutorial
    const tutorial = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        publicado: req.body.publicado ? req.body.publicado : false
    };

    //salvar o tutorial no banco de dados
    Tutorial.create(tutorial).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message: err.message || "Ocorreu algum erro enquanto na criação do tutorial!"
        });
    });    
};

//Recuperar todos os tutoriais do banco de dados
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condicao = titulo ? { titulo: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condicao }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao buscar os tutoriais!"
        });
    });
};

//Encontrar apenas um tutorial com o 'id'
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Ocorreu um erro ao buscar o tutorial com o id" + id
        });
    });
};

//Atualizar um tutorial através do 'id' em uma requisição
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id}
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Tutorial foi atualizado com sucesso!"
            });
        } else {
            res.send({
                message: `Não é possível atualizar o tutorial de id = ${id}. Talvez o tutorial não tenha sido encontrado ou req.body está vazio!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ocorreu um erro ao atualizar o tutorial de id = " + id
        });
    });
};

//Deletar um tutorial com  um id específico
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
        where: { id: id}
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Tutorial foi deletado com sucesso!"
            });
        } else {
            res.send({
                message: `Não foi possível deletar o tutorial de id = ${id}! Talvez tutorial não tenha sido encontrado`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Não foi possível deletar o tutorial de id = " + id
        });
    });
};

//Deletar todos os tutoriais do banco de dados
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} tutoriais foram deletados com sucesso!`});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao deletar todos os tutoriais!"
        })
    }) 
};

//Buscar todos os tutoriais publicados (por exemplo, publicados)
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { publicado: true } })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro ao buscar todos os tutoriais publicados"
            });
        });    

    };

