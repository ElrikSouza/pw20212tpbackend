module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Endereco", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      logradouro: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      uf: {
        type: Sequelize.CHAR(2),
        allowNull: false,
      },
      cep: {
        type: Sequelize.CHAR(9),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.dropTable("Endereco");
  },
};
