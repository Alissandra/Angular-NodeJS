module.exports = app => {
    const tutoriais = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    //Criar um novo tutorial
    router.post("/", tutoriais.create);

    //Recuperar todos os tutoriais
    router.get("/", tutoriais.findAll);

    //Recuperar todos os tutoriais publicados
    router.get("/publicados", tutoriais.findAllPublished);

    //recuperar apenas um tutorial a partir do id
    router.get("/:id", tutoriais.findOne);

    //atualizar o tutorial a partir de um id
    router.put("/:id", tutoriais.update);

    //deletar um tutorial a partir de um id
    router.delete("/:id", tutoriais.delete);

    //deletar todos os tutoriais
    router.delete("/", tutoriais.deleteAll);

    app.use('/api/tutoriais', router);
}