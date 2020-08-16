//tabela de tutoriais no banco de dados MySQL
module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        titulo: {
            type: Sequelize.STRING
        },
        descricao: {
            type: Sequelize.STRING
        },
        publicado: {
            type: Sequelize.BOOLEAN
        }
    });

    return Tutorial;
};